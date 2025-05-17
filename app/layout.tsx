import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Parallel Me",
  description: "Find your parallel universe identity",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <header className="fixed top-0 right-0 p-4 z-50">
            <SignedOut>
              <div className="flex gap-2">
                <SignInButton mode="modal">
                  <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full hover:from-pink-600 hover:to-purple-600 transition-all duration-300">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
