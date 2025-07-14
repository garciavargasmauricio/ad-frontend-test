import { Archivo } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/common/Footer";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/common/Header";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-archivo",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GamerShop",
  description: "Game Catalog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${inter.className}`}>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
