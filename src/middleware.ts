import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// Initialize a lightweight instance just for middleware
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");

  // Redirect unauthenticated users trying to access dashboard
  if (isDashboard && !isLoggedIn) {
    return Response.redirect(new URL("/", req.nextUrl));
  }
});

// Configure which routes the middleware should run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};