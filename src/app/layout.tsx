import type { Metadata } from "next";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppWidget } from "@/components/whatsapp-widget";

export const metadata: Metadata = {
  title: "Sol Focus Lamp | Woxly",
  description: "A calm, glare-free desk light made for your best work.",
  metadataBase: new URL("https://woxly-focus-store.vercel.app"),
  openGraph: {
    title: "Sol Focus Lamp",
    description: "Light that helps you find your flow.",
    images: ["/images/sol-hero.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          {children}
          <WhatsAppWidget />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
