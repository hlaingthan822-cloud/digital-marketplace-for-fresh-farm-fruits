// src/app/api/orders/route.js
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerPhone,
      city,
      paymentMethod,
      customerAddress,
      totalPrice,
      items,
    } = body;

    const newOrder = await prisma.order.create({
      data: {
        customerName,
        customerPhone,
        city,
        paymentMethod,
        customerAddress,
        totalPrice: parseInt(totalPrice),
        items: JSON.stringify(items), // ခြင်းတောင်းထဲမှ ပစ္စည်းများကို စာသားပြောင်းသိမ်းခြင်း
      },
    });

    return NextResponse.json(
      { message: "Order placed successfully", order: newOrder },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to place order" },
      { status: 500 },
    );
  }
}
