import { cookies } from 'next/headers';

// Environment Variable Configurations with Secure Fallbacks
export const SESSION_COOKIE_NAME = 'printer_op_secure_session';

// Salt for password hashing (can be configured via env)
const SALT = process.env.TRAINING_AUTH_SALT || 'printer_op_salt_2026_secure_key';
const JWT_SECRET = process.env.JWT_SECRET || process.env.TRAINING_SESSION_SECRET || 'secure_jwt_session_secret_printer_op_2026';

/**
 * Modern Salted SHA-256 Password Hash Generator (Web Crypto API)
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + SALT);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Constant-time hash verification to prevent timing attacks
 */
export async function verifyPassword(password: string, expectedHash: string): Promise<boolean> {
  const computedHash = await hashPassword(password);
  if (computedHash.length !== expectedHash.length) return false;

  let result = 0;
  for (let i = 0; i < computedHash.length; i++) {
    result |= computedHash.charCodeAt(i) ^ expectedHash.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Create a signed session token containing username and timestamp
 */
export async function createSessionToken(username: string): Promise<string> {
  const payload = {
    username: username.toLowerCase().trim(),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days expiration
  };
  const payloadStr = JSON.stringify(payload);
  const base64Payload = Buffer.from(payloadStr).toString('base64url');

  // Generate HMAC signature
  const signature = await generateSignature(base64Payload);
  return `${base64Payload}.${signature}`;
}

/**
 * Verify session token and return payload if valid
 */
export async function verifySessionToken(token: string): Promise<{ username: string } | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const [base64Payload, signature] = parts;
    const expectedSignature = await generateSignature(base64Payload);

    if (signature !== expectedSignature) return null;

    const payloadStr = Buffer.from(base64Payload, 'base64url').toString('utf8');
    const payload = JSON.parse(payloadStr);

    if (Date.now() > payload.exp) return null;

    return { username: payload.username };
  } catch (e) {
    return null;
  }
}

async function generateSignature(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyBuffer = encoder.encode(JWT_SECRET);
  const dataBuffer = encoder.encode(data);

  const key = await crypto.subtle.importKey(
    'raw',
    keyBuffer,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signatureBuffer = await crypto.subtle.sign('HMAC', key, dataBuffer);
  return Buffer.from(signatureBuffer).toString('base64url');
}

// In-Memory Rate Limiting for Login Protection
const loginAttempts = new Map<string, { count: number; lockUntil: number }>();

export function checkRateLimit(ip: string): { allowed: boolean; waitSeconds?: number } {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (record && record.lockUntil > now) {
    const waitSeconds = Math.ceil((record.lockUntil - now) / 1000);
    return { allowed: false, waitSeconds };
  }

  return { allowed: true };
}

export function recordFailedLogin(ip: string): void {
  const now = Date.now();
  const record = loginAttempts.get(ip) || { count: 0, lockUntil: 0 };
  record.count += 1;

  if (record.count >= 5) {
    record.lockUntil = now + 60 * 1000; // 60 seconds lockout
    record.count = 0;
  }

  loginAttempts.set(ip, record);
}

export function resetRateLimit(ip: string): void {
  loginAttempts.delete(ip);
}
