// src/app/page.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [fruits, setFruits] = useState([]); // API မှလာမည့် သစ်သီးများ သိမ်းရန် State

  useEffect(() => {
    // Database မှ သစ်သီးများ ဆွဲယူခြင်း
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setFruits(data))
      .catch((err) => console.error(err));

    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    setUserRole(localStorage.getItem("userRole") || "");
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
  }, []);

  const handleBuyClick = (fruit) => {
    if (!isLoggedIn) {
      alert("⚠️ ကုန်ပစ္စည်းဝယ်ယူရန် ဦးစွာ Login ဝင်ပေးပါဦး ခင်ဗျာ!");
      router.push("/login");
      return;
    }
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingIndex = cart.findIndex((item) => item.id === fruit.id);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ ...fruit, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    alert(`🎉 ${fruit.name} (၁) ပိဿာကို ခြင်းတောင်းထဲ ထည့်ပြီးပါပြီ!`);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserRole("");
    alert("အကောင့်မှ ထွက်ပြီးပါပြီ။");
    router.push("/");
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "15px" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 0",
          borderBottom: "1px solid #e2e8f0",
          marginBottom: "25px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <h1 style={{ color: "#2e7d32", margin: 0, fontSize: "1.4rem" }}>
          ချိတ်ဆက်ဈေးကွက် 🥬
        </h1>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link
            href="/cart"
            style={{
              textDecoration: "none",
              color: "#2e7d32",
              fontWeight: "bold",
              border: "1px solid #2e7d32",
              padding: "6px 12px",
              borderRadius: "8px",
              fontSize: "0.85rem",
            }}
          >
            🛒 ခြင်းတောင်း ({cartCount})
          </Link>
          {isLoggedIn ? (
            <>
              {userRole === "farmer" && (
                <Link
                  href="/dashboard"
                  style={{
                    textDecoration: "none",
                    color: "#1e293b",
                    fontWeight: "bold",
                    fontSize: "0.85rem",
                  }}
                >
                  🚜 Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                style={{
                  border: "1px solid #e53e3e",
                  color: "#e53e3e",
                  backgroundColor: "transparent",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}
              >
                Logout 🚪
              </button>
            </>
          ) : (
            <Link
              href="/login"
              style={{
                textDecoration: "none",
                backgroundColor: "#2e7d32",
                color: "white",
                padding: "6px 12px",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "0.85rem",
              }}
            >
              Login
            </Link>
          )}
        </div>
      </header>

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h2
          style={{ fontSize: "1.8rem", color: "#1a202c", marginBottom: "8px" }}
        >
          Fresh Farm Fruits
        </h2>
        <p style={{ color: "#718096", fontSize: "0.9rem", margin: 0 }}>
          လတ်ဆတ်သော ခြံထွက်များကို တိုက်ရိုက်ဝယ်ယူပါ
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {fruits.map((fruit) => (
          <div
            key={fruit.id}
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#fff",
            }}
          >
            <img
              src={fruit.image}
              alt={fruit.name}
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
            />
            <div
              style={{
                padding: "15px",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h3
                  style={{
                    margin: "0 0 6px 0",
                    fontSize: "1.1rem",
                    color: "#2d3748",
                  }}
                >
                  {fruit.name}
                </h3>
                <p
                  style={{
                    margin: "0 0 10px 0",
                    fontSize: "0.8rem",
                    color: "#718096",
                  }}
                >
                  တောင်သူ - {fruit.farmerName}
                </p>
                <p
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    color: "#e65100",
                    margin: "0 0 15px 0",
                  }}
                >
                  {fruit.price} ကျပ်
                </p>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <Link
                  href={`/products/${fruit.id}`}
                  style={{
                    flex: 1,
                    textDecoration: "none",
                    textAlign: "center",
                    border: "1px solid #cbd5e0",
                    color: "#4a5568",
                    padding: "8px 0",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                  }}
                >
                  အသေးစိတ်
                </Link>
                <button
                  onClick={() => handleBuyClick(fruit)}
                  style={{
                    flex: 1,
                    backgroundColor: "#2e7d32",
                    color: "white",
                    border: "none",
                    padding: "8px 0",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                  }}
                >
                  ဝယ်ယူမည်
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
