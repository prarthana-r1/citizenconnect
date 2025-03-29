"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ArrowRight, ChevronRight, X } from "lucide-react"

// Define types for our data
type Eligibility = {
  age: string
  gender: string
  income: string
  caste: string
}

type Scheme = {
  id: string
  scheme_name: string
  category: string
  benefits: string
  application_link: string
  eligibility: Eligibility
}

export default function SchemesPage() {
  const [domains, setDomains] = useState<string[]>([
    "Financial Heritage",
    "Homestead Support",
    "Wellness Tradition",
    "Education",
    "Agriculture",
    "Employment",
  ])
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)
  const [schemes, setSchemes] = useState<Scheme[]>([])
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Fetch schemes when a domain is selected
  useEffect(() => {
    if (selectedDomain) {
      fetchSchemes(selectedDomain)
    }
  }, [selectedDomain])

  // Function to fetch schemes from the database
  const fetchSchemes = async (domain: string) => {
    setIsLoading(true)
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/schemes?category=${encodeURIComponent(domain)}`)
      const data = await response.json()
      setSchemes(data)
    } catch (error) {
      console.error("Error fetching schemes:", error)
      // Fallback data for demonstration
      setSchemes([
        {
          id: "1",
          scheme_name: "Financial Assistance Program",
          category: domain,
          benefits: "Monthly financial support for eligible citizens",
          application_link: "https://example.com/apply",
          eligibility: {
            age: "18-65",
            gender: "All",
            income: "Below 3L per annum",
            caste: "All",
          },
        },
        {
          id: "2",
          scheme_name: "Heritage Preservation Grant",
          category: domain,
          benefits: "Funding for cultural preservation projects",
          application_link: "https://example.com/apply",
          eligibility: {
            age: "21+",
            gender: "All",
            income: "Below 5L per annum",
            caste: "All",
          },
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // Function to fetch scheme details
  const fetchSchemeDetails = async (schemeId: string) => {
    setIsLoading(true)
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/schemes/${schemeId}`)
      const data = await response.json()
      setSelectedScheme(data)
    } catch (error) {
      console.error("Error fetching scheme details:", error)
      // Find the scheme in our current list as fallback
      const scheme = schemes.find((s) => s.id === schemeId)
      if (scheme) {
        setSelectedScheme(scheme)
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Filter schemes based on search query
  const filteredSchemes = schemes.filter(
    (scheme) =>
      scheme.scheme_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.benefits.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Navigation - Without login/signup */}
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
                  <Link href="/schemes" className="hover:text-amber-200 transition-colors font-medium text-amber-200">
                    Schemes
                  </Link>
                </li>
                <li>
                  <Link href="https://citizenconnecteligibility.onrender.com" className="hover:text-amber-200 transition-colors">
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
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-stone-800/40 z-10"></div>
        <Image
          src="/government-building.jpg"
          alt="Government Building"
          width={1920}
          height={400}
          className="w-full h-[250px] object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-serif text-3xl md:text-4xl text-amber-50 font-bold max-w-3xl">
            Government Schemes & Benefits
          </h1>
          <p className="text-amber-100 mt-2 max-w-2xl">Discover schemes and benefits you may be eligible for</p>
          <div className="mt-6 w-full max-w-xl relative">
            <input
              type="text"
              placeholder="Search schemes, benefits, eligibility..."
              className="w-full py-3 px-4 pr-10 rounded-md border border-amber-200 bg-amber-50/90 text-stone-800 placeholder-stone-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 w-5 h-5" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-stone-600 mb-8">
          <Link href="/" className="hover:text-amber-800">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/schemes" className="hover:text-amber-800">
            Schemes
          </Link>
          {selectedDomain && (
            <>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-amber-800">{selectedDomain}</span>
            </>
          )}
          {selectedScheme && (
            <>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-amber-800">{selectedScheme.scheme_name}</span>
            </>
          )}
        </div>

        {/* Content based on selection state */}
        {!selectedDomain && !selectedScheme && (
          <>
            <h2 className="font-serif text-3xl text-stone-800 mb-8 pb-2 border-b border-amber-200">Browse by Domain</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {domains.map((domain) => (
                <div
                  key={domain}
                  className="bg-amber-50 p-6 rounded-md shadow-md border border-amber-200 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedDomain(domain)}
                >
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-stone-700 text-xl">
                      {domain === "Financial Heritage" && "💰"}
                      {domain === "Homestead Support" && "🏠"}
                      {domain === "Wellness Tradition" && "🏥"}
                      {domain === "Education" && "🎓"}
                      {domain === "Agriculture" && "🌾"}
                      {domain === "Employment" && "💼"}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-stone-800 mb-2">{domain}</h3>
                  <p className="text-stone-600 mb-4">Explore all schemes related to {domain.toLowerCase()}</p>
                  <button className="text-stone-800 font-medium flex items-center gap-1 hover:text-amber-800 transition-colors">
                    View Schemes <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {selectedDomain && !selectedScheme && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-serif text-3xl text-stone-800">{selectedDomain} Schemes</h2>
              <button
                onClick={() => setSelectedDomain(null)}
                className="flex items-center gap-1 text-amber-800 hover:text-amber-600 transition-colors"
              >
                <X className="w-4 h-4" /> Clear Selection
              </button>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-700"></div>
              </div>
            ) : filteredSchemes.length > 0 ? (
              <div className="grid gap-6">
                {filteredSchemes.map((scheme) => (
                  <div
                    key={scheme.id}
                    className="bg-amber-50 p-6 rounded-md shadow-md border border-amber-200 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div>
                        <h3 className="font-serif text-xl text-stone-800 mb-2">{scheme.scheme_name}</h3>
                        <p className="text-stone-600 mb-4">{scheme.benefits}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="px-2 py-1 bg-amber-100 text-stone-700 text-xs rounded-full">
                            Age: {scheme.eligibility.age}
                          </span>
                          <span className="px-2 py-1 bg-amber-100 text-stone-700 text-xs rounded-full">
                            Gender: {scheme.eligibility.gender}
                          </span>
                          <span className="px-2 py-1 bg-amber-100 text-stone-700 text-xs rounded-full">
                            Income: {scheme.eligibility.income}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 min-w-[200px]">
                        <button
                          onClick={() => fetchSchemeDetails(scheme.id)}
                          className="px-4 py-2 bg-stone-800 text-amber-50 rounded-md hover:bg-stone-700 transition-colors text-sm w-full"
                        >
                          View Details
                        </button>
                        <a
                          href={scheme.application_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 border border-amber-700 text-amber-800 rounded-md hover:bg-amber-700 hover:text-white transition-colors text-sm text-center w-full"
                        >
                          Apply Now
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-stone-600">No schemes found for this domain.</p>
              </div>
            )}
          </>
        )}

        {selectedScheme && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-serif text-3xl text-stone-800">{selectedScheme.scheme_name}</h2>
              <button
                onClick={() => setSelectedScheme(null)}
                className="flex items-center gap-1 text-amber-800 hover:text-amber-600 transition-colors"
              >
                <X className="w-4 h-4" /> Back to Schemes
              </button>
            </div>

            <div className="bg-amber-50 p-8 rounded-md shadow-md border border-amber-200">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="mb-6">
                    <h3 className="font-serif text-xl text-stone-800 mb-3">About this Scheme</h3>
                    <p className="text-stone-600">{selectedScheme.benefits}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-serif text-xl text-stone-800 mb-3">Eligibility Criteria</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-amber-100/50 p-4 rounded-md">
                        <h4 className="font-medium text-stone-800 mb-2">Age</h4>
                        <p className="text-stone-600">{selectedScheme.eligibility.age}</p>
                      </div>
                      <div className="bg-amber-100/50 p-4 rounded-md">
                        <h4 className="font-medium text-stone-800 mb-2">Gender</h4>
                        <p className="text-stone-600">{selectedScheme.eligibility.gender}</p>
                      </div>
                      <div className="bg-amber-100/50 p-4 rounded-md">
                        <h4 className="font-medium text-stone-800 mb-2">Income</h4>
                        <p className="text-stone-600">{selectedScheme.eligibility.income}</p>
                      </div>
                      <div className="bg-amber-100/50 p-4 rounded-md">
                        <h4 className="font-medium text-stone-800 mb-2">Caste</h4>
                        <p className="text-stone-600">{selectedScheme.eligibility.caste}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-serif text-xl text-stone-800 mb-3">Required Documents</h3>
                    <ul className="list-disc pl-5 text-stone-600 space-y-1">
                      <li>Identity Proof (Aadhaar Card/Voter ID)</li>
                      <li>Address Proof</li>
                      <li>Income Certificate</li>
                      <li>Caste Certificate (if applicable)</li>
                      <li>Bank Account Details</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="bg-amber-100/50 p-6 rounded-md mb-6">
                    <h3 className="font-serif text-xl text-stone-800 mb-3">Application Process</h3>
                    <ol className="list-decimal pl-5 text-stone-600 space-y-2">
                      <li>Register on the portal</li>
                      <li>Fill the application form</li>
                      <li>Upload required documents</li>
                      <li>Submit the application</li>
                      <li>Track your application status</li>
                    </ol>
                  </div>

                  <a
                    href={selectedScheme.application_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors text-center font-medium"
                  >
                    Apply Now
                  </a>

                  <div className="mt-4">
                    <button
                      onClick={() => window.print()}
                      className="w-full block px-6 py-3 border border-amber-700 text-amber-800 rounded-md hover:bg-amber-700 hover:text-white transition-colors text-center font-medium"
                    >
                      Print Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-stone-900 text-amber-100 py-8">
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
                  <Link
                    href="/schemes"
                    className="hover:text-amber-200 transition-colors"
                    onClick={() => setSelectedDomain("Financial Heritage")}
                  >
                    Financial Support
                  </Link>
                </li>
                <li>
                  <Link
                    href="/schemes"
                    className="hover:text-amber-200 transition-colors"
                    onClick={() => setSelectedDomain("Homestead Support")}
                  >
                    Housing Schemes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/schemes"
                    className="hover:text-amber-200 transition-colors"
                    onClick={() => setSelectedDomain("Wellness Tradition")}
                  >
                    Healthcare Benefits
                  </Link>
                </li>
                <li>
                  <Link
                    href="/schemes"
                    className="hover:text-amber-200 transition-colors"
                    onClick={() => setSelectedDomain("Education")}
                  >
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