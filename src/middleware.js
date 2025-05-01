import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  console.log("🔥 Middleware hit");

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  console.log("Token:", token);
  console.log("Requested Path:", pathname);

  // Allow public routes
  if (
    pathname === "/signin" ||
    pathname === "/signup" ||
    pathname === "/forbidden" ||
    pathname.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  // If no token, redirect to signin
  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // Restrict jobSeekers from accessing admin routes
  if (pathname.startsWith("/admin") && token.role === "jobSeeker") {
    return NextResponse.redirect(new URL("/forbidden", req.url));
  }

  // Restrict employers from accessing admin routes
  if (pathname.startsWith("/admin") && token.role === "employer") {
    return NextResponse.redirect(new URL("/forbidden", req.url));
  }

  // Restrict admins from accessing employer routes
  if (pathname.startsWith("/employer") && token.role === "admin") {
    return NextResponse.redirect(new URL("/forbidden", req.url));
  }

  // Restrict admins from accessing jobSeeker routes
  if (pathname.startsWith("/jobSeeker") && token.role === "admin") {
    return NextResponse.redirect(new URL("/forbidden", req.url));
  }

  // Restrict employers from accessing jobSeeker routes
  if (pathname.startsWith("/jobSeeker") && token.role === "employer") {
    return NextResponse.redirect(new URL("/forbidden", req.url));
  }

  // Everything is okay
  return NextResponse.next();
}

// Apply middleware to protected routes
export const config = {
  matcher: [
    "/admin/:path*",
    "/employer/:path*",
    "/jobSeeker/:path*",
    "/admin",
    "/employer",
    "/jobSeeker",
  ],
};
