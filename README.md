# Commercial Printer & CNC Digital Finishing Operator Training Web App

An interactive, production-ready **Next.js 14** web application designed to train operators from ground-up foundations to industry mastery in Commercial Wide-Format Printing and CNC Digital Finishing.

---

## 🔒 Production Security Architecture

- **Protected HTTP-Only Session Gate**:
  - Server-side Next.js Middleware (`src/middleware.ts`) protects all application routes (`/`, `/modules/*`, `/simulators`, `/reference`, `/certificate`).
  - Issues HTTP-only, Secure, SameSite `Lax` cookies with signed HMAC tokens.
  - Salted SHA-256 password verification executed via Web Crypto API with constant-time comparison.
  - Server-side rate limiting locks out login attempts for 60 seconds after 5 consecutive failed attempts.

- **Vercel Environment Variable Setup**:
  - `TRAINING_AUTH_USERNAME` = `your_chosen_username`
  - `TRAINING_AUTH_PASSWORD` = `your_chosen_password`
  - `TRAINING_AUTH_HASH` = `optional_salted_sha256_hash`
  - `JWT_SECRET` = `your_random_jwt_secret_key`

---

## 🛠️ Generating a Password Hash Offline (Local CLI)

To generate a salted SHA-256 hash for Vercel without exposing tools on the public web, run the local CLI script:

```bash
node scripts/generate-hash.js "YourSecretPassword123"
```

**Output**:
```
==================================================
🔒 SECURE VERCEL ENVIRONMENT VARIABLE SETUP
==================================================
Password Input : YourSecretPassword123
SHA-256 Hash   : e8f9...
--------------------------------------------------
Set this in Vercel Project Settings > Environment Variables:

TRAINING_AUTH_HASH=e8f9...
==================================================
```

---

## 🚀 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Dev Server
```bash
npm run dev -- -p 3005
```
Open [http://localhost:3005](http://localhost:3005) in your browser.

---

## 🌐 Deploying to Vercel

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Printer Operator Training Web App"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/printer-op-training.git
   git push -u origin main
   ```
2. Import the repository on **[Vercel](https://vercel.com)**.
3. In **Environment Variables**, set:
   - `TRAINING_AUTH_USERNAME` = `operator`
   - `TRAINING_AUTH_PASSWORD` = `printmaster2026`
   - `JWT_SECRET` = `random_secure_key_here`
4. Deploy! Your app is live with production HTTP-Only session security.
