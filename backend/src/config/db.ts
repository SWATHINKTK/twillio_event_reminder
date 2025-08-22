import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectString: string | undefined = process.env.DB_CONNECTION_STRING!;

const connectDB = async () => {
    await mongoose.connect(connectString)
    console.log("✅ Database connected successfully");
}

export default connectDB;