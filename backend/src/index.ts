import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import { startCron } from "./services/cronService";
import cookieParser from "cookie-parser";
import cors from "cors";

import { authenticateJWT, JwtPayload } from "./middleware/authenticateMiddleware";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

app.use("/auth", authRoutes);
app.use("/user",authenticateJWT, userRoutes);


app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
        status: "success",
        message: "Server is healthy",
    });
});



const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();

        // Start Cron jobs
        startCron();
        console.log("✅ Cron jobs started successfully");

        // Listen for requests
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    } catch (error: unknown) {
        console.error("❌ Server startup failed:", error instanceof Error ? error.message : error);
        process.exit(1); // Exit process on startup failure
    }
};

// Invoke startup
startServer();
