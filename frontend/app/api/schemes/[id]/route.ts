import { NextResponse } from "next/server"

// This would be replaced with your actual database connection
// For example, using Prisma, Supabase, or another database client
const mockSchemes = [
  {
    id: "1",
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
    id: "2",
    scheme_name: "Heritage Preservation Grant",
    category: "Financial Heritage",
    benefits: "Funding for cultural preservation projects and initiatives that maintain local heritage and traditions.",
    application_link: "https://example.com/apply/heritage",
    eligibility: {
      age: "21+",
      gender: "All",
      income: "Below 5L per annum",
      caste: "All",
    },
  },
  {
    id: "3",
    scheme_name: "Housing Subsidy Scheme",
    category: "Homestead Support",
    benefits:
      "Financial assistance for constructing or purchasing a new home with reduced interest rates on home loans.",
    application_link: "https://example.com/apply/housing",
    eligibility: {
      age: "25-60",
      gender: "All",
      income: "Below 6L per annum",
      caste: "All",
    },
  },
  {
    id: "4",
    scheme_name: "Rural Housing Development",
    category: "Homestead Support",
    benefits: "Support for rural housing development including land allocation and construction assistance.",
    application_link: "https://example.com/apply/rural-housing",
    eligibility: {
      age: "18+",
      gender: "All",
      income: "Below 4L per annum",
      caste: "All",
    },
  },
  {
    id: "5",
    scheme_name: "Health Insurance Coverage",
    category: "Wellness Tradition",
    benefits: "Comprehensive health insurance coverage for medical treatments, hospitalization, and procedures.",
    application_link: "https://example.com/apply/health-insurance",
    eligibility: {
      age: "All",
      gender: "All",
      income: "Below 8L per annum",
      caste: "All",
    },
  },
  {
    id: "6",
    scheme_name: "Maternal Health Support",
    category: "Wellness Tradition",
    benefits: "Special healthcare benefits for pregnant women including free check-ups and nutritional support.",
    application_link: "https://example.com/apply/maternal",
    eligibility: {
      age: "18-45",
      gender: "Female",
      income: "Below 5L per annum",
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
    scheme_name: "Skill Development Program",
    category: "Education",
    benefits: "Training programs to develop vocational skills and improve employability.",
    application_link: "https://example.com/apply/skill",
    eligibility: {
      age: "18-35",
      gender: "All",
      income: "Below 5L per annum",
      caste: "All",
    },
  },
  {
    id: "9",
    scheme_name: "Farmer Support Initiative",
    category: "Agriculture",
    benefits:
      "Financial assistance, subsidies, and technical support for farmers to improve agricultural productivity.",
    application_link: "https://example.com/apply/farmer",
    eligibility: {
      age: "18+",
      gender: "All",
      income: "Below 6L per annum",
      caste: "All",
    },
  },
  {
    id: "10",
    scheme_name: "Employment Generation Scheme",
    category: "Employment",
    benefits: "Job creation and employment opportunities through government initiatives and private partnerships.",
    application_link: "https://example.com/apply/employment",
    eligibility: {
      age: "18-40",
      gender: "All",
      income: "Below 3L per annum",
      caste: "All",
    },
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Find the scheme with the matching ID
  const scheme = mockSchemes.find((scheme) => scheme.id === id)

  if (!scheme) {
    return NextResponse.json({ error: "Scheme not found" }, { status: 404 })
  }

  // In a real application, you would query your database here
  // For example with Prisma:
  // const scheme = await prisma.scheme.findUnique({
  //   where: { id }
  // })

  return NextResponse.json(scheme)
}