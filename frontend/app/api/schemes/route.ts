import { NextResponse } from "next/server"

// This would be replaced with your actual database connection
// For example, using Prisma, Supabase, or another database client
const mockSchemes = [
  {
    id: "1",
    scheme_name: "Suvarna Bhoomi Yojana",
    category: "Financial Heritage",
    benefits:
      "One-time financial grant to adopt modern farming techniques.",
    application_link: "https://raitamitra.karnataka.gov.in/",
    eligibility: {
      age: "18+",
      gender: "All",
      income: "Below ₹2 LPA",
      caste: "All",
    },
  },
  {
    id: "2",
    scheme_name: "Support for International Patents",
    category: "Financial Heritage",
    benefits: "Financial assistance for securing global patents.",
    application_link: "https://startup.karnataka.gov.in/",
    eligibility: {
      age: "18+",
      gender: "All",
      income: "No income limit",
      caste: "All",
    },
  },
  {
    id: "3",
    scheme_name: "Trade License Subsidy Scheme",
    category: "Homestead Support",
    benefits:
      "Subsidized trade licensing costs for SMEs.",
    application_link: "https://sevasindhu.karnataka.gov.in/",
    eligibility: {
      age: "18+",
      gender: "All",
      income: "No income limit",
      caste: "All",
    },
  },
  {
    id: "4",
    scheme_name: "Indira Gandhi Urban Housing Scheme",
    category: "Homestead Support",
    benefits: "Affordable housing assistance for urban poor.",
    application_link: "https://sevasindhu.karnataka.gov.in/",
    eligibility: {
      age: "18+",
      gender: "All",
      income: "Economically weaker sections",
      caste: "All",
    },
  },
  {
    id: "5",
    scheme_name: "Gruha Lakshmi Scheme",
    category: "Wellness Tradition",
    benefits: "₹2,000 monthly to women heads of households.",
    application_link: "https://sevasindhugs.karnataka.gov.in/",
    eligibility: {
      age: "18+",
      gender: "Female",
      income: "No income limit",
      caste: "All",
    },
  },
  {
    id: "6",
    scheme_name: "Gruha Jyothi Scheme",
    category: "Wellness Tradition",
    benefits: "Free electricity up to 200 units.",
    application_link: "https://sevasindhugs.karnataka.gov.in/",
    eligibility: {
      age: "18-45",
      gender: "All",
      income: "No income limit",
      caste: "All",
    },
  },
  {
    id: "7",
    scheme_name: "Raita Vidya Nidhi",
    category: "Education",
    benefits:
      "Scholarships for children of farmers",
    application_link: "https://raitamitra.karnataka.gov.in/",
    eligibility: {
      age: "5-18",
      gender: "All",
      income: "No income limit",
      caste: "SC/ST/OBC",
    },
  },
  {
    id: "8",
    scheme_name: "Ksheera Bhagya Scheme",
    category: "Education",
    benefits: "Free milk distribution for school children",
    application_link: "https://sevasindhu.karnataka.gov.in/",
    eligibility: {
      age: "5-15",
      gender: "All",
      income: "No income limit",
      caste: "All",
    },
  },
  {
    id: "9",
    scheme_name: "Krishi Bhagya Scheme",
    category: "Agriculture",
    benefits:
      "Subsidy for farm ponds and irrigation support",
    application_link: "https://raitamitra.karnataka.gov.in/",
    eligibility: {
      age: "18+",
      gender: "All",
      income: "Below 6L per annum",
      caste: "All",
    },
  },
  {
    id: "10",
    scheme_name: "Yuva Nidhi Scheme",
    category: "Employment",
    benefits: "Unemployment allowance for educated youth",
    application_link: "https://sevasindhu.karnataka.gov.in/",
    eligibility: {
      age: "18-35",
      gender: "All",
      income: "No income limit",
      caste: "All",
    },
  },
]



export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  const scheme = mockSchemes.find((s) => s.id === id);

  if (!scheme) {
    return NextResponse.json({ error: "Scheme not found" }, { status: 404 });
  }

  return NextResponse.json(scheme);
}

