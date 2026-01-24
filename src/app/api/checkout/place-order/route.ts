import { NextResponse } from "next/server";
import type { PlaceOrderPayload, PlaceOrderResponse } from "@/types/checkout";

export async function POST(request: Request) {
  const payload = (await request.json()) as PlaceOrderPayload;

  const response: PlaceOrderResponse = {
    success: Boolean(payload),
    orderId: `demo-${Date.now()}`,
  };

  return NextResponse.json(response);
}
