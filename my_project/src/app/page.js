// src/app/page.js
"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [cartCount, setCartCount] = useState(0);

  // မြန်မာ့ခြံထွက် သီးနှံ (၉) မျိုး စာရင်း
  const fruits = [
    {
      id: "1",
      name: "ပြင်ဦးလွင် စတော်ဘယ်ရီ",
      price: "၅၀၀၀",
      farmer: "ဒေါ်လှ (ပြင်ဦးလွင်)",
      image:
        "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&q=80",
    },
    {
      id: "2",
      name: "ရှမ်းရိုးရာ လိမ္မော်သီး",
      price: "၃၀၀၀",
      farmer: "စိုင်းဆိုင် (ရှမ်း)",
      image:
        "https://images.unsplash.com/photo-1547514701-42782101795e?w=500&q=80",
    },
    {
      id: "3",
      name: "အောင်ပန်း အာလူး",
      price: "၁၅၀၀",
      farmer: "ဦးလှ (အောင်ပန်း)",
      image:
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&q=80",
    },
    {
      id: "4",
      name: "မော်လမြိုင် ကျွဲကောသီး",
      price: "၄၅၀၀",
      farmer: "ဒေါ်နီ (မော်လမြိုင်)",
      image:
        "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=500&q=80",
    },
    {
      id: "5",
      name: "ရွှေတောင် ထောပတ်သီး",
      price: "၃၅၀၀",
      farmer: "ကိုမင်း (ရွှေတောင်)",
      image:
        "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500&q=80",
    },
    {
      id: "6",
      name: "ကျောက်ဆည် သရက်သီး (စိန်တလုံး)",
      price: "၆၀၀၀",
      farmer: "ဦးဘ (ကျောက်ဆည်)",
      image:
        "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&q=80",
    },
    {
      id: "7",
      name: "မှော်ဘီ သင်္ဘောသီး",
      price: "၂၀၀၀",
      farmer: "ဦးတင် (မှော်ဘီ)",
      image:
        "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=500&q=80",
    },
    {
      id: "8",
      name: "သီပေါ နာနတ်သီး",
      price: "၂၅၀၀",
      farmer: "နန်းမွေ (သီပေါ)",
      image:
        "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&q=80",
    },
    {
      id: "9",
      name: "ပြင်ဦးလွင် ပန်းသီး",
      price: "၄၀၀၀",
      farmer: "ဒေါ်မြ (ပြင်ဦးလွင်)",
      image:
        "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&q=80",
    },
  ];

  const handleAddToCart = (fruitName) => {
    setCartCount((prev) => prev + 1);
    alert(`${fruitName} ကို ခြင်းတောင်းထဲ ထည့်လိုက်ပါပြီ! 🛒`);
  };

  return (
    <div style={{ padding: "0 20px", fontFamily: "inherit" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "between",
          alignItems: "center",
          padding: "20px 0",
          borderBottom: "1px solid #e2e8f0",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ color: "#2e7d32", margin: 0 }}>ချင်းတွင်းမြေ</h1>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Link
            href="/cart"
            style={{
              color: "#2e7d32",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            ခြင်းတောင်း 🛒 ({cartCount})
          </Link>
          <Link
            href="/dashboard"
            style={{ color: "#4a5568", textDecoration: "none" }}
          >
            တောင်သူ Dashboard
          </Link>
          <Link
            href="/login"
            style={{ color: "#4a5568", textDecoration: "none" }}
          >
            ဝင်ရန်
          </Link>
        </div>
      </header>

      {/* အလယ်ခေါင်းစဉ်ပိုင်း */}
      <div
        style={{ maxWidth: "800px", margin: "40px auto", textAlign: "center" }}
      >
        <h2
          style={{ fontSize: "2.5rem", color: "#1a202c", marginBottom: "10px" }}
        >
          Fresh Farm Fruits
        </h2>
        <p style={{ color: "#718096", fontSize: "1.1rem" }}>
          လတ်ဆတ်သော ခြံထွက်အသီးအနှံများကို တောင်သူများထံမှ တိုက်ရိုက်စိတ်ချစွာ
          ဝယ်ယူပါ
        </p>
      </div>

      {/* သစ်သီး (၉) ခု ကွက်လပ်စနစ် (Grid) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto 60px auto",
        }}
      >
        {fruits.map((fruit) => (
          <div
            key={fruit.id}
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "20px",
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* သစ်သီးပုံပြသမည့်နေရာ */}
            <div
              style={{
                width: "100%",
                height: "200px",
                borderRadius: "12px",
                overflow: "hidden",
                marginBottom: "15px",
              }}
            >
              <img
                src={fruit.image}
                alt={fruit.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* သစ်သီးအချက်အလက်များ */}
            <div>
              <h3
                style={{
                  color: "#1b5e20",
                  margin: "0 0 5px 0",
                  fontSize: "1.25rem",
                }}
              >
                {fruit.name}
              </h3>
              <p
                style={{
                  color: "#718096",
                  margin: "0 0 10px 0",
                  fontSize: "0.9rem",
                }}
              >
                တောင်သူ - {fruit.farmer}
              </p>
              <p
                style={{
                  color: "#e65100",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  margin: "0 0 15px 0",
                }}
              >
                {fruit.price} ကျပ် / ပိဿာ
              </p>
            </div>

            {/* ခလုတ်များ */}
            <div style={{ display: "flex", gap: "10px" }}>
              <Link
                href={`/products/${fruit.id}`}
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "10px",
                  border: "1px solid #cbd5e0",
                  borderRadius: "10px",
                  textDecoration: "none",
                  color: "#4a5568",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                }}
              >
                အသေးစိတ်
              </Link>
              <button
                onClick={() => handleAddToCart(fruit.name)}
                style={{
                  flex: 1,
                  padding: "10px",
                  backgroundColor: "#2e7d32",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                }}
              >
                ဝယ်ယူမည်
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
