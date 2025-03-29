import type { Metadata } from "next"
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs"
import { Inter, Lora } from "next/font/google"
import "../styles/globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" })

export const metadata: Metadata = {
  title: "CitizenConnect - Unifying Government Schemes",
  description: "Discover, verify eligibility, and get guidance for all government schemes in one place.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} ${lora.variable} font-sans`}>
          {/* Show UserButton if signed in, otherwise show Login and Signup */}
          <nav className="p-4 bg-stone-900 text-amber-50 flex justify-between">
            <h1 className="text-xl font-serif">CitizenConnect</h1>
            <div>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <a href="/sign-in" className="mr-4">Login</a>
                <a href="/sign-up">Sign Up</a>
              </SignedOut>
            </div>
          </nav>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
