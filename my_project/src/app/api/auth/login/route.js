export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Email သို့မဟုတ် Password မှားယွင်းနေပါသည်" }, { status: 401 });
    }

    // Role ပေါ်မူတည်၍ သွားရမည့် Redirect Page သတ်မှတ်ခြင်း
    const redirectTo = user.role === "FARMER" ? "/dashboard" : "/";

    return NextResponse.json({
      message: "Login အောင်မြင်ပါသည်",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      redirectTo,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}