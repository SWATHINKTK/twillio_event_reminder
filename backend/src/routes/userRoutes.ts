import { Router } from "express";
import { User } from "../models/userModel";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({user:null});
        const user = await User.findById(userId);
        res.status(200).json({user});
    } catch (error) {
        console.error("❌ Error fetching user:", error);
        res.status(500).json({user:null});
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
});

router.post('/phone', async (req, res) => {
    try {
        const { phoneNumber } = req.body;

        const userId = req.user?.userId;

        if (!userId) return res.status(401).send("Unauthorised");

        await User.updateOne({ _id: userId }, { phoneNumber });
        res.status(200).json({
            success: true,
            message: 'Mobile Number updated successfully',
            error: null
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : 'Unknown Error'
        });
    }
});

export default router;