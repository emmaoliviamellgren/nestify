import type { Metadata } from "next";
import "./globals.css";
import { lexend, familjenGrotesk } from "./utils/fonts";

export const metadata: Metadata = {
  title: "Nestify",
  description: "Where to?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lexend.variable} ${familjenGrotesk.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
