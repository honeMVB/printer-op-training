#!/usr/bin/env node

/**
 * Local CLI Utility to generate a salted SHA-256 password hash
 * for Vercel Environment Variables.
 *
 * Usage:
 *   node scripts/generate-hash.js "YourSecretPassword123"
 */

const crypto = require('crypto');

const password = process.argv[2];

if (!password) {
  console.log('\n❌ Usage: node scripts/generate-hash.js "<password>"\n');
  process.exit(1);
}

const SALT = process.env.TRAINING_AUTH_SALT || 'printer_op_salt_2026_secure_key';

const hash = crypto.createHash('sha256').update(password + SALT).digest('hex');

console.log('\n==================================================');
console.log('🔒 SECURE VERCEL ENVIRONMENT VARIABLE SETUP');
console.log('==================================================');
console.log(`Password Input : ${password}`);
console.log(`Salt Applied   : ${SALT}`);
console.log(`SHA-256 Hash   : ${hash}`);
console.log('--------------------------------------------------');
console.log('Set this in Vercel Project Settings > Environment Variables:');
console.log(`\nTRAINING_AUTH_HASH=${hash}\n`);
console.log('==================================================\n');
