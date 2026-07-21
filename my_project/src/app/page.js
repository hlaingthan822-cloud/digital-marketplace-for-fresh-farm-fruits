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

  // အသီးအနှံ စုစုပေါင်း (၉) မျိုး
  const fruits = [
    {
      id: "1",
      name: "ပြင်ဦးလွင် စတော်ဘယ်ရီ",
      price: 5000,
      farmer: "ဒေါ်လှ (ပြင်ဦးလွင်)",
      image:
        "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&q=80",
    },
    {
      id: "2",
      name: "ရှမ်းရိုးရာ လိမ္မော်သီး",
      price: 3000,
      farmer: "စိုင်းဆိုင် (ရှမ်း)",
      image:
        "https://images.unsplash.com/photo-1547514701-42782101795e?w=500&q=80",
    },
    {
      id: "3",
      name: "အောင်ပန်း အာလူး",
      price: 1500,
      farmer: "ဦးလှ (အောင်ပန်း)",
      image:
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&q=80",
    },
    {
      id: "4",
      name: "မော်လမြိုင် ကျွဲကောသီး",
      price: 4500,
      farmer: "ဒေါ်နီ (မော်လမြိုင်)",
      image:
        "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=500&q=80",
    },
    {
      id: "5",
      name: "ရွှေတောင် ထောပတ်သီး",
      price: 3500,
      farmer: "ကိုမင်း (ရွှေတောင်)",
      image:
        "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500&q=80",
    },
    {
      id: "6",
      name: "ကျောက်ဆည် သရက်သီး",
      price: 6000,
      farmer: "ဦးဘ (ကျောက်ဆည်)",
      image:
        "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&q=80",
    },
    {
      id: "7",
      name: "မှော်ဘီ သင်္ဘောသီး",
      price: 2000,
      farmer: "ဦးတင် (မှော်ဘီ)",
      image:
        "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=500&q=80",
    },
    {
      id: "8",
      name: "သီပေါ နာနတ်သီး",
      price: 2500,
      farmer: "နန်းမွေ (သီပေါ)",
      image:
        "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&q=80",
    },
    {
      id: "9",
      name: "ပြင်ဦးလွင် ပန်းသီး",
      price: 4000,
      farmer: "ဒေါ်မြ (ပြင်ဦးလွင်)",
      image:
        "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&q=80",
    },
  ];

  useEffect(() => {
    // Login အခြေအနေစစ်ဆေးခြင်း
    const logged = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("userRole") || "";
    setIsLoggedIn(logged);
    setUserRole(role);

    // Cart Count စစ်ဆေးခြင်း
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
  }, []);

  const handleBuyClick = (fruit) => {
    if (!isLoggedIn) {
      alert("⚠️ ကုန်ပစ္စည်းဝယ်ယူရန် ဦးစွာ Login ဝင်ပေးပါဦး ခင်ဗျာ!");
      router.push("/login");
      return;
    }

    // Login ဝင်ထားပါက Cart ထဲထည့်ခြင်း
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
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setUserRole("");
    alert("အကောင့်မှ ထွက်ပြီးပါပြီ။");
    router.push("/");
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {/* Header အပိုင်း */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 0",
          borderBottom: "1px solid #e2e8f0",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ color: "#2e7d32", margin: 0 }}>ချိတ်ဆက်ဈေးကွက် 🥬</h1>

        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          {/* ခြင်းတောင်းခလုတ် (ဝယ်ရင် အရေအတွက် တိုးပေးမည့်စနစ်) */}
          <Link
            href="/cart"
            style={{
              textDecoration: "none",
              color: "#2e7d32",
              fontWeight: "bold",
              position: "relative",
              border: "1px solid #2e7d32",
              padding: "8px 16px",
              borderRadius: "8px",
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
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer",
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
                padding: "8px 16px",
                borderRadius: "8px",
                fontWeight: "bold",
              }}
            >
              Login ဝင်ရန်
            </Link>
          )}
        </div>
      </header>

      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2
          style={{ fontSize: "2.2rem", color: "#1a202c", marginBottom: "10px" }}
        >
          Fresh Farm Fruits
        </h2>
        <p style={{ color: "#718096" }}>
          လတ်ဆတ်သော ခြံထွက်အသီးအနှံများကို တိုက်ရိုက်ချိတ်ဆက် ဝယ်ယူပါ
        </p>
      </div>

      {/* အသီးအနှံ (၉) မျိုး Card စာရင်း */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "25px",
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
            }}
          >
            <img
              src={fruit.image}
              alt={fruit.name}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div style={{ padding: "20px" }}>
              <h3
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "1.2rem",
                  color: "#2d3748",
                }}
              >
                {fruit.name}
              </h3>
              <p
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "0.9rem",
                  color: "#718096",
                }}
              >
                တောင်သူ - {fruit.farmer}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <span
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "#e65100",
                  }}
                >
                  {fruit.price} ကျပ် / ပိဿာ
                </span>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                {/* အသေးစိတ်ကြည့်ရန် ခလုတ် - Login မလိုဘဲ သွားလို့ရသည် */}
                <Link
                  href={`/products/${fruit.id} `}
                  style={{
                    flex: 1,
                    textDecoration: "none",
                    textAlign: "center",
                    border: "1px solid #cbd5e0",
                    color: "#4a5568",
                    padding: "10px 0",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                  }}
                >
                  အသေးစိတ်
                </Link>
                {/* ဝယ်ယူမည် ခလုတ် - Login စစ်သည် */}
                <button
                  onClick={() => handleBuyClick(fruit)}
                  style={{
                    flex: 1,
                    backgroundColor: "#2e7d32",
                    color: "white",
                    border: "none",
                    padding: "10px 0",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "0.9rem",
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
