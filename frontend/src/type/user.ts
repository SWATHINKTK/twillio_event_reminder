export interface IUser extends Document {
    _id?: string;
    googleId?: string;
    email?: string;
    name?: string;
    phoneNumber?: string;
    profileImg?: string;
    accessToken?: string;
    refreshToken?: string;
}