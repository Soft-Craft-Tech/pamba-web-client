"use client";
import Link from "next/link";

export default function LoginForm() {
  return (
    <div className="relative">
      <form className="flex flex-col gap-4 lg:gap-3">
        <input
          className="w-full h-14 rounded-md border border-borders px-2 py-1 lg:h-12"
          type="email"
          required
          name="email"
          placeholder="Email"
        />
        <div className="w-full h-14 rounded-md border border-borders relative lg:h-12">
          <div className="absolute flex items-center  h-full w-max right-0 px-2 hover:text-gray-300"></div>
          <input
            className="h-full w-full px-2 py-1"
            required
            name="password"
            placeholder="Password"
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
        >
          Loading
        </button>
      </form>
    </div>
  );
}
