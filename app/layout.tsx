import type { Metadata } from "next";
import {
  Archivo,
  Bodoni_Moda,
  Geist,
  Geist_Mono,
  Playfair_Display,
  Space_Mono,
} from "next/font/google";
import "./globals.css";
import "./editorial.css";
import { AppChrome } from "@/components/app-chrome";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Elegant serif for the wordmark and display headings.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

/* Editorial redesign type system (portada / catálogo / nosotros / anatomía). */
const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Medianoche — Tienda",
  description: "Tienda en línea Medianoche. Moda, calzado, accesorios y tecnología.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${bodoni.variable} ${archivo.variable} ${spaceMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans">
        <AppChrome navbar={<Navbar />} footer={<Footer />}>
          {children}
        </AppChrome>
      </body>
    </html>
  );
}
