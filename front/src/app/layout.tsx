import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cartContext";

const fontSans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const fontHeading = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Sotilma — Gestion intelligente de l'eau",
    template: "%s | Sotilma",
  },
  description:
    "SOTILMA révolutionne la gestion de l'eau dans l'agriculture et l'industrie avec des vannes connectées, autonomes et pilotables depuis votre smartphone.",
  keywords: ["irrigation automatique", "vanne connectée", "IoT agricole", "Sénégal", "Sotilma"],
  authors: [{ name: "Sotilma", url: "https://www.sotilmaa.com" }],
  openGraph: {
    type: "website",
    locale: "fr_SN",
    url: "https://www.sotilmaa.com",
    siteName: "Sotilma",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${fontSans.variable} ${fontHeading.variable}`}>
      <head />
      <body className="flex flex-col min-h-screen font-sans antialiased bg-white text-slate-800 selection:bg-primary/20 selection:text-primary-dark">
        <CartProvider>
          <Navbar />
          <main className="flex-1 pt-24">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
