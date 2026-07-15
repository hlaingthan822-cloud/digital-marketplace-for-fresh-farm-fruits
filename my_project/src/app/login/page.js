// src/app/login/page.js
"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [role, setRole] = useState("customer"); // 'customer' သို့မဟုတ် 'farmer'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("အီးမေးလ်နှင့် လျှို့ဝှက်နံပါတ်ကို ဖြည့်ပေးပါဗျာ!");
      return;
    }

    if (role === "farmer") {
      alert("တောင်သူအဖြစ် အောင်မြင်စွာ ဝင်ရောက်ပြီးပါပြီ! 🚜");
      window.location.href = "/dashboard"; // တောင်သူဖြစ်ပါက Dashboard သို့ ပို့ပေးမည်
    } else {
      alert("ဝယ်ယူသူအဖြစ် အောင်မြင်စွာ ဝင်ရောက်ပြီးပါပြီ! 🛒");
      window.location.href = "/"; // ဝယ်သူဖြစ်ပါက ပင်မစာမျက်နှာသို့ ပို့ပေးမည်
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f7fafc",
      }}
    >
      <div
        className="bg-white p-8 rounded-2xl border"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#2e7d32",
            marginBottom: "10px",
          }}
        >
          အကောင့်ဝင်ရန်
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "#718096",
            fontSize: "0.9rem",
            marginBottom: "20px",
          }}
        >
          ချိတ်ဆက်ဈေးကွက်သို့ အကောင့်ဖွင့် ဝင်ရောက်ပါ
        </p>

        {/* တောင်သူ သို့မဟုတ် ဝယ်သူ ရွေးချယ်ရန် Tabs */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button
            type="button"
            onClick={() => setRole("customer")}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "10px",
              border:
                role === "customer" ? "2px solid #2e7d32" : "1px solid #e2e8f0",
              backgroundColor: role === "customer" ? "#e8f5e9" : "#fff",
              color: role === "customer" ? "#2e7d32" : "#4a5568",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            🛒 ဝယ်ယူသူအဖြစ် ဝင်မည်
          </button>
          <button
            type="button"
            onClick={() => setRole("farmer")}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "10px",
              border:
                role === "farmer" ? "2px solid #2e7d32" : "1px solid #e2e8f0",
              backgroundColor: role === "farmer" ? "#e8f5e9" : "#fff",
              color: role === "farmer" ? "#2e7d32" : "#4a5568",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            🚜 တောင်သူအဖြစ် ဝင်မည်
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.85rem",
                marginBottom: "5px",
                color: "#4a5568",
                fontWeight: "bold",
              }}
            >
              အီးမေးလ် သို့မဟုတ် ဖုန်းနံပါတ်
            </label>
            <input
              type="text"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e0",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.85rem",
                marginBottom: "5px",
                color: "#4a5568",
                fontWeight: "bold",
              }}
            >
              လျှို့ဝှက်နံပါတ်
            </label>
            <input
              type="password"
              placeholder="****"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e0",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#2e7d32",
              color: "#white",
              border: "none",
              borderRadius: "10px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            {role === "farmer"
              ? "🚜 တောင်သူအဖြစ် ဝင်ရောက်မည်"
              : "🛒 ဝယ်ယူသူအဖြစ် ဝင်ရောက်မည်"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link
            href="/"
            style={{
              color: "#718096",
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            ← ပင်မစာမျက်နှာသို့ ပြန်ရန်
          </Link>
        </div>
      </div>
    </div>
  );
}
