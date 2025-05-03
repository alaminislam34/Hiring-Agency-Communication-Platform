import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  console.log("🔥 Middleware hit");

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  console.log("Token:", token);
  console.log("Requested Path:", pathname);

  // Public routes
  const publicPaths = ["/signin", "/forbidden"];
  if (publicPaths.includes(pathname) || pathname.startsWith("/public")) {
    return NextResponse.next();
  }

  // If no token, redirect to signin
  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // Route access control by role
  const role = token.role;

  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/forbidden", req.url));
  }

  if (pathname.startsWith("/employer") && role !== "employer") {
    return NextResponse.redirect(new URL("/forbidden", req.url));
  }

  if (pathname.startsWith("/jobSeeker") && role !== "jobSeeker") {
    return NextResponse.redirect(new URL("/forbidden", req.url));
  }
  if (pathname.startsWith("/jobSeeker") && role !== "jobSeeker") {
    return NextResponse.redirect(new URL("/forbidden", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/employer/:path*",
    "/jobSeeker/:path*",
    "/signin",
    "/forbidden",
  ],
};
