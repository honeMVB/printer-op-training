'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { checkServerAuth } from '@/lib/auth';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/login') {
      // eslint-disable-next-line
      setAuthorized(true);
      return;
    }

    async function verify() {
      const session = await checkServerAuth();
      if (!session || !session.authenticated) {
        setAuthorized(false);
        router.push('/login');
      } else {
        setAuthorized(true);
      }
    }

    verify();
  }, [pathname, router]);

  if (authorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-stone-900 dark:border-stone-100 border-t-transparent dark:border-t-transparent rounded-full animate-spin"></div>
          <p className="text-stone-600 dark:text-stone-400 text-sm font-medium">Verifying HTTP-Only Session Cookie...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
