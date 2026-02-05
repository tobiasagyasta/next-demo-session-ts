"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { UserToken } from "@/types/user";
import { useAuthStore } from "@/store/auth.store";
import { useCartStore } from "@/store/cart.store";
import { CartDialog } from "./CartDialog";

type HeaderProps = {
  title: string;
  showBack?: boolean;
  showSignUp?: boolean;
  showLogIn?: boolean;
  backHref?: string;
  showAbout?: boolean;
};

export default function Header({
  title,
  showBack = false,
  showSignUp = false,
  showLogIn = false,
  backHref = "/",
  showAbout = false,
}: HeaderProps) {
  const [username, setUsername] = useState<string | null>(null);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const clearUserToken = useAuthStore((state) => state.clearUserToken);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (!isLoggedIn) {
      setUsername(null);
      return;
    }

    try {
      const storedToken = localStorage.getItem("userToken");
      if (!storedToken) {
        setUsername(null);
        return;
      }

      const parsedToken = JSON.parse(storedToken) as Partial<UserToken>;
      setUsername(
        typeof parsedToken?.username === "string" ? parsedToken.username : null
      );
    } catch {
      setUsername(null);
    }
  }, [isLoggedIn]);

  function handleLogout() {
    clearUserToken();
    clearCart();
  }

  const showAuthButtons = !isLoggedIn;

  return (
    <header className="mb-6 border-b-2">
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-4">
        <div className="flex flex-wrap items-center gap-2">
          {showBack && backHref && (
            <Link
              href={backHref}
              className="rounded-md border border-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Back
            </Link>
          )}
          {showSignUp && showAuthButtons && (
            <Link
              href="/signup"
              className="rounded-md border border-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Sign Up
            </Link>
          )}
          {showLogIn && showAuthButtons && (
            <Link
              href="/login"
              className="rounded-md border border-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Log In
            </Link>
          )}
        </div>

        <h1 className="text-center text-2xl font-bold sm:text-3xl">
          {title}
        </h1>

        <div className="flex flex-wrap items-center justify-end gap-2">
          {showAbout && (
            <Link
              href="/about"
              className="rounded-md border border-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              About
            </Link>
          )}
          {isLoggedIn && <CartDialog />}
          {isLoggedIn && (
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-700">
                Hi{username ? `, ${username}` : ""}!
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md border border-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
