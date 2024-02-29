"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const login = () => {
  const router = useRouter();
  const { status } = useSession();

  if (status == "authenticated") {
    router.push("/");
  }
  return (
    <div className="grid place-content-center h-screen bg-slate-100">
      <div className="flex flex-col justify-center gap-5 items-center h-[50vh] w-[400px] bg-white shadow-md">
        <img src="/logo.png" className="h-10 w-auto" alt="" />
        <p className="text-md font-bold">Log in to continue</p>
        <div
          className="py-1 px-6 rounded cursor-pointer flex justify-center items-center gap-2 bg-white border-[1px] border-gray-200 font-medium w-5/6"
          onClick={() => signIn("google")}
        >
          <img
            className="h-10"
            src="https://pbs.twimg.com/profile_images/1605297940242669568/q8-vPggS_400x400.jpg"
            alt=""
          />
          <span>Sign in with Google</span>
        </div>
        <Link
          href="/"
          className="text-center text-xs text-blue-800 cursor-pointer underline"
        >
          Go to home page
        </Link>
      </div>
      <img
        src="/login_1.svg"
        className="hidden lg:block absolute bottom-0 left-0 w-[25%]"
        alt=""
      />
      <img
        src="/login_2.svg"
        className="hidden lg:block absolute bottom-0 right-0 w-[25%]"
        alt=""
      />
    </div>
  );
};

export default login;
