import { Schema } from "mongoose";
import { model } from "mongoose";

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: true
    },
    location: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

export const User = model("User", UserSchema)
