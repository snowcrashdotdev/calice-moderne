import type { Metadata } from "next";
import localFont from "next/font/local";
import { verifySession } from "@/app/lib/session";
import { Logout } from "@/app/components/auth/logout";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Calice Cup",
  description: "Online team and individual high score tournaments",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await verifySession()

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="flex justify-end px-5 py-2">
          {session.isAuth  && (<Logout />)}
        </header>

        {children}
      </body>
    </html>
  );
}
