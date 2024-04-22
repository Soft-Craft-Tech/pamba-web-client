"use client";
import { loginRequest } from "@/store/api/loginApi";
import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await loginRequest(username, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:gap-3">
        <input
          className="w-full h-14 rounded-md border border-borders px-2 py-1 lg:h-12"
          type="text"
          required
          name="username"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="w-full h-14 rounded-md border border-borders relative lg:h-12">
          <div className="absolute flex items-center  h-full w-max right-0 px-2 hover:text-gray-300"></div>
          <input
            className="h-full w-full px-2 py-1"
            required
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <Link
            href="/request-password-reset"
            className="text-xs font-bold text-cyan-600"
          >
            Forgot Password?
          </Link>
        </div>
        <button
          className="text-white bg-primary rounded-md py-3 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          // disabled={isLoading}
        >
          Login
        </button>
      </form>
    </div>
  );
}
