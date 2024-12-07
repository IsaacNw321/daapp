import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0/edge';
import { getUserById } from '@/utils/users';
import { UserRole } from '@/app/types';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getSession(req, res);

  if (!session || !session.user) {
    console.log('No session or user found');
    return NextResponse.redirect(new URL('/', req.url));
  }

  const { user } = session;
  console.log('User from session:', user);

  if (!user.sub) {
    console.log('User sub is missing');
    return NextResponse.redirect(new URL('/', req.url));
  }

  const userId = user.sub.split('|')[1];
  if (!userId) {
    console.log('User ID is missing');
    return NextResponse.redirect(new URL('/', req.url));
  }
  console.log(userId)
  const dbUser = await getUserById(userId);
  console.log('User from database:', dbUser);

  if (dbUser?.userRole !== UserRole.ADMIN) {
    console.log('User is not an admin');
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
}

export const config = {
  matcher: '/admin/:path*',
};