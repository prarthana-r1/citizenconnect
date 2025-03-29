"use client"

import type React from "react"
import { useState } from "react"
import { CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

// Mock scheme data
const schemes = [
  {
    id: 1,
    name: "Financial Heritage Grant",
    description: "Financial support for low-income families to preserve economic stability.",
    eligibility: {
      minAge: 18,
      maxAge: 65,
      castes: ["SC", "ST", "OBC"],
      maxIncome: 250000,
    },
    benefits: "Up to ₹25,000 financial assistance annually",
    documents: ["Aadhar Card", "Income Certificate", "Caste Certificate", "Bank Account Details"],
  },
  {
    id: 2,
    name: "Homestead Support Program",
    description: "Housing assistance for eligible citizens to secure affordable housing.",
    eligibility: {
      minAge: 21,
      castes: ["General", "SC", "ST", "OBC"],
      maxIncome: 350000,
    },
    benefits: "Housing subsidy of up to ₹2.5 lakhs",
    documents: ["Aadhar Card", "Income Certificate", "Land Documents (if any)", "Bank Account Details"],
  },
  {
    id: 3,
    name: "Wellness Tradition Scheme",
    description: "Healthcare benefits for citizens to access quality medical services.",
    eligibility: {
      minAge: 0,
      maxAge: 100,
      castes: ["General", "SC", "ST", "OBC"],
      maxIncome: 500000,
    },
    benefits: "Free health checkups and up to ₹5 lakhs coverage for medical treatments",
    documents: ["Aadhar Card", "Income Certificate", "Medical Records (if any)"],
  },
  {
    id: 4,
    name: "Education Empowerment Scholarship",
    description: "Educational support for students from underprivileged backgrounds.",
    eligibility: {
      minAge: 16,
      maxAge: 30,
      castes: ["SC", "ST", "OBC"],
      maxIncome: 300000,
    },
    benefits: "Full tuition coverage and ₹2,000 monthly stipend",
    documents: ["Aadhar Card", "Income Certificate", "Caste Certificate", "Educational Records"],
  },
  {
    id: 5,
    name: "Senior Citizen Welfare Program",
    description: "Support for elderly citizens to ensure dignified living.",
    eligibility: {
      minAge: 60,
      castes: ["General", "SC", "ST", "OBC"],
      maxIncome: 400000,
    },
    benefits: "Monthly pension of ₹3,000 and free healthcare services",
    documents: ["Aadhar Card", "Age Certificate", "Income Certificate", "Bank Account Details"],
  },
]

export default function EligibilityChecker() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    caste: "",
    income: "",
  })

  const [eligibleSchemes, setEligibleSchemes] = useState<typeof schemes | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Check eligibility
    const age = Number.parseInt(formData.age)
    const income = Number.parseInt(formData.income)

    const eligible = schemes.filter((scheme) => {
      const ageEligible =
        (scheme.eligibility.minAge === undefined || age >= scheme.eligibility.minAge) &&
        (scheme.eligibility.maxAge === undefined || age <= scheme.eligibility.maxAge)

      const casteEligible = scheme.eligibility.castes.includes(formData.caste)

      const incomeEligible = income <= scheme.eligibility.maxIncome

      return ageEligible && casteEligible && incomeEligible
    })

    setEligibleSchemes(eligible)
    setSubmitted(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      age: "",
      gender: "",
      caste: "",
      income: "",
    })
    setEligibleSchemes(null)
    setSubmitted(false)
  }

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Navigation */}
      <header className="bg-stone-900 text-amber-50 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center">
              <span className="text-stone-800 text-xs">🏛</span>
            </div>
            <span className="font-serif text-xl">CitizenConnect</span>
          </Link>
          <div className="flex items-center gap-6">
            <nav>
              <ul className="flex gap-6">
                <li>
                  <Link href="/" className="hover:text-amber-200 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/schemes" className="hover:text-amber-200 transition-colors">
                    Schemes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/eligibility"
                    className="hover:text-amber-200 transition-colors font-medium text-amber-200"
                  >
                    Eligibility
                  </Link>
                </li>
                <li>
                  <Link href="/chatbot" className="hover:text-amber-200 transition-colors">
                    AI Assist
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="flex gap-3">
              <Link
                href="/login"
                className="px-4 py-1.5 border border-amber-200 text-amber-100 rounded hover:bg-amber-900/30 transition-colors text-sm"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-1.5 bg-amber-700 text-amber-50 rounded hover:bg-amber-600 transition-colors text-sm"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl md:text-4xl text-stone-800 mb-4">Eligibility Checker</h1>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Find out which government schemes you're eligible for by providing some basic information.
            </p>
          </div>

          {!submitted ? (
            <div className="bg-white rounded-lg shadow-md border border-amber-200 p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-stone-700 font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="age" className="block text-stone-700 font-medium">
                      Age
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      min="0"
                      max="120"
                      className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Enter your age"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="gender" className="block text-stone-700 font-medium">
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="" disabled>
                        Select your gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="caste" className="block text-stone-700 font-medium">
                      Caste Category
                    </label>
                    <select
                      id="caste"
                      name="caste"
                      value={formData.caste}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="" disabled>
                        Select your caste category
                      </option>
                      <option value="General">General</option>
                      <option value="OBC">OBC</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                    </select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="income" className="block text-stone-700 font-medium">
                      Annual Income (₹)
                    </label>
                    <input
                      type="number"
                      id="income"
                      name="income"
                      value={formData.income}
                      onChange={handleChange}
                      required
                      min="0"
                      className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Enter your annual income"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-700 text-amber-50 rounded-md hover:bg-amber-600 transition-colors font-medium"
                  >
                    Check Eligibility
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md border border-amber-200 p-6 md:p-8">
              <div className="mb-6 flex flex-col items-center">
                <h2 className="font-serif text-2xl text-stone-800 mb-2">Eligibility Results for {formData.name}</h2>
                <p className="text-stone-600 text-center">
                  Based on your information, you are eligible for the following schemes:
                </p>
              </div>

              {eligibleSchemes && eligibleSchemes.length > 0 ? (
                <div className="space-y-6">
                  {eligibleSchemes.map((scheme) => (
                    <div key={scheme.id} className="border border-amber-200 rounded-md p-5 bg-amber-50/50">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-serif text-xl text-stone-800 mb-2">{scheme.name}</h3>
                          <p className="text-stone-600 mb-3">{scheme.description}</p>

                          <div className="mb-3">
                            <h4 className="font-medium text-stone-700 mb-1">Benefits:</h4>
                            <p className="text-stone-600">{scheme.benefits}</p>
                          </div>

                          <div>
                            <h4 className="font-medium text-stone-700 mb-1">Required Documents:</h4>
                            <ul className="list-disc list-inside text-stone-600">
                              {scheme.documents.map((doc, index) => (
                                <li key={index}>{doc}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-4">
                            <Link
                              href={`/apply/${scheme.id}`}
                              className="inline-block px-4 py-2 bg-stone-800 text-amber-50 rounded-md hover:bg-stone-700 transition-colors text-sm"
                            >
                              Apply Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="flex justify-center mb-4">
                    <AlertCircle className="h-12 w-12 text-amber-600" />
                  </div>
                  <h3 className="font-serif text-xl text-stone-800 mb-2">No Eligible Schemes Found</h3>
                  <p className="text-stone-600 mb-6">
                    Based on the information provided, we couldn't find any schemes you're eligible for.
                  </p>
                  <p className="text-stone-600 mb-6">
                    You may want to check with your local government office for more specific programs.
                  </p>
                </div>
              )}

              <div className="mt-8 flex justify-center">
                <button
                  onClick={resetForm}
                  className="px-6 py-2 border border-amber-700 text-amber-700 rounded-md hover:bg-amber-50 transition-colors"
                >
                  Check Again
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-amber-100 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-serif text-xl mb-4 text-amber-50">CitizenConnect</h3>
              <p className="text-sm text-amber-200/80">
                Unifying government schemes to empower citizens with easy access to benefits and support.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-amber-50">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="hover:text-amber-200 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-amber-200 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-amber-200 transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-amber-200 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-amber-50">Scheme Categories</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/schemes/financial" className="hover:text-amber-200 transition-colors">
                    Financial Support
                  </Link>
                </li>
                <li>
                  <Link href="/schemes/housing" className="hover:text-amber-200 transition-colors">
                    Housing Schemes
                  </Link>
                </li>
                <li>
                  <Link href="/schemes/healthcare" className="hover:text-amber-200 transition-colors">
                    Healthcare Benefits
                  </Link>
                </li>
                <li>
                  <Link href="/schemes/education" className="hover:text-amber-200 transition-colors">
                    Education Grants
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-amber-50">Stay Connected</h4>
              <p className="text-sm mb-4">Subscribe to receive updates on new schemes and benefits.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 bg-stone-800 border border-amber-700/50 rounded-l-md text-sm flex-grow"
                />
                <button className="bg-amber-700 px-3 py-2 rounded-r-md text-sm hover:bg-amber-600 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-amber-900 mt-8 pt-8 text-center text-sm text-amber-200/60">
            <p>© {new Date().getFullYear()} CitizenConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

