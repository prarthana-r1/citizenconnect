import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react";
import { Search, User, FileText, CheckCircle, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/signin"); // Redirect to login if not authenticated
    }
  }, [isSignedIn, router]);

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
                  <Link href="/" className="hover:text-amber-200 transition-colors font-medium text-amber-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/schemes" className="hover:text-amber-200 transition-colors">
                    Schemes
                  </Link>
                </li>
                <li>
                  <Link href="/eligibility" className="hover:text-amber-200 transition-colors">
                    Eligibility
                  </Link>
                </li>
                <li>
                  <Link href="/apply" className="hover:text-amber-200 transition-colors">
                    Apply
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
          height={600}
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-serif text-4xl md:text-5xl text-amber-50 font-bold max-w-3xl">
            Preserving Citizen Government Connections
          </h1>
          <p className="text-amber-100 mt-4 max-w-2xl">Discover, verify, and engage with government opportunities.</p>
          <div className="mt-8 w-full max-w-xl relative">
            <input
              type="text"
              placeholder="Search heritage schemes, benefits, eligibility..."
              className="w-full py-3 px-4 pr-10 rounded-md border border-amber-200 bg-amber-50/90 text-stone-800 placeholder-stone-500"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 w-5 h-5" />
          </div>
        </div>
      </section>

      {/* Government Initiatives */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="font-serif text-3xl text-stone-800 text-center mb-12 pb-2 border-b border-amber-200">
          Government Initiatives
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-amber-50 p-6 rounded-md shadow-md border border-amber-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <User className="text-stone-700 w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-stone-800 mb-2">Financial Heritage</h3>
            <p className="text-stone-600 mb-4">Preserving economic empowerment through financial services</p>
            <Link
              href="/financial-heritage"
              className="text-stone-800 font-medium flex items-center gap-1 hover:text-amber-800 transition-colors"
            >
              Explore Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-amber-50 p-6 rounded-md shadow-md border border-amber-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="text-stone-700 w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-stone-800 mb-2">Homestead Support</h3>
            <p className="text-stone-600 mb-4">Connecting citizens with housing solutions</p>
            <Link
              href="/homestead-support"
              className="text-stone-800 font-medium flex items-center gap-1 hover:text-amber-800 transition-colors"
            >
              Explore Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-amber-50 p-6 rounded-md shadow-md border border-amber-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="text-stone-700 w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-stone-800 mb-2">Wellness Tradition</h3>
            <p className="text-stone-600 mb-4">Nurturing community health through honored care</p>
            <Link
              href="/wellness-tradition"
              className="text-stone-800 font-medium flex items-center gap-1 hover:text-amber-800 transition-colors"
            >
              Explore Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Eligibility and Application Support */}
      <section className="py-12 bg-amber-100/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-amber-50 p-8 rounded-md shadow-md border border-amber-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="text-stone-700 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-stone-800 mb-3">Eligibility Checker</h3>
                  <p className="text-stone-600 mb-4">
                    Discover your connections to government support through our comprehensive verification tool.
                  </p>
                  <Link
                    href="/eligibility"
                    className="inline-block px-4 py-2 bg-stone-800 text-amber-50 rounded-md hover:bg-stone-700 transition-colors"
                  >
                    Check Eligibility
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 p-8 rounded-md shadow-md border border-amber-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="text-stone-700 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-stone-800 mb-3">Application Support</h3>
                  <p className="text-stone-600 mb-4">Guided pathways to navigating government scheme applications.</p>
                  <Link
                    href="/application-support"
                    className="inline-block px-4 py-2 bg-stone-800 text-amber-50 rounded-md hover:bg-stone-700 transition-colors"
                  >
                    Get Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="font-serif text-3xl text-stone-800 text-center mb-12">How CitizenConnect Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-serif text-2xl text-stone-800">1</span>
            </div>
            <h3 className="font-serif text-xl text-stone-800 mb-2">Check Eligibility</h3>
            <p className="text-stone-600">
              Answer a few questions to discover which government schemes you qualify for.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-serif text-2xl text-stone-800">2</span>
            </div>
            <h3 className="font-serif text-xl text-stone-800 mb-2">Get Guidance</h3>
            <p className="text-stone-600">Receive personalized guidance on required documents and application steps.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-serif text-2xl text-stone-800">3</span>
            </div>
            <h3 className="font-serif text-xl text-stone-800 mb-2">Apply Seamlessly</h3>
            <p className="text-stone-600">
              Complete your applications with step-by-step assistance and track your progress.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-stone-800 text-amber-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl mb-4">Ready to discover your benefits?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-amber-100">
            Start your journey to accessing the government schemes and benefits you deserve.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/eligibility"
              className="px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
            >
              Check Eligibility Now
            </Link>
            <Link
              href="/schemes"
              className="px-6 py-3 bg-transparent border border-amber-200 text-amber-100 rounded-md hover:bg-amber-900/30 transition-colors"
            >
              Browse All Schemes
            </Link>
          </div>
        </div>
      </section>

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
                  <Link href="/schemes?category=financial" className="hover:text-amber-200 transition-colors">
                    Financial Support
                  </Link>
                </li>
                <li>
                  <Link href="/schemes?category=housing" className="hover:text-amber-200 transition-colors">
                    Housing Schemes
                  </Link>
                </li>
                <li>
                  <Link href="/schemes?category=healthcare" className="hover:text-amber-200 transition-colors">
                    Healthcare Benefits
                  </Link>
                </li>
                <li>
                  <Link href="/schemes?category=education" className="hover:text-amber-200 transition-colors">
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