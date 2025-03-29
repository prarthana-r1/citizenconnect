/*"use client";

import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
//import { JSX } from "react";
import { JSX } from "react/jsx-runtime";

export default function Navbar(): JSX.Element {
  return (
    <nav className="p-4 bg-blue-500 text-white flex justify-between items-center">
      <Link href="/" className="text-lg font-bold">
        Govt Schemes
      </Link>

      <div>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-white text-blue-500 px-4 py-2 rounded">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
}*/
