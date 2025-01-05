import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
//import { verifyAuth0Jwt } from "./lib/auth0";
//import { verifyInHouseSession } from "./lib/inHouseAuth";

export async function middleware(request: NextRequest) {
  // If matched /apps/:path*, do Auth0 check
  const url = request.nextUrl.clone();

  // If the user is at the root (no pathname)
  if (url.pathname === "/") {
    // Redirect to /apps
    url.pathname = "/apps";
    return NextResponse.redirect(url);
  }

  if (url.pathname === "/kiosk") {
    url.pathname = "/apps/kioskauth";
    return NextResponse.redirect(url);
  }

  // Otherwise, continue
  return NextResponse.next();
}

// If matched /kiosk/:path*, do in-house check

export const config = {
  matcher: ["/apps/:path*", "/kiosk/:path*", "/"],
};
