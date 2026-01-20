import { useState, type FormEvent } from "react";
import { SignupRequest, SignupResponse } from "@/types/user";

type SignupFormProps = {
  onSubmit: (data: SignupRequest) => Promise<SignupResponse>;
};

type FormValues = {
  username: string;
  email: string;
  password: string;
};

export default function SignupForm({ onSubmit }: SignupFormProps) {
  const [values, setValues] = useState<FormValues>({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [responseBody, setResponseBody] = useState<SignupResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function validate(formValues: FormValues) {
    const nextErrors: string[] = [];

    if (!formValues.username.trim()) {
      nextErrors.push("Username is required.");
    }
    if (!formValues.email.trim()) {
      nextErrors.push("Email is required.");
    } else if (!formValues.email.includes("@")) {
      nextErrors.push("Email must include an @ symbol.");
    }
    if (!formValues.password.trim()) {
      nextErrors.push("Password is required.");
    } else if (formValues.password.length < 6) {
      nextErrors.push("Password must be at least 6 characters.");
    }

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors([]);
    setErrorMessage(null);
    setResponseBody(null);

    const validationErrors = validate(values);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const data = await onSubmit({ id: 0, ...values });
      setResponseBody(data);
      setStatus("success");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      setErrorMessage(message);
      setStatus("error");
    }
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-medium text-gray-700" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={values.username}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                username: event.target.value,
              }))
            }
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                email: event.target.value,
              }))
            }
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={values.password}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                password: event.target.value,
              }))
            }
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Submitting..." : "Create Account"}
        </button>
      </form>

      {errors.length > 0 && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <p className="font-semibold">Please fix the following:</p>
          <ul className="mt-2 list-disc pl-5">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {status === "success" && responseBody && (
        <div className="mt-4 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          <p className="font-semibold">Signup successful!</p>
          <pre className="mt-2 whitespace-pre-wrap">
            {JSON.stringify(responseBody, null, 2)}
          </pre>
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
