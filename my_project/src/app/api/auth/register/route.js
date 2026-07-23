export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const { name, email, password, role } = await req.json();

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "ဒီ Email ဖြင့် အကောင့်ရှိပြီးသားဖြစ်ပါသည်" }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // Production အတွက် bcrypt ဖြင့် hash လုပ်ရန် အကြံပြုပါသည်
        role: role || "CUSTOMER",
      },
    });

    return NextResponse.json({ message: "အကောင့်အောင်မြင်စွာ ဖွင့်ပြီးပါပြီ", user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}