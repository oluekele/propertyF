"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import axiosWithAuth from "@/lib/axios";
import { useAuthStore } from "@/utils/authStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[loading, setLoading] = useState(false)
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  // ✅ Auto-fill Zustand if refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken && savedUser) {
      login(savedToken, JSON.parse(savedUser));
    }
  }, [login]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    try {
      const { data } = await axiosWithAuth().post("/auth/login", { email, password });
      const { token, user } = data;

      login(token, user);

      toast.success("Login successful!");
      router.push(user.isAdmin ? "/admin/properties" : "/");
      setLoading(false)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Login failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="w-full flex h-screen items-center justify-center bg-[#110C15]">
      <div className="w-full md:w-1/2 flex items-center justify-center mx-auto">
        <div className="w-4/5 border border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center bg-white">
          <Image src="/logo.png" width={100} height={100} alt="login" className="mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
            <button
              type="submit"
              className={`${loading ? "bg-[#8e06c4]" : "bg-indigo-600 hover:bg-indigo-700"} w-full  text-white rounded py-2  transition`}
            >{loading ? "Processing" :"Login"}
              
            </button>
            <p className="text-center text-sm text-gray-600">
              Don’t have an account?
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
