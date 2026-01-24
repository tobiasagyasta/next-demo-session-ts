"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AlertCircle, ShieldCheck } from "lucide-react";
import type { CheckoutFormValues, PlaceOrderPayload } from "@/types/checkout";
import { formatCurrency } from "@/lib/helpers";

type CheckoutFormProps = {
  productId: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};

export default function CheckoutForm({
  productId,
  quantity,
  unitPrice,
  subtotal,
  shipping,
  tax,
  total,
}: CheckoutFormProps) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "store">(
    "delivery",
  );
  const [cardType, setCardType] = useState<
    "visa" | "mastercard" | "amex" | "discover"
  >("visa");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CheckoutFormValues>({
    defaultValues: {
      fullName: "",
      addressLine1: "",
      city: "",
      stateProvince: "",
      zipPostal: "",
      country: "",
      email: "",
      cardholderName: "",
      cardNumber: "",
      expirationDate: "",
      cvc: "",
    },
  });

  async function onSubmit(values: CheckoutFormValues) {
    setSubmitError(null);

    const payload: PlaceOrderPayload = {
      ...values,
      productId,
      quantity,
      unitPrice,
      subtotal,
      shipping,
      tax,
      total,
    };

    reset();
    router.push(`/checkout/${productId}/success?qty=${quantity}`);
  }

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Checkout Details</h2>
      <p className="mt-1 text-sm text-gray-500">
        Complete your details to place the order.
      </p>

      <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-3 rounded-md border border-gray-200 bg-gray-50 p-4">
          <h3 className="text-base font-semibold">Delivery Method</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setDeliveryMethod("delivery")}
              className={`rounded-md border px-3 py-2 text-left text-sm cursor-pointer ${
                deliveryMethod === "delivery"
                  ? "border-gray-900 bg-white"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-700">Delivery</p>
                {deliveryMethod === "delivery" && (
                  <span className="rounded-full bg-gray-900 px-2 py-0.5 text-[11px] font-semibold text-white">
                    Selected
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Arrives in 3-5 business days
              </p>
            </button>
            <button
              type="button"
              onClick={() => setDeliveryMethod("store")}
              className={`rounded-md border px-3 py-2 text-left text-sm cursor-pointer ${
                deliveryMethod === "store"
                  ? "border-gray-900 bg-white"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-700">Store pickup</p>
                {deliveryMethod === "store" && (
                  <span className="rounded-full bg-gray-900 px-2 py-0.5 text-[11px] font-semibold text-white">
                    Selected
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500">Ready in 1-2 hours</p>
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Shipping Address</h3>
            <span className="text-xs text-gray-500">All fields required</span>
          </div>
          <div>
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="fullName"
            >
              Full name
            </label>
            <input
              id="fullName"
              type="text"
              {...register("fullName", { required: "Full name is required." })}
              aria-invalid={Boolean(errors.fullName)}
              className={`mt-1 w-full rounded-md border px-3 py-2 text-sm ${
                errors.fullName ? "border-red-300" : "border-gray-300"
              }`}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-600">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="addressLine1"
            >
              Address line
            </label>
            <input
              id="addressLine1"
              type="text"
              {...register("addressLine1", {
                required: "Address line is required.",
              })}
              aria-invalid={Boolean(errors.addressLine1)}
              className={`mt-1 w-full rounded-md border px-3 py-2 text-sm ${
                errors.addressLine1 ? "border-red-300" : "border-gray-300"
              }`}
            />
            {errors.addressLine1 && (
              <p className="mt-1 text-xs text-red-600">
                {errors.addressLine1.message}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="city"
              >
                City
              </label>
              <input
                id="city"
                type="text"
                {...register("city", { required: "City is required." })}
                aria-invalid={Boolean(errors.city)}
                className={`mt-1 w-full rounded-md border px-3 py-2 text-sm ${
                  errors.city ? "border-red-300" : "border-gray-300"
                }`}
              />
              {errors.city && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div>
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="stateProvince"
              >
                State / Province
              </label>
              <input
                id="stateProvince"
                type="text"
                {...register("stateProvince", {
                  required: "State or province is required.",
                })}
                aria-invalid={Boolean(errors.stateProvince)}
                className={`mt-1 w-full rounded-md border px-3 py-2 text-sm ${
                  errors.stateProvince ? "border-red-300" : "border-gray-300"
                }`}
              />
              {errors.stateProvince && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.stateProvince.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="zipPostal"
              >
                ZIP / Postal code
              </label>
              <input
                id="zipPostal"
                type="text"
                {...register("zipPostal", {
                  required: "ZIP or postal code is required.",
                })}
                aria-invalid={Boolean(errors.zipPostal)}
                className={`mt-1 w-full rounded-md border px-3 py-2 text-sm ${
                  errors.zipPostal ? "border-red-300" : "border-gray-300"
                }`}
              />
              {errors.zipPostal && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.zipPostal.message}
                </p>
              )}
            </div>
            <div>
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="country"
              >
                Country
              </label>
              <input
                id="country"
                type="text"
                {...register("country", { required: "Country is required." })}
                aria-invalid={Boolean(errors.country)}
                className={`mt-1 w-full rounded-md border px-3 py-2 text-sm ${
                  errors.country ? "border-red-300" : "border-gray-300"
                }`}
              />
              {errors.country && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4 border-t border-gray-200 pt-6">
          <h3 className="text-base font-semibold">Contact Information</h3>
          <div>
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="email"
            >
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
              <p className="mt-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4 border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Payment Details</h3>
            <span className="inline-flex items-center gap-1 text-xs text-gray-500">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Secure payment
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Card type</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-600">
              {(
                [
                  { id: "visa", label: "Visa" },
                  { id: "mastercard", label: "Mastercard" },
                  { id: "amex", label: "American Express" },
                  { id: "discover", label: "Discover" },
                ] as const
              ).map((card) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setCardType(card.id)}
                  className={`rounded-md border px-2 py-1 cursor-pointer ${
                    cardType === card.id
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-200 bg-gray-50 text-gray-600"
                  }`}
                >
                  {card.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="cardholderName"
            >
              Cardholder name
            </label>
            <input
              id="cardholderName"
              type="text"
              {...register("cardholderName", {
                required: "Cardholder name is required.",
              })}
              aria-invalid={Boolean(errors.cardholderName)}
              className={`mt-1 w-full rounded-md border px-3 py-2 text-sm ${
                errors.cardholderName ? "border-red-300" : "border-gray-300"
              }`}
            />
            {errors.cardholderName && (
              <p className="mt-1 text-xs text-red-600">
                {errors.cardholderName.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="cardNumber"
            >
              Card number
            </label>
            <input
              id="cardNumber"
              type="text"
              inputMode="numeric"
              placeholder="1234 5678 9012"
              {...register("cardNumber", {
                required: "Card number is required.",
                pattern: {
                  value: /^[0-9\s]+$/,
                  message: "Use digits and spaces only.",
                },
                validate: (value) => {
                  const digits = value.replace(/\s+/g, "");
                  return (
                    digits.length >= 12 ||
                    "Card number must be at least 12 digits."
                  );
                },
              })}
              aria-invalid={Boolean(errors.cardNumber)}
              className={`mt-1 w-full rounded-md border px-3 py-2 text-sm ${
                errors.cardNumber ? "border-red-300" : "border-gray-300"
              }`}
            />
            {errors.cardNumber && (
              <p className="mt-1 text-xs text-red-600">
                {errors.cardNumber.message}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="expirationDate"
              >
                Expiration date (MM/YY)
              </label>
              <input
                id="expirationDate"
                type="text"
                inputMode="numeric"
                placeholder="MM/YY"
                {...register("expirationDate", {
                  required: "Expiration date is required.",
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/(\d{2})$/,
                    message: "Use MM/YY format.",
                  },
                })}
                aria-invalid={Boolean(errors.expirationDate)}
                className={`mt-1 w-full rounded-md border px-3 py-2 text-sm ${
                  errors.expirationDate ? "border-red-300" : "border-gray-300"
                }`}
              />
              {errors.expirationDate && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.expirationDate.message}
                </p>
              )}
            </div>
            <div>
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="cvc"
              >
                CVC
              </label>
              <input
                id="cvc"
                type="text"
                inputMode="numeric"
                placeholder="123"
                {...register("cvc", {
                  required: "CVC is required.",
                  pattern: {
                    value: /^\d{3,4}$/,
                    message: "CVC must be 3 or 4 digits.",
                  },
                })}
                aria-invalid={Boolean(errors.cvc)}
                className={`mt-1 w-full rounded-md border px-3 py-2 text-sm ${
                  errors.cvc ? "border-red-300" : "border-gray-300"
                }`}
              />
              {errors.cvc && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.cvc.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Order total</span>
            <span className="font-semibold text-gray-900">
              {formatCurrency(total)}
            </span>
          </div>
          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Placing order..." : "Place Order"}
          </button>
        </div>
      </form>

      {submitError && (
        <div className="mt-4 flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4" aria-hidden="true" />
          <span>{submitError}</span>
        </div>
      )}
    </section>
  );
}
