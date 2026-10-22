import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isClerkConfigured = 
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
  !!process.env.CLERK_SECRET_KEY;

export default isClerkConfigured 
  ? clerkMiddleware(async (auth, req) => {
      const { userId } = await auth();
      if (req.nextUrl.pathname.startsWith('/chat') && !userId) {
        return (await auth()).redirectToSignIn();
      }
      if (req.nextUrl.pathname === '/' && userId) {
        return NextResponse.redirect(new URL('/chat', req.url));
      }
    }) 
  : () => NextResponse.next();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html|css|js|gif|svg|jpg|jpeg|png|woff|woff2|ico|csv|docx|xlsx|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
