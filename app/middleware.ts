import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import getCurrentUser from './actions/getCurrentUser

const protectedRoutes = ["/admin"];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log('the pathname is: ', pathname)
  // Skip middleware for routes that are not in protectedRoutes
  if (!protectedRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const currentUser = await getCurrentUser();

  // Redirect if the user is not an admin
  if (!currentUser?.isAdmin || !currentUser) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // Continue with the request if not redirected
  return NextResponse.next();
}
