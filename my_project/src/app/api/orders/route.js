import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST: Customer မှ Order တင်လိုက်သည်များကို Database သို့ သိမ်းဆည်းရန်
export async function POST(req) {
  try {
    const body = await req.json();
    const { customerName, customerPhone, city, customerAddress, paymentMethod, totalPrice, cartItems } = body;

    const newOrder = await prisma.order.create({
      data: {
        customerName,
        customerPhone,
        city,
        customerAddress,
        paymentMethod,
        totalPrice: parseInt(totalPrice),
        orderItems: {
          create: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}