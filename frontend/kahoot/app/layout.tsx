import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/provider";
import Header from "./components/header";
import "@rainbow-me/rainbowkit/styles.css";
import Provider from "./api/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EtherQuest",
  description: "Web3 Kahoot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header /> <Provider> {children}</Provider>
        </Providers>
      </body>
    </html>
  );
}
