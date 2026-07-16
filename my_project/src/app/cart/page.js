// src/app/cart/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [recommendedFruits, setRecommendedFruits] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [city, setCity] = useState("yangon");
  const [customerAddress, setCustomerAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("cart") || "[]"));

    // Database မှ အကြံပြုသစ်သီးများ ဆွဲယူခြင်း
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setRecommendedFruits(data))
      .catch((err) => console.error(err));
  }, []);

  const updateQuantity = (id, change) => {
    const updated = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + change) };
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleQuickAdd = (fruit) => {
    let cart = [...cartItems];
    const existingIndex = cart.findIndex((item) => item.id === fruit.id);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ ...fruit, quantity: 1 });
    }
    setCartItems(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // မှာယူမှုကို Database သို့ တင်သွင်းသိမ်းဆည်းခြင်း
  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert("⚠️ မှာယူသူအချက်အလက်များကို ဖြည့်စွက်ပေးပါဦး ခင်ဗျာ!");
      return;
    }

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerPhone,
          city,
          paymentMethod,
          customerAddress,
          totalPrice,
          items: cartItems,
        }),
      });

      if (response.ok) {
        alert(
          "🎉 မှာယူမှုကို တကယ့် Database ထဲသို့ အောင်မြင်စွာ သိမ်းဆည်းလိုက်ပါပြီ ခင်ဗျာ!",
        );
        localStorage.removeItem("cart");
        setCartItems([]);
        router.push("/");
      } else {
        alert("Failed to submit order to database.");
      }
    } catch (error) {
      console.error(error);
      alert("Error processing order.");
    }
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
    setPaymentMethod(
      selectedCity === "yangon" || selectedCity === "mandalay" ? "cod" : "bank",
    );
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "15px" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 0",
          borderBottom: "1px solid #e2e8f0",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <h1 style={{ color: "#2e7d32", margin: 0, fontSize: "1.3rem" }}>
          🛒 ခြင်းတောင်းစာမျက်နှာ
        </h1>
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "#4a5568",
            fontWeight: "bold",
            border: "1px solid #cbd5e0",
            padding: "6px 12px",
            borderRadius: "8px",
            fontSize: "0.8rem",
          }}
        >
          🏠 ဈေးဝယ်ရန် ပြန်သွားမည်
        </Link>
      </header>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <h3>ခြင်းတောင်းထဲတွင် ပစ္စည်းမရှိသေးပါ 🛒</h3>
          <Link
            href="/"
            style={{
              backgroundColor: "#2e7d32",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              textDecoration: "none",
              display: "inline-block",
              marginTop: "10px",
            }}
          >
            ဝယ်ယူရန် သွားမည်
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          <div>
            <div
              style={{
                border: "1px solid #e2e8f0",
                padding: "15px",
                borderRadius: "12px",
                marginBottom: "25px",
                backgroundColor: "#fff",
              }}
            >
              <h3
                style={{
                  marginTop: 0,
                  fontSize: "1.1rem",
                  borderBottom: "2px solid #e2e8f0",
                  paddingBottom: "8px",
                }}
              >
                ရွေးချယ်ထားသော အသီးအနှံများ
              </h3>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "10px",
                    padding: "12px 0",
                    borderBottom: "1px solid #edf2f7",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: "0 0 3px 0", fontSize: "0.95rem" }}>
                      {item.name}
                    </h4>
                    <span
                      style={{
                        color: "#e65100",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                      }}
                    >
                      {item.price * item.quantity} ကျပ်
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #cbd5e0",
                      borderRadius: "6px",
                      overflow: "hidden",
                    }}
                  >
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      style={{
                        padding: "3px 8px",
                        border: "none",
                        backgroundColor: "#edf2f7",
                        cursor: "pointer",
                      }}
                    >
                      -
                    </button>
                    <span
                      style={{
                        padding: "3px 8px",
                        minWidth: "20px",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "0.85rem",
                      }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      style={{
                        padding: "3px 8px",
                        border: "none",
                        backgroundColor: "#edf2f7",
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "15px",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                <span>စုစုပေါင်း ကျသင့်ငွေ</span>
                <span style={{ color: "#2e7d32" }}>{totalPrice} ကျပ်</span>
              </div>
            </div>

            <div>
              <h3 style={{ marginBottom: "10px", fontSize: "1.1rem" }}>
                တခြားထပ်မံမှာယူနိုင်သော အသီးအနှံများ 🍎
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
                  gap: "10px",
                }}
              >
                {recommendedFruits.slice(0, 9).map((fruit) => (
                  <div
                    key={fruit.id}
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      overflow: "hidden",
                      padding: "8px",
                      textAlign: "center",
                      backgroundColor: "#fff",
                    }}
                  >
                    <img
                      src={fruit.image}
                      alt={fruit.name}
                      style={{
                        width: "100%",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                    <h5
                      style={{
                        margin: "5px 0 2px 0",
                        fontSize: "0.8rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {fruit.name}
                    </h5>
                    <p
                      style={{
                        margin: "0 0 6px 0",
                        fontSize: "0.75rem",
                        color: "#e65100",
                        fontWeight: "bold",
                      }}
                    >
                      {fruit.price} ကျပ်
                    </p>
                    <button
                      onClick={() => handleQuickAdd(fruit)}
                      style={{
                        width: "100%",
                        backgroundColor: "#2e7d32",
                        color: "white",
                        border: "none",
                        padding: "4px",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        cursor: "pointer",
                      }}
                    >
                      + ထည့်မည်
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#f7fafc",
              border: "1px solid #e2e8f0",
              padding: "20px",
              borderRadius: "12px",
              height: "fit-content",
            }}
          >
            <h3
              style={{ marginTop: 0, marginBottom: "15px", fontSize: "1.1rem" }}
            >
              မှာယူမှု အတည်ပြုရန်
            </h3>
            <form
              onSubmit={handleConfirmOrder}
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    marginBottom: "4px",
                  }}
                >
                  အမည်
                </label>
                <input
                  type="text"
                  placeholder="ကိုအောင်အောင်"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #cbd5e0",
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                  }}
                  required
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    marginBottom: "4px",
                  }}
                >
                  ဖုန်းနံပါတ်
                </label>
                <input
                  type="tel"
                  placeholder="09xxxxxxxxx"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #cbd5e0",
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                  }}
                  required
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    marginBottom: "4px",
                  }}
                >
                  မြို့နယ်ရွေးချယ်ပါ
                </label>
                <select
                  value={city}
                  onChange={handleCityChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #cbd5e0",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    fontSize: "0.9rem",
                  }}
                >
                  <option value="yangon">
                    ရန်ကုန်မြို့ (အိမ်ရောက်ငွေချေရ)
                  </option>
                  <option value="mandalay">
                    မန္တလေးမြို့ (အိမ်ရောက်ငွေချေရ)
                  </option>
                  <option value="other">အခြားမြို့များ (ဘဏ်လွှဲဖြင့်သာ)</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    marginBottom: "4px",
                  }}
                >
                  ငွေချေစနစ်
                </label>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    fontSize: "0.85rem",
                  }}
                >
                  {(city === "yangon" || city === "mandalay") && (
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                      />
                      💵 အိမ်ရောက်မှ ငွေချေမည်
                    </label>
                  )}
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={paymentMethod === "bank"}
                      onChange={() => setPaymentMethod("bank")}
                    />
                    🏦 မိုဘိုင်းဘဏ်စနစ် (KPay/Wave)
                  </label>
                </div>
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    marginBottom: "4px",
                  }}
                >
                  ပို့ဆောင်ပေးရမည့် လိပ်စာအပြည့်အစုံ
                </label>
                <textarea
                  rows={2}
                  placeholder="အမှတ်၊ လမ်း၊ ရပ်ကွက်"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #cbd5e0",
                    borderRadius: "8px",
                    fontFamily: "inherit",
                    fontSize: "0.9rem",
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  backgroundColor: "#2e7d32",
                  color: "white",
                  border: "none",
                  padding: "12px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  marginTop: "5px",
                }}
              >
                မှာယူမှုကို အတည်ပြုမည် 🛍️
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
