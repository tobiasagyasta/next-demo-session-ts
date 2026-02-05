"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginRequest, LoginResponse, UserToken } from "@/types/user";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

type LoginFormProps = {
  onSubmit: (data: LoginRequest) => Promise<LoginResponse>;
};

type FormValues = LoginRequest;

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const router = useRouter();
  const setUserToken = useAuthStore((state) => state.setUserToken);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [responseBody, setResponseBody] = useState<LoginResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleFormSubmit(values: FormValues) {
    setErrorMessage(null);
    setResponseBody(null);
    setStatus("idle");

    try {
      const data = await onSubmit(values);
      console.log(data);

      const tokenPayload: UserToken = {
        username: values.username,
        token: data.token,
        loggedInAt: new Date().toISOString(),
      };
      setResponseBody(data);
      setUserToken(tokenPayload);
      setStatus("success");
      reset();
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      const explanation = (error as AxiosError).response
        ? (error as AxiosError).response?.data
        : "Something went wrong";
      setErrorMessage(message + ": " + explanation);
      setStatus("error");
    }
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
        <div>
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            {...register("username", {
              required: "Username is required.",
            })}
            aria-invalid={Boolean(errors.username)}
            className={`mt-1 w-full rounded-md border px-3 py-2 text-sm ${
              errors.username ? "border-red-300" : "border-gray-300"
            }`}
          />
          {errors.username && (
            <p className="mt-1 text-xs text-red-600">
              {errors.username.message}
            </p>
          )}
        </div>
        <div>
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required.",
            })}
            aria-invalid={Boolean(errors.password)}
            className={`mt-1 w-full rounded-md border px-3 py-2 text-sm ${
              errors.password ? "border-red-300" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {status === "success" && responseBody && (
        <div className="mt-4 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          <p className="font-semibold">Login successful!</p>
        </div>
      )}

      {status === "error" && errorMessage && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <p className="font-semibold">Login failed.</p>
          <pre className="mt-2 whitespace-pre-wrap">{errorMessage}</pre>
        </div>
      )}
    </div>
  );
}
