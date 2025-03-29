import express from "express";
import  Scheme  from "../models/Scheme";
import mongoose from "mongoose";

const router = express.Router();

// Fetch all schemes
router.get("/", async (req, res) => {
  try {
    // Fetch schemes from MongoDB
    const schemes = await Scheme.find();

    // Check if schemes exist
    if (!schemes || schemes.length === 0) {
      return res.status(404).json({ message: "No schemes found" });
    }

    res.status(200).json(schemes);
  } catch (error) {
    console.error("Error fetching schemes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new scheme
router.post("/", async (req, res) => {
  try {
    const newScheme = new Scheme(req.body);
    await newScheme.save();
    res.json(newScheme);
  } catch (error) {
    res.status(500).json({ error: "Error adding scheme" });
  }
});

router.post("/fetchSchemesByCategory", async (req, res) => {
  try {
    const { category } = req.body; // Get the selected category from the request body

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    // Fetch schemes matching the category from MongoDB
    const schemes = await Scheme.find({ category });

    // Check if schemes exist
    if (!schemes || schemes.length === 0) {
      return res.status(404).json({ message: "No schemes found for the selected category" });
    }

    // Return the schemes in response
    res.status(200).json({ schemes });
  } catch (error) {
    console.error("Error fetching schemes by category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// router.get("/api/schemes", async (req, res) => {
//   try {
//     //await ensureDBConnection();
//     const newScheme = new Scheme(req.body);
//     await newScheme.save();
//     console.log("New Scheme Added:", newScheme);
//     res.json(newScheme);
//   } catch (error) {
//     console.error("Error adding scheme:", error);
//     res.status(500).json({ error: "Error adding scheme" });
//   }
// });

// router.post("/saveEligibility", async (req, res) => {
//   try {
//     const { criteria } = req.body;
//     const eligibleSchemes = await Scheme.find(criteria);

//     if (!eligibleSchemes || eligibleSchemes.length === 0) {
//       return res.status(404).json({ message: "No eligible schemes found" });
//     }

//     res.status(200).json(eligibleSchemes);
//   } catch (error) {
//     console.error("Error checking eligibility:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// ✅ Save user eligibility form data
// router.post("/submitEligibility", async (req, res) => {
//   try {
//     const { name, age, gender, caste, schemesInterested } = req.body;

//     // Validation
//     if (!name || !age || !gender || !caste || !schemesInterested) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Get MongoDB connection
//     const EligibilityModel = mongoose.model("User", new mongoose.Schema({
//       name: String,
//       age: Number,
//       gender: String,
//       caste: String,
//       schemesInterested: [String],
//       createdAt: { type: Date, default: Date.now }
//     }));

//     // Save to database
//     const newEntry = new EligibilityModel({ name, age, gender, caste, schemesInterested });
//     await newEntry.save();

//     res.status(201).json({ message: "Eligibility data saved successfully", newEntry });
//   } catch (error) {
//     console.error("Error saving eligibility data:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

export default router;
