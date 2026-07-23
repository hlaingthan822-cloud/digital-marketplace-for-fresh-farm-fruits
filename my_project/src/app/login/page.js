"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CUSTOMER"); // "CUSTOMER" သို့မဟုတ် "FARMER"

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";
    const body = isRegister ? { name, email, password, role } : { email, password };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.ok) {
      if (isRegister) {
        alert("🎉 အကောင့်ဖွင့်ခြင်း အောင်မြင်ပါသည်။ Login ဝင်ပါ");
        setIsRegister(false);
      } else {
        // User အချက်အလက်ကို LocalStorage တွင် သိမ်းထားမည်
        localStorage.setItem("user", JSON.stringify(data.user));
        alert(`🎉 မင်္ဂလာပါ ${data.user.name} (${data.user.role})`);
        
        // ဝယ်သူဆိုရင် Home Page ( / ), တောင်သူဆိုရင် Dashboard ( /dashboard ) သို့ သွားမည်
        router.push(data.redirectTo);
      }
    } else {
      alert(data.error || "အမှားတစ်ခု ဖြစ်ပေါ်နေပါသည်");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>{isRegister ? "🔑 အကောင့်သစ်ဖွင့်ရန်" : "🔐 Login ဝင်ရန်"}</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {isRegister && (
          <>
            <input type="text" placeholder="အမည်" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: "8px" }} />
            <div>
              <label><strong>အကောင့်အမျိုးအစား: </strong></label>
              <select value={role} onChange={(e) => setRole(e.target.value)} style={{ padding: "8px", marginLeft: "10px" }}>
                <option value="CUSTOMER">🛒 ဝယ်သူ (Customer)</option>
                <option value="FARMER">🌾 စိုက်ပျိုးသူ တောင်သူ (Farmer)</option>
              </select>
            </div>
          </>
        )}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: "8px" }} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: "8px" }} />
        
        <button type="submit" style={{ padding: "10px", backgroundColor: "#2e7d32", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          {isRegister ? "အကောင့်ဖွင့်မည်" : "Login ဝင်မည်"}
        </button>
      </form>

      <button onClick={() => setIsRegister(!isRegister)} style={{ marginTop: "15px", background: "none", border: "none", color: "#1976d2", cursor: "pointer" }}>
        {isRegister ? "ရှိပြီးသား အကောင့်ဖြင့် Login ဝင်ရန်" : "အကောင့်အသစ်မရှိသေးပါက အကောင့်ဖွင့်ရန်"}
      </button>
    </div>
  );
}