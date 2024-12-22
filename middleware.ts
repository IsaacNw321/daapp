import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0/edge';
import { User, UserRole } from '@/app/types';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getSession(req, res);

  if (!session || !session.user) {
    console.log('No session or user found');
    return NextResponse.redirect(new URL('/', req.url));
  }

  const { user } = session;

  if (!user.sub) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const userId = user.sub.split('|')[1];
  if (!userId) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const baseUrl = req.nextUrl.origin;
  try {
    const response = await fetch(`${baseUrl}/api/users/${userId}`);
    if (!response.ok) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    const dbUser: User = await response.json();

    if (dbUser?.userRole !== UserRole.ADMIN) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
}

export const config = {
  matcher: '/admin/:path*',
};