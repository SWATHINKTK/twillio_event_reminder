import cron from "node-cron";
import { User } from "../models/userModel";
import { getUpcomingEvents } from "./calendarService";
import twilioClient from "../config/twilioClient";

export const startCron = () => {
    cron.schedule("*/5 * * * *", async () => {
        try {
            console.log("Checking for upcoming events...");

            const users = await User.find({ phoneNumber: { $exists: true } });

            for (const user of users) {
                const events = await getUpcomingEvents(user._id);
                if (events.length > 0) {
                    const sentence = `Hello ${user.name?.toLowerCase()}, Your upcoming event is: ${events[0]?.summary}.`;
                    const call = await twilioClient.calls.create({
                        to: `+91${user.phoneNumber}`,
                        from: process.env.TWILIO_PHONE_NUMBER!,
                        twiml: `<Response><Say voice="alice">${sentence}</Say></Response>`
                    });
                    console.log("Call SID:", call.sid);
                }
            }
        } catch (error) {
            console.log("Error in cron job:", error);
        }
    });
};