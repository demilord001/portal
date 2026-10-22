"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function AccountControl() {
  const pathname = usePathname();
  if (pathname !== "/chat" || !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) return null;
  return <div className="account-control"><UserButton afterSignOutUrl="/" /></div>;
}
