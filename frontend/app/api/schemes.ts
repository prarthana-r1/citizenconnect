import { NextApiRequest, NextApiResponse } from "next";
import {connectDB} from "../../../backend/lib/database";
import Scheme from "../../../backend/models/Scheme";

interface EligibilityCriteria {
  minAge: number;
  maxIncome: number;
  category: string;
}

interface SchemeType {
  _id: string;
  title: string;
  description?: string;
  eligibilityCriteria: EligibilityCriteria;
  languageSupport?: string[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  try {
    if (req.method === "GET") {
      const schemes: SchemeType[] = await Scheme.find({});
      return res.status(200).json(schemes);
    }

    if (req.method === "POST") {
      const { title, description, eligibilityCriteria, languageSupport } = req.body as {
        title: string;
        description?: string;
        eligibilityCriteria: EligibilityCriteria;
        languageSupport?: string[];
      };

      const newScheme = new Scheme({
        title,
        description,
        eligibilityCriteria,
        languageSupport,
      });

      await newScheme.save();
      return res.status(201).json({ message: "Scheme created" });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
