"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  // Form Field State များ
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 1. LocalStorage မှ Cart Data ယူခြင်း
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const items = JSON.parse(storedCart);
        // quantity မပါပါက default 1 သတ်မှတ်ပေးခြင်း
        const formattedItems = items.map((item) => ({
          ...item,
          quantity: item.quantity || 1,
        }));
        setCartItems(formattedItems);
      } catch (e) {
        console.error("Cart items parse error:", e);
      }
    }

    // 2. LocalStorage မှ Login ဝင်ထားသော User Data ယူခြင်း
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setName(userData.name || ""); // အမည်ကို အလိုအလျောက် ထည့်ပေးခြင်း
      } catch (e) {
        console.error("User parse error:", e);
      }
    }
  }, []);

  // အရေအတွက် ပြောင်းလဲရန် Function
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

  // ပစ္စည်း ဖျက်ရန် Function
  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // စုစုပေါင်း ကျသင့်ငွေ တွက်ချက်ရန်
  const calculateTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + parseInt(item.price) * item.quantity,
      0
    );
  };

  // Order တင်သည့် Function
  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("⚠️ ခြင်းတောင်းထဲတွင် သီးနှံများ မရှိသေးပါ!");
      return;
    }

    setLoading(true);

    const orderData = {
      name,
      phone,
      address,
      total: calculateTotal(),
      items: cartItems,
      userId: user ? user.id : null, // Login ဝင်ထားပါက User ID ပို့မည်
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("🎉 အော်ဒါတင်ခြင်း အောင်မြင်ပါသည်!");
        localStorage.removeItem("cart"); // Cart ရှင်းမည်
        setCartItems([]);

        // Login ဝင်ထားသူဖြစ်ပါက History Page သို့ ပို့မည်၊ မဟုတ်ပါက Home သို့ ပို့မည်
        if (user) {
          router.push("/history");
        } else {
          router.push("/");
        }
      } else {
        alert("❌ အော်ဒါတင်ရာတွင် အမှားရှိနေပါသည်: " + (data.error || ""));
      }
    } catch (error) {
      console.error("Order Submit Error:", error);
      alert("❌ Server နှင့် ချိတ်ဆက်၍ မရပါခင်ဗျာ။");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>🛒 ရွေးချယ်ထားသော သီးနှံများ (Cart)</h2>
        <Link href="/" style={{ textDecoration: "none", color: "#2e7d32", fontWeight: "bold" }}>
          ← စေးဝယ်ထွက်ရန် ပင်မစာမျက်နှာသို့
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px", border: "1px dashed #ccc", borderRadius: "8px" }}>
          <p>ခြင်းတောင်းထဲတွင် မည်သည့် သီးနှံမှ မရှိသေးပါ။</p>
          <Link href="/" style={{ color: "#2e7d32", fontWeight: "bold" }}>သီးနှံများ သွားရောက်ကြည့်ရှုမည်</Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
          {/* ဘယ်ဘက် - ရွေးချယ်ထားသော အသီးအနှံများ စာရင်း */}
          <div>
            <h3>သီးနှံစာရင်း</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #ddd", padding: "10px", borderRadius: "8px" }}>
                  <div>
                    <h4 style={{ margin: "0 0 5px 0" }}>{item.name}</h4>
                    <span style={{ color: "#2e7d32", fontWeight: "bold" }}>{item.price} ကျပ်</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: "2px 8px" }}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: "2px 8px" }}>+</button>
                    <button onClick={() => removeItem(item.id)} style={{ color: "red", border: "none", background: "none", cursor: "pointer", marginLeft: "10px" }}>❌</button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold", borderTop: "2px solid #2e7d32", paddingTop: "10px" }}>
              စုစုပေါင်း ကျသင့်ငွေ - <span style={{ color: "#2e7d32" }}>{calculateTotal().toLocaleString()} ကျပ်</span>
            </div>
          </div>

          {/* ညာဘက် - ပို့ဆောင်ရမည့် လိပ်စာ ဖြည့်ရန် Form */}
          <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
            <h3>📦 ပို့ဆောင်ရမည့် အချက်အလက်</h3>
            <form onSubmit={handleOrderSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label>အမည် -</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="သင့်အမည် ရိုက်ထည့်ပါ"
                  style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                />
              </div>

              <div>
                <label>ဖုန်းနံပါတ် -</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09xxxxxxxxx"
                  style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                />
              </div>

              <div>
                <label>အသေးစိတ် လိပ်စာ -</label>
                <textarea
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="မြို့နယ်၊ လမ်း၊ အိမ်နံပါတ် စသည်ဖြင့်..."
                  style={{ width: "100%", padding: "8px", marginTop: "5px", height: "80px" }}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: "12px",
                  backgroundColor: loading ? "#ccc" : "#2e7d32",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginTop: "10px",
                }}
              >
                {loading ? "Order တင်နေပါသည်..." : "Order တင်မည်"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}