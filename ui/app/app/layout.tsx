import type { Metadata } from "next";
import { verifySession } from "@/app/lib/session";
import { Logout } from "@/app/components/auth/logout";
import "./globals.css";
import Link from "next/link";

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
      <body className="p-6">
        <header className="flex justify-end px-5 py-2 gap-x-5">
          {session.isAuth ? (
            <>
              <p>Welcome, {session.user}</p>
              <Logout />
            </>
          ) : <Link href="/login">Login</Link>}
        </header>

        {children}
      </body>
    </html>
  );
}
