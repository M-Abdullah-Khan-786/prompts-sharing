import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "username is required"],
    match: [/^[a-zA-Z0-9]+$/, "Username must be alphanumeric"],
  },
  image: {
    type: String,
  },
});

const User = models.user || model("User", userSchema);

export default User;
