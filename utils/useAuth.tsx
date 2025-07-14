'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

type DecodedToken = {
  isAdmin: boolean;
  exp: number;
};

export function useAdminGuard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token || token.split('.').length !== 3) {
      console.warn('No valid token found. Redirecting to login...');
      router.push('/login');
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired || !decoded.isAdmin) {
        localStorage.removeItem('token');
        router.push('/login');
      }
    } catch (err) {
      console.error('Invalid token:', err);
      localStorage.removeItem('token');
      router.push('/login');
    }
  }, [router]);
}
