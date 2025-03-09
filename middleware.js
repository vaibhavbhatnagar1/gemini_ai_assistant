import { NextResponse } from "next/server";

export function middleware(request) {
  const session = request.cookies.get("session"); // Replace with your session-checking logic

  if (!session) {
    // Redirect unauthenticated users to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow the request if authenticated
  return NextResponse.next();
}

// Define which routes should use the middleware
export const config = {
  matcher: ["/about/page.js"], // Apply middleware to these routes
};
