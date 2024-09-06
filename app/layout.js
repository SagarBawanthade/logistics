import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Royal Express",
  description: "Founded in 1999 by Mr. Tito Dasgupta, ROYAL EXPRESS set out with a vision to transform the freight industry. For over a decade, we have specialized in retrieving loads and ensuring timely deliveries with exceptional service. Following the passing of Mr. Dasgupta, his daughter took over the business in 2018 and has been successfully managing it ever since. Under her leadership, ROYAL EXPRESS continues to uphold its commitment to excellence and reliability in the freight industry.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={inter.className}>{children}</body>
      
    </html>
  );
}
