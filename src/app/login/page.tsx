"use client";

import axios from "axios";
import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";
import { LoginRequest, LoginResponse } from "@/types/user";

async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>(
    "https://fakestoreapi.com/auth/login",
    data,
  );

  return response.data;
}

export default function LoginPage() {
  return (
    <>
      <Header showBack title="Log In" />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-3 text-2xl font-bold sm:text-3xl">Welcome back</h1>
        <p className="mb-3 text-sm text-gray-600">
          Sign in to get a token from the Fake Store API.
        </p>
        <div className="mb-6 text-sm text-gray-600">
          Try with
          <p>username: johnd</p>
          <p>password: m38rmF$</p>
        </div>
        <LoginForm onSubmit={loginUser} />
      </main>
    </>
  );
}
