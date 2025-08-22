import { google } from "googleapis";
import oauth2Client from "../config/googleClient";
import { IUser, User } from "../models/userModel";
import { Types } from "mongoose";

export const getUpcomingEvents = async (userId: Types.ObjectId | string) => {
    try {
        console.log("Fetching events for user:", userId);
        if (!userId) return [];
        const user: IUser | null = await User.findById(userId);
        if (!user) return [];

        oauth2Client.setCredentials({
            access_token: user.accessToken!,
            refresh_token: user.refreshToken!,
        });

        await oauth2Client.getAccessToken();

        if (oauth2Client.credentials.access_token !== user.accessToken) {
            await User.updateOne({ _id: userId }, { accessToken: oauth2Client.credentials.access_token });
        }

        const calendar = google.calendar({ version: "v3", auth: oauth2Client });
        const now = new Date();
        //   const later = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        const later = new Date(now.getTime() + 30 * 60000);

        const res = await calendar.events.list({
            calendarId: "primary",
            timeMin: now.toISOString(),
            timeMax: later.toISOString(),
            singleEvents: true,
            orderBy: "startTime",
        });

         const upcomingEvents = (res.data.items || []).filter(event => {
            const start = event.start?.dateTime || event.start?.date;
            if (!start) return false;
            return new Date(start).getTime() > now.getTime();
        });

        console.log("Upcoming Events:", upcomingEvents);
        return upcomingEvents || [];
    } catch (error) {
        console.log("Error fetching upcoming events:", error);
        return [];
    }
};