'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import axiosWithAuth from '@/lib/axios';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axiosWithAuth().post('/auth/login', { email, password });
      const { token, user } = data;
      localStorage.setItem('token', token);
      toast.success('Login successful!');
      router.push(user.isAdmin ? '/admin/properties' : '/');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || 'Login failed');
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <div className='w-full flex h-screen items-center justify-between bg-[#110C15]'>
          
          <div className='w-full md:w-1/2 flex items-center justify-center mx-auto '>
            <div className='w-4/5 border border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center bg-white'>
              <div className="flex flex-col items-center">
                <div className="mb-6">
                  
                  <Image src={'/logo.png'} width={100} height={100} alt="login" className="w-full rounded-lg"/>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-center">
                  Create Your Account
                </h2>
                <p className="text-gray-600 text-center mb-6">
                  Joint Product Guardian to protect yourself from counterfeit products.
                </p>
              </div>
    
              <form onSubmit={handleSubmit} className="space-y-4">
                
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
                    placeholder="Enter your email or phone number"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-indigo-500"
                    placeholder="Create a strong password"
                  />
                </div>
                <div className='flex items-center w-full gap-2'>
                  
                  <Link href="/signup" className="text-indigo-600 hover:underline ml-2">
                    Forgot password
                  </Link>
                
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white rounded py-2 cursor-pointer  hover:bg-indigo-700 transition"
                >
                  Login
                </button>
                <p className="text-center text-sm text-gray-600">
                  Already have an account?
                  <Link href="/signup" className="text-indigo-600 hover:underline ml-2">
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
  );
};

export default LoginPage;
