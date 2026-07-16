// src/app/products/[id]/page.js
"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductDetailPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const router = useRouter();
  const { id } = params;
  const [quantity, setQuantity] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fruits = [
    {
      id: "1",
      name: "ပြင်ဦးလွင် စတော်ဘယ်ရီ",
      price: 5000,
      farmer: "ဒေါ်လှ (ပြင်ဦးလွင်)",
      image:
        "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&q=80",
      desc: "ပြင်ဦးလွင်မြို့မှ တိုက်ရိုက်ဆွတ်ခူးထားသော လတ်ဆတ်ပြီး ချိုမြိန်သည့် စတော်ဘယ်ရီသီးများ ဖြစ်ပါသည်။",
    },
    {
      id: "2",
      name: "ရှမ်းရိုးရာ လိမ္မော်သီး",
      price: 3000,
      farmer: "စိုင်းဆိုင် (ရှမ်း)",
      image:
        "https://images.unsplash.com/photo-1547514701-42782101795e?w=500&q=80",
      desc: "ရှမ်းကုန်းပြင်မြင့်မှ သဘာဝအတိုင်း စိုက်ပျိုးထားသော ရွှေလိမ္မော်သီးချိုချိုလေးများ ဖြစ်ပါသည်။",
    },
    {
      id: "3",
      name: "အောင်ပန်း အာလူး",
      price: 1500,
      farmer: "ဦးလှ (အောင်ပန်း)",
      image:
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&q=80",
      desc: "ဟင်းချက်ရာတွင် အရသာအလွန်ကောင်းမွန်သော အောင်ပန်းဒေသထွက် အာလူးသစ်များ ဖြစ်ပါသည်။",
    },
    {
      id: "4",
      name: "မော်လမြိုင် ကျွဲကောသီး",
      price: 4500,
      farmer: "ဒေါ်နီ (မော်လမြိုင်)",
      image:
        "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=500&q=80",
      desc: "အရည်ရွှမ်းပြီး ချိုချဉ်အရသာရှိသော မော်လမြိုင်ကျွဲကောသီး အကောင်းစားများ ဖြစ်ပါသည်။",
    },
    {
      id: "5",
      name: "ရွှေတောင် ထောပတ်သီး",
      price: 3500,
      farmer: "ကိုမင်း (ရွှေတောင်)",
      image:
        "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500&q=80",
      desc: "ဆီပါဝင်မှုနှုန်းမြင့်မားပြီး အနှစ်များသော ရွှေတောင်ဒေသထွက် ထောပတ်သီးကောင်းများ ဖြစ်ပါသည်။",
    },
    {
      id: "6",
      name: "ကျောက်ဆည် သရက်သီး",
      price: 6000,
      farmer: "ဦးဘ (ကျောက်ဆည်)",
      image:
        "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&q=80",
      desc: "အနံ့မွှေးပျံ့ပြီး အရသာအလွန်ထူးကဲသော ကျောက်ဆည်စိန်တလုံးသရက်သီးများ ဖြစ်ပါသည်။",
    },
    {
      id: "7",
      name: "မှော်ဘီ သင်္ဘောသီး",
      price: 2000,
      farmer: "ဦးတင် (မှော်ဘီ)",
      image:
        "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=500&q=80",
      desc: "ဓာတုဆေးဝါးကင်းစင်ပြီး သဘာဝအတိုင်း မှည့်ထားသော မှော်ဘီသင်္ဘောသီးချိုများ ဖြစ်ပါသည်။",
    },
    {
      id: "8",
      name: "သီပေါ နာနတ်သီး",
      price: 2500,
      farmer: "နန်းမွေ (သီပေါ)",
      image:
        "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&q=80",
      desc: "ချိုမြိန်အေးမြစေသော သီပေါဒေသထွက် နာနတ်သီးအကောင်းစားများ ဖြစ်ပါသည်။",
    },
    {
      id: "9",
      name: "ပြင်ဦးလွင် ပန်းသီး",
      price: 4000,
      farmer: "ဒေါ်မြ (ပြင်ဦးလွင်)",
      image:
        "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&q=80",
      desc: "ကြွပ်ရွပြီး အရသာရှိလှသော ပြင်ဦးလွင်ဒေသထွက် ပန်းသီးလတ်ဆတ်များ ဖြစ်ပါသည်။",
    },
  ];

  const fruit = fruits.find((f) => f.id === id) || fruits[0];

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert("⚠️ ခြင်းတောင်းထဲ ထည့်ရန် ဦးစွာ Login ဝင်ပေးပါဦး ခင်ဗျာ!");
      router.push("/login");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingIndex = cart.findIndex((item) => item.id === fruit.id);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ ...fruit, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(
      `🎉 ${fruit.name} (${quantity}) ပိဿာအား ခြင်းတောင်းထဲသို့ ထည့်သွင်းပြီးပါပြီ!`,
    );
    router.push("/");
  };

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px" }}>
      <Link
        href="/"
        style={{
          textDecoration: "none",
          color: "#2e7d32",
          fontWeight: "bold",
          display: "inline-block",
          marginBottom: "20px",
        }}
      >
        ⬅️ ပင်မစာမျက်နှာသို့ ပြန်သွားရန်
      </Link>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "40px",
        }}
      >
        <img
          src={fruit.image}
          alt={fruit.name}
          style={{
            width: "100%",
            borderRadius: "12px",
            height: "350px",
            objectFit: "cover",
          }}
        />

        <div>
          <h1 style={{ color: "#1a202c", margin: "0 0 10px 0" }}>
            {fruit.name}
          </h1>
          <p
            style={{ color: "#4a5568", fontWeight: "bold", fontSize: "1.1rem" }}
          >
            တောင်သူ - {fruit.farmer}
          </p>
          <p style={{ color: "#718096", lineHeight: "1.6" }}>{fruit.desc}</p>
          <h2 style={{ color: "#e65100", margin: "20px 0" }}>
            {fruit.price} ကျပ် / ပိဿာ
          </h2>

          {/* ပိဿာ အရေအတွက် တိုးလျော့စနစ် */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              marginBottom: "25px",
            }}
          >
            <span style={{ fontWeight: "bold" }}>ပိဿာအရေအတွက်:</span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #cbd5e0",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                style={{
                  padding: "8px 16px",
                  border: "none",
                  backgroundColor: "#edf2f7",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                -
              </button>
              <span
                style={{
                  padding: "8px 16px",
                  fontWeight: "bold",
                  minWidth: "40px",
                  textAlign: "center",
                }}
              >
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                style={{
                  padding: "8px 16px",
                  border: "none",
                  backgroundColor: "#edf2f7",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            style={{
              width: "100%",
              backgroundColor: "#2e7d32",
              color: "white",
              border: "none",
              padding: "14px",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            🛒 ခြင်းတောင်းထဲသို့ ထည့်မည်
          </button>
        </div>
      </div>
    </div>
  );
}
