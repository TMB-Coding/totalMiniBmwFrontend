import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get("jwt")?.value; // Extract the JWT from cookies
  const { pathname } = request.nextUrl; // Get the request pathname

  // Define public paths
  const publicPaths = ["/apps/auth", "/apps/kiosk"];

  // Check if the path starts with any public path
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // Allow public paths
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Require authentication for all other /apps/... routes
  if (pathname.startsWith("/apps") && !jwt) {
    // Redirect to /apps/auth if not authenticated
    return NextResponse.redirect(new URL("/apps/auth", request.url));
  }

  if (pathname.startsWith("/apps")) {
    try {
      // Verify the JWT
      const req = await fetch("http://localhost:8080/auth/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${jwt}`,
        },
      });
      const code = req.status;
      if (code != 200) {
        return NextResponse.redirect(new URL("/apps/auth", request.url));
      }
      return NextResponse.next();
    } catch (error) {
      console.error("Invalid or expired JWT:", error);
      // Redirect to /apps/auth if token verification fails
      return NextResponse.redirect(new URL("/apps/auth", request.url));
    }
  }

  // Allow the request to proceed for authenticated users
}

// Specify the matcher to apply middleware to specific routes
export const config = {
  matcher: ["/apps/:path*"], // Middleware applies to all /apps/... routes
};
