import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, phone, address, total, items, userId } = body;

    // Order အသစ် ဆောက်ခြင်း
    const order = await prisma.order.create({
      data: {
        name,
        phone,
        address,
        total: parseInt(total),
        userId: userId || null, // Login ဝင်ထားရင် userId ပါမည်
        items: {
          create: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity || 1,
            price: parseInt(item.price),
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({ message: "Order တင်ခြင်း အောင်မြင်ပါသည်", order }, { status: 201 });
  } catch (error) {
    console.error("Order Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}