import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: String,
  email: String,
  name: String,
  phoneNumber: String,
  profileImg:String,
  accessToken: String,
  refreshToken: String,
});

export const User = mongoose.model("User", userSchema);


export interface IUser extends Document {
  googleId?: string;
  email?: string;
  name?: string;
  phoneNumber?: string;
  profileImg?: string;
  accessToken?: string;
  refreshToken?: string;
}