import mongoose, { Schema, Document } from "mongoose";

// Define TypeScript interface
interface IUser extends Document {
  clerkId: string;
  name?: string;
  email?: string;
  savedSchemes: mongoose.Types.ObjectId[];
}

// Define Schema
const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String },
  savedSchemes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Scheme" }],
});

// Prevent Mongoose Re-Registering Issue
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User; // ✅ Default Export
