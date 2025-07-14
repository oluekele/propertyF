'use client';

import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Image from "next/image";
import Link from "next/link";
import React from "react";


const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/auth/forgot-password', { email });
      toast.success('Reset link sent (only for admins)');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || 'Failed to send reset link');
      } else {
        toast.error('An unexpected error occurred');
      }
      
    }
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#110C15]">
      <div className="flex w-full max-w-6xl  overflow-hidden gap-10 items-center justify-center">
        {/* Left side - Login */}
        <div className="w-full md:w-1/2 p-8 bg-white shadow-lg rounded-xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="mb-6">
              
              <Image src={'/logo.png'} width={100} height={100} alt="login" className="w-full rounded-lg"/>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-center">
              Welcome Back to Product Guardian!
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Enter your details to access your account.
            </p>
          </div>

          <form onSubmit={handleForgot} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email or Phone Number
              </label>
              <input
                id="email"
                type="email"
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-indigo-500"
                placeholder="your.email@example.com"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white rounded py-2 cursor-pointer  hover:bg-indigo-700 transition"
            >
              Submit
            </button>
            <p className="text-center text-sm text-gray-600">
              Don&apos;t have an account?
              <Link href="/signup" className="text-indigo-600 hover:underline ml-2">
                Sign up now
              </Link>
            </p>
          </form>
        </div>

      </div>
    </main>
  );
};

export default ForgotPassword;
