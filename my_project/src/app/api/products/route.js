// src/app/api/products/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db"; // စောစောက ဆောက်ခဲ့တဲ့ db ဖိုင်ကို ပြန်ခေါ်သုံးပါမယ်

// Database ထဲမှ Products အားလုံးကို ဆွဲထုတ်ခြင်း
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Products အသစ် ထည့်သွင်းခြင်း
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, price, farmer, image } = body;

    const newProduct = await prisma.product.create({
      data: {
        name,
        price,
        farmer,
        image:
          image ||
          "https://images.unsplash.com/photo-1610397613090-303e797e8745?w=500",
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
