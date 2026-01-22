"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignupRequest, SignupResponse } from "@/types/user";
import { useRouter } from "next/navigation";

type SignupFormProps = {
  onSubmit: (data: SignupRequest) => Promise<SignupResponse>;
};

type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignupForm({ onSubmit }: SignupFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [responseBody, setResponseBody] = useState<SignupResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const passwordValue = watch("password");
  const validationMessages = Object.values(errors)
    .map((error) => error?.message)
    .filter((message): message is string => Boolean(message));
  const router = useRouter();

  async function handleFormSubmit(values: FormValues) {
    setErrorMessage(null);
    setResponseBody(null);
    setStatus("idle");
    try {
      const data = await onSubmit({
        id: 0,
        username: values.username,
        email: values.email,
        password: values.password,
      });
      setResponseBody(data);
      setStatus("success");
      reset();
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      setErrorMessage(message);
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
          <label className="text-sm font-medium text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address.",
              },
            })}
            aria-invalid={Boolean(errors.email)}
            className={`mt-1 w-full rounded-md border px-3 py-2 text-sm ${
              errors.email ? "border-red-300" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
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
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters.",
              },
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
        <div>
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password.",
              validate: (value) =>
                value === passwordValue || "Passwords do not match.",
            })}
            aria-invalid={Boolean(errors.confirmPassword)}
            className={`mt-1 w-full rounded-md border px-3 py-2 text-sm ${
              errors.confirmPassword ? "border-red-300" : "border-gray-300"
            }`}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Create Account"}
        </button>
      </form>

      {validationMessages.length > 0 && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <p className="font-semibold">Please fix the following:</p>
          <ul className="mt-2 list-disc pl-5">
            {validationMessages.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      {status === "success" && responseBody && (
        <div className="mt-4 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          <p className="font-semibold">Signup successful!</p>
        </div>
      )}

      {status === "error" && errorMessage && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <p className="font-semibold">Signup failed.</p>
          <pre className="mt-2 whitespace-pre-wrap">{errorMessage}</pre>
        </div>
      )}
    </div>
  );
}
