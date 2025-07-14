'use client';

import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SignPage = () => {
   const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      toast.success('Account created!');
      router.push('/login');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || 'Signup failed');
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

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label
                htmlFor="name" 
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name} onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-indigo-500"
                placeholder="Enter your full bname"
              />
            </div>
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
              <input type='checkbox' className='border border-gray-500'/>
              <p className='flex items-center gap-2 text-gray-400 '>
                <span>
                  I agree to the
                </span>
                <span className='text-pink-500'>
                  Trems of service
                </span>
                <span>
                  and
                </span>
                <span className='text-pink-500'>
                  Privacy Policy
                </span>
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white rounded py-2 cursor-pointer  hover:bg-indigo-700 transition"
            >
              Sign Up
            </button>
            <p className="text-center text-sm text-gray-600">
              Already have an account?
              <Link href="/login" className="text-indigo-600 hover:underline ml-2">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignPage
