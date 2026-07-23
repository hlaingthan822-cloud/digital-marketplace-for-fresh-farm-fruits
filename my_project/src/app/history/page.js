"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);

      // Order History ခေါ်ယူခြင်း
      fetch(`/api/orders/history?userId=${userData.id}`)
        .then((res) => res.json())
        .then((data) => setOrders(data));
    }
  }, []);

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h3>History ကြည့်ရန်အတွက် မဖြစ်မနေ Login ဝင်ပေးပါ၊၊</h3>
        <Link href="/login" style={{ color: "#2e7d32", fontWeight: "bold" }}>Login Page သို့သွားရန်</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "700px", margin: "30px auto", padding: "20px", fontFamily: "sans-serif" }}>
      <h2>📜 {user.name} ၏ ဝယ်ယူခဲ့သော Order မှတ်တမ်းများ</h2>
      <Link href="/" style={{ color: "#2e7d32", textDecoration: "none" }}>← ပင်မစာမျက်နှာသို့</Link>

      {orders.length === 0 ? (
        <p style={{ marginTop: "20px" }}>ဝယ်ယူထားသော မှတ်တမ်းများ မရှိသေးပါ၊၊</p>
      ) : (
        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "15px" }}>
          {orders.map((order) => (
            <div key={order.id} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "15px", backgroundColor: "#f9f9f9" }}>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #ccc", pb: "8px" }}>
                <strong>Order ID: #{order.id.slice(0, 8)}</strong>
                <span>📅 {new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              
              <ul style={{ paddingLeft: "20px", margin: "10px 0" }}>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.product?.name || "သီးနှံ"} - {item.quantity} ခု x {item.price} ကျပ်
                  </li>
                ))}
              </ul>

              <div style={{ textAlign: "right", fontWeight: "bold", color: "#2e7d32" }}>
                စုစုပေါင်း ကျသင့်ငွေ: {order.total} ကျပ်
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}