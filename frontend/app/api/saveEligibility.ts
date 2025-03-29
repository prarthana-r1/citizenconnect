import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string; // Ensure MongoDB URI is in `.env.local`
const client = new MongoClient(uri);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await client.connect();
    const db = client.db("karnataka_schemes_db"); // Replace with your actual database name
    const usersCollection = db.collection("users");
    const schemesCollection = db.collection("schemes");

    const { name, age, gender, caste, category } = req.body;

    // Validate input fields
    if (!name || !age || !gender || !caste || !category) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Fetch schemes matching the category
    const eligibleSchemes = await schemesCollection
      .find({ category })
      .project({ scheme_name: 1, apply_link: 1 }) // Only return required fields
      .toArray();

    if (!eligibleSchemes || eligibleSchemes.length === 0) {
      return res.status(404).json({ message: "No eligible schemes found" });
    }

    // Save user data to the database
    const result = await usersCollection.insertOne({
      name,
      age,
      gender,
      caste,
      category,
      createdAt: new Date(),
    });

    res.status(201).json({
      message: "Data saved successfully",
      userId: result.insertedId,
      schemes: eligibleSchemes,
    });
  } catch (error) {
    console.error("Error handling eligibility:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
}
