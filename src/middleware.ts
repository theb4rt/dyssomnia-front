// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { validate } from './helpers/validateJwt';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const {
        cookies,
        url,
    } = request;

    const token = cookies.get('auth-token');
    if (token === undefined || token === null) {
        return NextResponse.redirect(new URL('/login', url));
    }

    const payload = await validate(token);

    if (payload === null || payload === undefined) {
        return NextResponse.redirect(new URL('/login', url));
    }

    if (url === String(new URL('/', url))) {
        return NextResponse.redirect(new URL('/dashboard', url));
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
// export const config = {
//     matcher: ["/", "/dashboard/:path*"],
// };
// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/', '/dashboard/:path*'],
    //matcher: ["/dashboard/:path*"]
};
