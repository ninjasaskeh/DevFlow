import type { Metadata } from "next";
import localFont from "next/font/local";
import React from "react";

import "./globals.css";
import Navbar from "@/components/navigation/navbar";
import ThemeProvider from "@/context/Theme";

const inter = localFont({
  src: "./fonts/InterVF.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 600 700 800 900",
});
const spaceGrotesk = localFont({
  src: "./fonts/SpaceGroteskVF.ttf",
  variable: "--font-space-grotesk",
  weight: "300 400 500 600 700",
});

export const metadata: Metadata = {
  title: "DevFlow",
  description:
    "A coummunity-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with other developers from arround the world. Explore topics in web development, mobile development, algorithm and data structures, and more.",
  icons: {
    icon: "/images/site-logo.svg",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/*  kalo .className tu biar di pake ama semua tulisan, kalo .variable dia harus dipanggil dulu */}
      <body
        className={`${inter.className}  ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
