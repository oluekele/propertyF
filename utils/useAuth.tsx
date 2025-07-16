// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { jwtDecode } from 'jwt-decode';


// type DecodedToken = {
//   isAdmin: boolean;
//   exp: number;
// };

// export function useAdminGuard() {
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
    

//     if (!token || token.split('.').length !== 3) {
//       console.warn('No valid token found. Redirecting to login...');
//       router.push('/login');
//       return;
//     }

//     try {
//       const decoded: DecodedToken = jwtDecode(token);
//       const isExpired = decoded.exp * 1000 < Date.now();

//       if (isExpired || !decoded.isAdmin) {
//         localStorage.removeItem('token');
//         router.push('/login');
//       }
//     } catch (err) {
//       console.error('Invalid token:', err);
//       localStorage.removeItem('token');
//       router.push('/login');
//     }
//   }, [router]);
// }


"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {jwtDecode} from "jwt-decode";
import { useAuthStore } from "@/utils/authStore";

type DecodedToken = {
  isAdmin: boolean;
  exp: number;
};

export function useAdminGuard() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || token.split(".").length !== 3) {
      router.push("/login");
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired || !decoded.isAdmin) {
        logout(); // clear Zustand + localStorage
        router.push("/login");
      }
    } catch (err) {
      console.error("Invalid token:", err);
      logout();
      router.push("/login");
    }
  }, [router, logout]);
}
