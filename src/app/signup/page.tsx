"use client";

import SignupForm from "@/components/SignupForm";
import { SignupRequest, SignupResponse } from "@/types/user";
import Header from "@/components/Header";
import axios from "axios";

async function createUser(data: SignupRequest): Promise<SignupResponse> {
  const response = await axios.post<SignupResponse>(
    "https://fakestoreapi.com/users",
    data,
  );

  return response.data;
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
          This demo posts data to the Fake Store API
        </p>
        <SignupForm onSubmit={createUser} />
      </main>
    </>
  );
}
