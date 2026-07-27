import { NextRequest, NextResponse } from 'next/server';
import {
  hashPassword,
  verifyPassword,
  createSessionToken,
  SESSION_COOKIE_NAME,
  checkRateLimit,
  recordFailedLogin,
  resetRateLimit,
} from '@/lib/security';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';

    // Rate Limiting Check
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Too many failed attempts. Account locked for ${rateCheck.waitSeconds} seconds.`,
        },
        { status: 429 }
      );
    }

    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 });
    }

    // Configured Expected Credentials via Env or Salted SHA-256 Hash
    const expectedUser = (process.env.TRAINING_AUTH_USERNAME || 'operator').trim().toLowerCase();
    
    // Hash of default password "printmaster2026" or custom password from env
    const configuredPassword = process.env.TRAINING_AUTH_PASSWORD || 'printmaster2026';
    const configuredHash = process.env.TRAINING_AUTH_HASH || (await hashPassword(configuredPassword));

    const inputUser = username.trim().toLowerCase();

    // Verify username match
    const userMatch = inputUser === expectedUser;

    // Verify password hash
    const passwordMatch = await verifyPassword(password, configuredHash);

    if (!userMatch || !passwordMatch) {
      recordFailedLogin(ip);
      return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
    }

    // Login Success: Reset rate limit & Create Session Token
    resetRateLimit(ip);
    const token = await createSessionToken(inputUser);

    const response = NextResponse.json({ success: true, username: inputUser });

    // Set Secure HTTP-Only Cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 Days
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: 'Server authentication error.' }, { status: 500 });
  }
}
