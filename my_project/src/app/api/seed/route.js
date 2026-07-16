// src/app/api/seed/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"; // @prisma/client ကို တိုက်ရိုက် import သုံးပါမယ်

const prisma = new PrismaClient(); // prisma instance အသစ်တစ်ခု ဆောက်လိုက်ပါမယ်

const initialFruits = [
  {
    name: "ပြင်ဦးလွင် စတော်ဘယ်ရီ",
    price: "၅၀၀၀",
    farmer: "ဒေါ်လှ (ပြင်ဦးလွင်)",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500",
  },
  {
    name: "ရှမ်းရိုးရာ လိမ္မော်သီး",
    price: "၃၀၀၀",
    farmer: "စိုင်းဆိုင် (ရှမ်း)",
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=500",
  },
  {
    name: "အောင်ပန်း အာလူး",
    price: "၁၅၀၀",
    farmer: "ဦးလူ (အောင်ပန်း)",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500",
  },
];

export async function GET() {
  try {
    // Database ထဲမှာ Product ရှိ၊ မရှိ စစ်ဆေးခြင်း
    const count = await prisma.product.count();

    if (count > 0) {
      return NextResponse.json({
        message: "Database already seeded with products!",
      });
    }

    // Product တွေ Database ထဲ ထည့်ခြင်း
    await prisma.product.createMany({
      data: initialFruits,
    });

    return NextResponse.json({ message: "Database seeded successfully!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
