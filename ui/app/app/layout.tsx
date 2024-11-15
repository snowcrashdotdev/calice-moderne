import type { Metadata } from "next";
import { AppFooter, AppHeader } from "@/app/components/app";
import "./globals.css";

export const metadata: Metadata = {
  title: "Calice Cup",
  description: "Online team and individual high score tournaments",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <AppHeader />

        {children}

        <AppFooter />
      </body>
    </html>
  );
}
