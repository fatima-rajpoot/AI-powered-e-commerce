import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import ChatBot from "@/components/ChatBot";
import ReviewModal from "@/components/ReviewModal";
import { CartProvider } from "@/context/CartContext";
import { ReviewProvider } from "@/context/ReviewContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ShopEase — Women & Men Fashion",
  description: "Shop women's heels, makeup, dresses and men's watches, shoes, wallets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <CartProvider>
          <ReviewProvider>
            <Header />
            <CartDrawer />
            <ReviewModal />
            <ChatBot />
            {children}
          </ReviewProvider>
        </CartProvider>
      </body>
    </html>
  );
}
