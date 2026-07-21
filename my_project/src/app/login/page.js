// src/app/login/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("customer"); // default is customer
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("အီးမေးလ်နှင့် လျှို့ဝှက်နံပါတ် ဖြည့်ပေးပါ ခင်ဗျာ!");
      return;
    }

    
    // Role နှင့် Login အခြေအနေကို LocalStorage ထဲတွင် သိမ်းဆည်းခြင်း
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", role);
    localStorage.setItem("userEmail", email);

    alert(
      `🎉 ${role === "farmer" ? "တောင်သူ" : "ဝယ်ယူသူ"} အဖြစ် အောင်မြင်စွာ Login ဝင်ပြီးပါပြီ!`,
    );

    if (role === "farmer") {
      router.push("/dashboard"); // တောင်သူဆိုရင် Dashboard သို့သွားမည်
    } else {
      router.push("/"); // ဝယ်ယူသူဆိုရင် Home သို့သွားမည်
    }
  };

  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "80px auto",
        padding: "30px",
        border: "1px solid #e2e8f0",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        backgroundColor: "#fff",
      }}
    >
      <h2
        style={{ textAlign: "center", color: "#2e7d32", marginBottom: "25px" }}
      >
        ချိတ်ဆက်ဈေးကွက် အကောင့်ဝင်ရန် 🔑
      </h2>

      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", gap: "18px" }}
      >
        {/* Role Selection */}
        <div>
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "8px",
              color: "#4a5568",
            }}
          >
            အကောင့်အမျိုးအစား ရွေးချယ်ပါ
          </label>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              onClick={() => setRole("customer")}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "8px",
                border:
                  role === "customer"
                    ? "2px solid #2e7d32"
                    : "1px solid #cbd5e0",
                backgroundColor: role === "customer" ? "#e8f5e9" : "#fff",
                color: role === "customer" ? "#2e7d32" : "#4a5568",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              🛒 ဝယ်ယူသူ (Customer)
            </button>
            <button
              type="button"
              onClick={() => setRole("farmer")}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "8px",
                border:
                  role === "farmer" ? "2px solid #2e7d32" : "1px solid #cbd5e0",
                backgroundColor: role === "farmer" ? "#e8f5e9" : "#fff",
                color: role === "farmer" ? "#2e7d32" : "#4a5568",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              🚜 တောင်သူ (Farmer)
            </button>
          </div>
        </div>

        <div>
          <label
            style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}
          >
            အီးမေးလ် သို့မဟုတ် ဖုန်းနံပါတ်
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #cbd5e0",
            }}
            required
          />
        </div>

        <div>
          <label
            style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}
          >
            လျှို့ဝှက်နံပါတ်
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #cbd5e0",
            }}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "12px",
            backgroundColor: "#2e7d32",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem",
            marginTop: "10px",
          }}
        >
          ဝင်ရောက်မည်
        </button>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <Link
            href="/"
            style={{
              color: "#4a5568",
              textDecoration: "none",
              fontSize: "0.9rem",
            }}
          >
            🏠 ပင်မစာမျက်နှာသို့ ပြန်ရန်
          </Link>
        </div>
      </form>
    </div>
  );
}
