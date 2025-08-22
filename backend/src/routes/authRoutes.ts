import { Router } from "express";
import oauth2Client from "../config/googleClient";
import { google } from "googleapis";
import { User } from "../models/userModel";
import jwt from "jsonwebtoken";

const router = Router();


router.get("/google", (req, res) => {
    const scopes = ["https://www.googleapis.com/auth/calendar.readonly", "email", "profile"];
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        prompt: "consent",
    });
    res.redirect(url);
});


router.get("/google/callback", async (req, res) => {
    const { code } = req.query as { code: string };

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2("v2");
    const { data } = await oauth2.userinfo.get({ auth: oauth2Client });
    console.log("Google User Data:", data);

    let user = await User.findOne({ googleId: data.id });
    if (!user) {
        user = await User.create({
            googleId: data.id,
            email: data.email,
            name: data.name,
            profileImg: data.picture,
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
        });
    } else {
        user.accessToken = tokens.access_token!;
        user.refreshToken = tokens.refresh_token || user.refreshToken || '';
        await user.save();
    }

    const jwtToken = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
    );

    res.cookie("token", jwtToken, {
        httpOnly: true,
        sameSite: "lax", // works on localhost HTTP
        maxAge: 1000 * 60 * 60,
    });


    res.redirect("http://localhost:3000/dashboard");
});


export default router;




