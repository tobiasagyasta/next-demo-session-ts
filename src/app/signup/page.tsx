"use client";

import SignupForm from "@/components/SignupForm";
import { SignupRequest, SignupResponse } from "@/types/user";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

async function createUser(data: SignupRequest): Promise<SignupResponse> {
  const response = await fetch("https://fakestoreapi.com/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  //   if(response.ok){
  //     router.push("/")
  //   }
  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
}

export default function SignupPage() {
  return (
    <>
      <Header showBack title="Sign Up" />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-3 text-2xl font-bold sm:text-3xl">
          Create an account
        </h1>
        <p className="mb-6 text-sm text-gray-600">
          This demo posts data to the Fake Store API and shows the response
          body.
        </p>
        <SignupForm onSubmit={createUser} />
      </main>
    </>
  );
}
