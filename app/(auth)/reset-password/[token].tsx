'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { token } = useParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`/auth/reset-password/${token}`, { password });
      toast.success('Password reset successful');
      router.push('/login');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || 'Reset failed');
      } else {
        toast.error('An unexpected error occurred');
      }
      
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-xl font-bold text-center">Reset Password</h2>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Reset Password
        </button>
      </form>
    </main>
  );
}
