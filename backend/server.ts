import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./lib/database";
import schemeRoutes from "./routes/schemeRoutes";  // ✅ Import scheme routes

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// ✅ Register the API routes
app.use("/api", schemeRoutes);

app.get("/", (req, res) => res.send("Backend Server Running 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
