import { NextResponse } from 'next/server';

export function middleware(request: any) {
    const authToken = request.cookies.get('social-dance-token')

    if (!authToken) {
        return NextResponse.redirect(new URL('/', request.url)); // Redirect to root
    }

    return NextResponse.next(); // Allow request to proceed
}

// Apply middleware only to protected routes
export const config = {
    matcher: ['/events-list', '/events-list/new', '/events-list/:slug'], // Protect these routes
};
