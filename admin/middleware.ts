import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = cookies().get("token");

  // Redirect to the dashboard if the user is on the signin page and has a token
  if (request.nextUrl.pathname === "/" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token) {
    const decodedToken = jwt.decode(token.value) as { exp: number };

    if (decodedToken.exp * 1000 < Date.now()) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/"],
};
