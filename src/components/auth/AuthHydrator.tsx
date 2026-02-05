"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";

export default function AuthHydrator() {
  useEffect(() => {
    useAuthStore.getState().hydrateFromStorage();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === "userToken") {
        useAuthStore.getState().hydrateFromStorage();
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return null;
}
