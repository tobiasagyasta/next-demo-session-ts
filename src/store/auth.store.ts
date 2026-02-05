"use client";

import { create } from "zustand";
import type { UserToken } from "@/types/user";

type AuthState = {
  token: string | null;
  isLoggedIn: boolean;
  isHydrated: boolean;
  readTokenFromStorage: () => string | null;
  hydrateFromStorage: () => void;
  setUserToken: (userToken: UserToken) => void;
  clearUserToken: () => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  isLoggedIn: false,
  isHydrated: false,
  readTokenFromStorage: () => {
    try {
      const stored = localStorage.getItem("userToken");
      if (!stored) return null;
      const parsed = JSON.parse(stored) as Partial<UserToken>;
      return typeof parsed?.token === "string" ? parsed.token : null;
    } catch {
      return null;
    }
  },
  hydrateFromStorage: () => {
    const token = get().readTokenFromStorage();
    set({ token, isLoggedIn: Boolean(token), isHydrated: true });
  },
  setUserToken: (userToken) => {
    try {
      localStorage.setItem("userToken", JSON.stringify(userToken));
    } catch {}
    set({ token: userToken.token, isLoggedIn: Boolean(userToken.token) });
  },
  clearUserToken: () => {
    try {
      localStorage.removeItem("userToken");
    } catch {}
    set({ token: null, isLoggedIn: false });
  },
}));
