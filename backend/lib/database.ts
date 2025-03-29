import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://prarthanainfoin:VjvGw9KyhFzWUeMl@cluster1.obekyj0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
};
