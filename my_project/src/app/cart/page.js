"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form States
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [city, setCity] = useState("Yangon");
  const [customerAddress, setCustomerAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
  }, []);

  const updateQuantity = (id, delta) => {
    const updated = cartItems
      .map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean);

    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 🚀 Database (API) သို့ Order တင်သည့် Function
  const handleConfirmOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("ဝယ်ယူမည့် သီးနှံ မရှိသေးပါခင်ဗျာ!");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerPhone,
          city,
          customerAddress,
          paymentMethod,
          totalPrice,
          cartItems,
        }),
      });

      if (res.ok) {
        alert("🎉 မှာယူမှု အောင်မြင်ပြီး Database ထဲသို့ ရောက်ရှိသွားပါပြီ ခင်ဗျာ!");
        localStorage.removeItem("cart");
        setCartItems([]);
        router.push("/");
      } else {
        const errorData = await res.json();
        alert("Order တင်ရာတွင် အမှားရှိပါသည်: " + errorData.error);
      }
    } catch (err) {
      console.error(err);
      alert("Server နှင့် ချိတ်ဆက်၍ မရပါခင်ဗျာ။");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
      <header style={{ marginBottom: "20px" }}>
        <Link href="/" style={{ textDecoration: "none", color: "#2e7d32", fontWeight: "bold" }}>
          ← ပင်မစာမျက်နှာသို့ ပြန်သွားမည်
        </Link>
        <h1 style={{ color: "#2e7d32", marginTop: "10px" }}>🛒 သင်၏ ခြင်းတောင်း (Cart)</h1>
      </header>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px", border: "2px dashed #ccc", borderRadius: "10px" }}>
          <h2>ခြင်းတောင်းထဲတွင် မည်သည့်သီးနှံမျှ မရှိသေးပါ။</h2>
          <Link href="/" style={{ display: "inline-block", marginTop: "10px", backgroundColor: "#2e7d32", color: "white", padding: "10px 20px", borderRadius: "6px", textDecoration: "none" }}>
            သီးနှံများ သွားရောက်ကြည့်ရှုမည်
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
          {/* ဘယ်ဘက် - Cart Items List */}
          <div>
            <h3>ရွေးချယ်ထားသော သီးနှံများ</h3>
            {cartItems.map((item) => (
              <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid #eee", paddingBottom: "10px", marginBottom: "10px" }}>
                <img src={item.image || "https://via.placeholder.com/60"} alt={item.name} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: "0 0 5px 0" }}>{item.name}</h4>
                  <p style={{ margin: 0, color: "#e65100", fontWeight: "bold" }}>{item.price.toLocaleString()} ကျပ်</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <button onClick={() => updateQuantity(item.id, -1)} style={{ width: "25px", height: "25px" }}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} style={{ width: "25px", height: "25px" }}>+</button>
                </div>
                <button onClick={() => removeItem(item.id)} style={{ color: "red", border: "none", background: "none", cursor: "pointer" }}>❌</button>
              </div>
            ))}
            <h3 style={{ textAlign: "right", color: "#2e7d32" }}>စုစုပေါင်း - {totalPrice.toLocaleString()} ကျပ်</h3>
          </div>

          {/* ညာဘက် - Delivery & Order Form */}
          <div style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "10px", border: "1px solid #e0e0e0" }}>
            <h3 style={{ marginTop: 0, color: "#1b5e20" }}>ပို့ဆောင်ရမည့် လိပ်စာ</h3>
            <form onSubmit={handleConfirmOrder} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "14px", fontWeight: "bold" }}>အမည် -</label>
                <input
                  type="text"
                  required
                  placeholder="ဦးမြ"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", marginTop: "4px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "14px", fontWeight: "bold" }}>ဖုန်းနံပါတ် -</label>
                <input
                  type="tel"
                  required
                  placeholder="09xxxxxxxxx"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", marginTop: "4px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "14px", fontWeight: "bold" }}>မြို့နယ် -</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", marginTop: "4px" }}
                >
                  <option value="Yangon">ရန်ကုန်</option>
                  <option value="Mandalay">မန္တလေး</option>
                  <option value="Naypyidaw">နေပြည်တော်</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "14px", fontWeight: "bold" }}>အသေးစိတ် လိပ်စာ -</label>
                <textarea
                  required
                  rows={3}
                  placeholder="အိမ်အမှတ်၊ လမ်း၊ ရပ်ကွက်"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", marginTop: "4px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "14px", fontWeight: "bold" }}>ငွေပေးချေမှု နည်းလမ်း -</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", marginTop: "4px" }}
                >
                  <option value="cod">Cash on Delivery (ပစ္စည်းရောက်ငွေချေ)</option>
                  <option value="bank">KPay / Wave Money</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  backgroundColor: isSubmitting ? "#81c784" : "#2e7d32",
                  color: "white",
                  padding: "12px",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  marginTop: "10px",
                }}
              >
                {isSubmitting ? "Order တင်နေပါသည်..." : "မှာယူမှုကို အတည်ပြုမည်"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}