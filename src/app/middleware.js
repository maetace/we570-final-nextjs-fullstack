import { NextResponse } from 'next/server';

export const config = {
    matcher: ['/news/:path*', '/api/:path*', '/admin/:path*'],
};

export function middleware(request) {
    const { pathname } = request.nextUrl;
    const authCookie = request.cookies.get('auth');

    if (pathname.startsWith('/api/news') && request.method === 'DELETE') {
        const isAdmin = request.headers.get('x-admin') === 'true';
        if (!isAdmin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
    }

    if (!pathname.startsWith('/admin/auth') && pathname.startsWith('/admin') && !authCookie) {
        const loginUrl = new URL('/admin/auth', request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}