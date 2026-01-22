"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { UserToken } from "@/types/user";

type HeaderProps = {
  title: string;
  showBack?: boolean;
  showSignUp?: boolean;
  showLogIn?: boolean;
};

export default function Header({
  title,
  showBack = false,
  showSignUp = false,
  showLogIn = false,
}: HeaderProps) {
  const [userToken, setUserToken] = useState<UserToken | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (!storedToken) {
      setUserToken(null);
      return;
    }

    try {
      const parsedToken = JSON.parse(storedToken) as UserToken;
      if (parsedToken?.token) {
        setUserToken(parsedToken);
      } else {
        setUserToken(null);
      }
    } catch {
      setUserToken(null);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("userToken");
    setUserToken(null);
  }

  const showAuthButtons = !userToken?.token;

  return (
    <header className="mb-6 flex items-center gap-4 py-4 border-b-2">
      {showBack && (
        <Link
          href="/"
          className="rounded-md border font-bold border-gray-200 px-3 py-1 ml-5 text-sm text-gray-700 hover:bg-gray-50"
        >
          Back
        </Link>
      )}{" "}
      {showSignUp && showAuthButtons && (
        <Link
          href="/signup"
          className="rounded-md border font-bold border-gray-200 px-3 py-1 ml-5 text-sm text-gray-700 hover:bg-gray-50"
        >
          Sign Up
        </Link>
      )}
      {showLogIn && showAuthButtons && (
        <Link
          href="/login"
          className="rounded-md border font-bold border-gray-200 px-3 py-1 ml-5 text-sm text-gray-700 hover:bg-gray-50"
        >
          Log In
        </Link>
      )}
      <h1 className="text-2xl text-center mx-auto font-bold sm:text-3xl">
        {title}
      </h1>
      {userToken?.token && (
        <div className="ml-auto flex items-center gap-3 pr-4 text-sm">
          <span className="text-gray-700">Hi, {userToken.username}!</span>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md border font-bold border-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
          >
            Log Out
          </button>
        </div>
      )}
    </header>
  );
}
