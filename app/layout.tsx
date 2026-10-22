import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";
import type { Metadata } from "next";
import AccountControl from "@/components/account-control";

export const metadata: Metadata = {
  title: "Portal.AI — Ultimate access to next-gen assistance",
  description: "A calm, intelligent space for thinking, making, and discovering.",
};

const isClerkConfigured = 
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
  !!process.env.CLERK_SECRET_KEY;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!isClerkConfigured) {
    return (
      <html lang="en">
        <body style={{ margin: 0, padding: 0 }}>
          {children}<AccountControl /><Analytics />
        </body>
      </html>
    );
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <body style={{ margin: 0, padding: 0 }}>
          {children}<AccountControl /><Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
