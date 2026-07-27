// Client Auth Manager communicating with Secure Next.js API Routes

export interface AuthSession {
  authenticated: boolean;
  username: string;
}

export async function checkServerAuth(): Promise<AuthSession | null> {
  try {
    const res = await fetch('/api/auth/check', { method: 'GET' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.authenticated ? { authenticated: true, username: data.username } : null;
  } catch (e) {
    return null;
  }
}

export async function loginWithServer(username: string, pass: string): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password: pass }),
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || 'Authentication failed' };
    }

    return { success: true };
  } catch (e) {
    return { success: false, error: 'Network error during login.' };
  }
}

export async function logoutWithServer(): Promise<void> {
  try {
    await fetch('/api/auth/logout', { method: 'POST' });
  } catch (e) {}
  window.location.href = '/login';
}
