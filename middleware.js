import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import getJWTSecret from './app/utils/getJWTSecret';

export async function middleware(request) {
    const token = request.cookies.get("token")?.value;

    if (request.nextUrl.pathname.startsWith('/user')) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        // Verify the token
        try {
            const {payload} = await jwtVerify(token, new TextEncoder().encode(getJWTSecret()));
        } 
        catch (error) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
}