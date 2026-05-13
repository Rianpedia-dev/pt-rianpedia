import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Tentukan rute mana yang dilindungi (Admin Only)
  const isAdminRoute = pathname.startsWith('/admin');
  
  if (isAdminRoute) {
    // Kita cek session via better-auth cookie
    // Secara teknis kita bisa memanggil API getSession di server, 
    // tapi di middleware Next.js lebih efisien mengecek cookie session-token.
    const sessionToken = request.cookies.get('better-auth.session_token') || 
                         request.cookies.get('__secure-next-auth.session-token');

    if (!sessionToken) {
      // Belum login, arahkan ke login
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('callbackUrl', encodeURI(pathname));
      return NextResponse.redirect(url);
    }

    // Untuk pengecekan Role Admin secara mendalam (Server-side validation)
    // Kita bisa fetch session data dari API atau membiarkan halaman AdminLayoutClient yang memverifikasi.
    // Demi UX, kita izinkan masuk dulu, nanti di AdminLayoutClient akan divalidasi 'role' nya.
  }

  // Sebaliknya, jika sudah login dan mencoba ke halaman login/register
  if (pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register')) {
    const sessionToken = request.cookies.get('better-auth.session_token');
    if (sessionToken) {
       return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
