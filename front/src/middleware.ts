import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rutas que requieren autenticación
  const protectedRoutes = ["/dashboard", "/cart"];

  // Si intentan ingresar a una ruta protegida y no hay token en cookies (si usaras cookies)
  const token = request.cookies.get("userToken")?.value;

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    // Si manejas cookies en el futuro, redirige desde el servidor aquí:
    if (!token && request.cookies.has("userToken")) {
      const loginUrl = new URL("/auth/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Especifica en qué rutas se ejecutará el middleware
export const config = {
  matcher: ["/dashboard/:path*", "/cart/:path*"],
};