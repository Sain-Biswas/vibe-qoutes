import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const sessionToken = 
    request.cookies.get("vibe-snippets.session_token")?.value || 
    request.cookies.get("__Secure-vibe-snippets.session_token")?.value;

  const isAuthRoute = request.nextUrl.pathname.startsWith("/sign-in") || request.nextUrl.pathname.startsWith("/sign-up");
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard");

  if (!sessionToken && isProtectedRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (sessionToken && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up"],
};
