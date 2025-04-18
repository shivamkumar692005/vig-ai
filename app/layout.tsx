import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider} from '@clerk/nextjs'
import Header from "@/components/header";
import {dark} from "@clerk/themes"
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "VigAI career coach",
  description: "VigAI career coach",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      baseTheme:dark
    }}>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} `}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>

            <Toaster richColors />

            <footer className="bg-muted/50 py-12 ">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p>made with ❤️ by VigAI</p>
              </div>
            </footer>
          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
