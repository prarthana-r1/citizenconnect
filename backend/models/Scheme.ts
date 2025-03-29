import mongoose, { Schema, Document } from "mongoose";

// Define TypeScript interface for Scheme
interface IScheme extends Document {
  scheme_name: string;
  category: string;
  eligibility: {
    age?: string;
    gender?: string;
    income?: string;
    caste?: string;
  };
  benefits: string;
  apply_link: string;
}

// Define Schema
const SchemeSchema = new Schema<IScheme>({
  scheme_name: { type: String, required: true },
  category: { type: String, required: true },
  eligibility: {
    age: { type: String },
    gender: { type: String },
    income: { type: String },
    caste: { type: String }
  },
  benefits: { type: String, required: true },
  apply_link: { type: String, required: true }
});

// Fix Mongoose re-registering issue
const Scheme = mongoose.models.Scheme || mongoose.model<IScheme>("Scheme", SchemeSchema);

export default Scheme; // ✅ Use default export
