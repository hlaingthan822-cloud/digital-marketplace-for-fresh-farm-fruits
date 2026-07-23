export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: သီးနှံများ အကုန်ဆွဲယူရန်
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Farmer Dashboard မှ သီးနှံအသစ် ထည့်ရန်
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, price, farmer, image } = body;

    const newProduct = await prisma.product.create({
      data: {
        name,
        price: parseInt(price),
        farmer,
        image,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}