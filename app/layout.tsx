import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Happy 20th Birthday Benjamin! 🎉",
  description:
    "Celebrate Benjamin's milestone 20th birthday with memories, photos, and messages from friends. Join us in making this day special!",
  generator: "v0.app",
  openGraph: {
    title: "Happy 20th Birthday Benjamin! 🎉",
    description: "Celebrate Benjamin's milestone 20th birthday with memories, photos, and messages from friends.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Happy 20th Birthday Benjamin! 🎉",
    description: "Celebrate Benjamin's milestone 20th birthday with memories and photos from friends.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
