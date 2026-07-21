// src/app/cart/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);

  // မှာယူသူအချက်အလက် State
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [city, setCity] = useState("yangon"); // default yangon
  const [customerAddress, setCustomerAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod"); // default Cash On Delivery

  // အကြံပြုအသီးအနှံ (၉) မျိုး
  const recommendedFruits = [
    {
      id: "1",
      name: "ပြင်ဦးလွင် စတော်ဘယ်ရီ",
      price: 5000,
      farmer: "ဒေါ်လှ",
      image:
        "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&q=80",
    },
    {
      id: "2",
      name: "ရှမ်းရိုးရာ လိမ္မော်သီး",
      price: 3000,
      farmer: "စိုင်းဆိုင်",
      image:
        "https://images.unsplash.com/photo-1547514701-42782101795e?w=500&q=80",
    },
    {
      id: "3",
      name: "အောင်ပန်း အာလူး",
      price: 1500,
      farmer: "ဦးလှ",
      image:
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&q=80",
    },
    {
      id: "4",
      name: "မော်လမြိုင် ကျွဲကောသီး",
      price: 4500,
      farmer: "ဒေါ်နီ",
      image:
        "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=500&q=80",
    },
    {
      id: "5",
      name: "ရွှေတောင် ထောပတ်သီး",
      price: 3500,
      farmer: "ကိုမင်း",
      image:
        "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500&q=80",
    },
    {
      id: "6",
      name: "ကျောက်ဆည် သရက်သီး",
      price: 6000,
      farmer: "ဦးဘ",
      image:
        "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&q=80",
    },
    {
      id: "7",
      name: "မှော်ဘီ သင်္ဘောသီး",
      price: 2000,
      farmer: "ဦးတင်",
      image:
        "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=500&q=80",
    },
    {
      id: "8",
      name: "သီပေါ နာနတ်သီး",
      price: 2500,
      farmer: "နန်းမွေ",
      image:
        "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&q=80",
    },
    {
      id: "9",
      name: "ပြင်ဦးလွင် ပန်းသီး",
      price: 4000,
      farmer: "ဒေါ်မြ",
      image:
        "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&q=80",
    },
  ];

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
  }, []);

  // ခြင်းတောင်းထဲက ပစ္စည်းပမာဏ အတိုးအလျော့ ပြုလုပ်ခြင်း
  const updateQuantity = (id, change) => {
    const updated = cartItems.map((item) => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // ဘေးမှ အကြံပြုအသီးများအား ချက်ချင်းထည့်သွင်းခြင်း
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

  // စုစုပေါင်း ဈေးနှုန်း တွက်ချက်ခြင်း
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // မှာယူမှု အတည်ပြုခြင်း
  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert("⚠️ မှာယူသူအချက်အလက်များကို ပြည့်စုံစွာ ဖြည့်စွက်ပေးပါဦး ခင်ဗျာ!");
      return;
    }

    const payMsg =
      paymentMethod === "cod"
        ? "📦 အိမ်ရောက်ငွေချေစနစ်ဖြင့် မှာယူထားပါသည်။"
        : "🏦 မိုဘိုင်းဘဏ်စနစ်ဖြင့် လွှဲပေးရမည်ဖြစ်ပြီး၊ ငွေလွှဲပြေစာအား ပေးပို့ပေးရန် လိုအပ်ပါသည်။";

    alert(
      `🎉 မှာယူမှု အောင်မြင်ပါသည် ခင်ဗျာ!\n\nစုစုပေါင်း ကျသင့်ငွေ - ${totalPrice} ကျပ်\n${payMsg}`,
    );

    // Clear Cart
    localStorage.removeItem("cart");
    setCartItems([]);
    router.push("/");
  };
  // မြို့ပေါ်မူတည်၍ ငွေချေစနစ်ပြောင်းလဲခြင်း
  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
    if (selectedCity === "yangon" || selectedCity === "mandalay") {
      setPaymentMethod("cod"); // ရန်ကုန်နှင့် မန္တလေးဆိုလျှင် အိမ်ရောက်ငွေချေ ရွေးခွင့်ပြုသည်
    } else {
      setPaymentMethod("bank"); // အခြားမြို့များဆိုလျှင် ဘဏ်စနစ်သာရမည်
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
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
        <h1 style={{ color: "#2e7d32", margin: 0, fontSize: "1.5rem" }}>
          🛒 ခြင်းတောင်းစာမျက်နှာ
        </h1>
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "#4a5568",
            fontWeight: "bold",
            border: "1px solid #cbd5e0",
            padding: "8px 16px",
            borderRadius: "8px",
          }}
        >
          🏠 ဈေးဝယ်ရန် ပြန်သွားမည်
        </Link>
      </header>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <h2>ခြင်းတောင်းထဲတွင် ပစ္စည်းမရှိသေးပါ 🛒</h2>
          <Link
            href="/"
            style={{
              backgroundColor: "#2e7d32",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              textDecoration: "none",
              display: "inline-block",
              marginTop: "15px",
            }}
          >
            ဝယ်ယူရန် သွားမည်
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 2fr",
            gap: "30px",
          }}
        >
          {/* ဘယ်ဘက်ခြမ်း: ရွေးထားသောအသီးများ (အတိုးအလျော့လုပ်နိုင်) */}
          <div>
            <div
              style={{
                border: "1px solid #e2e8f0",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "30px",
              }}
            >
              <h3
                style={{
                  marginTop: 0,
                  borderBottom: "2px solid #e2e8f0",
                  paddingBottom: "10px",
                }}
              >
                ရွေးချယ်ထားသော အသီးအနှံများ
              </h3>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "15px",
                    padding: "15px 0",
                    borderBottom: "1px solid #edf2f7",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: "0 0 5px 0" }}>{item.name}</h4>
                    <span style={{ color: "#e65100", fontWeight: "bold" }}>
                      {item.price * item.quantity} ကျပ်
                    </span>
                  </div>

                  {/* အတိုးအလျော့ခလုတ် */}
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
                        padding: "5px 10px",
                        border: "none",
                        backgroundColor: "#edf2f7",
                        cursor: "pointer",
                      }}
                    >
                      -
                    </button>
                    <span
                      style={{
                        padding: "5px 10px",
                        minWidth: "25px",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      style={{
                        padding: "5px 10px",
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
                  marginTop: "20px",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                <span>စုစုပေါင်း ကျသင့်ငွေ</span>
                <span style={{ color: "#2e7d32" }}>{totalPrice} ကျပ်</span>
              </div>
            </div>

            {/* ဘေးမှ တခြားထပ်မှာချင်သည့် အသီးအနှံ (၉) မျိုးအကြံပြုချက် */}
            <div>
              <h3 style={{ marginBottom: "15px" }}>
                တခြားထပ်မံမှာယူနိုင်သော အသီးအနှံများ 🍎
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                  gap: "15px",
                }}
              >
                {recommendedFruits.map((fruit) => (
                  <div
                    key={fruit.id}
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      overflow: "hidden",
                      padding: "10px",
                      textAlign: "center",
                    }}
                  >
                    <img
                      src={fruit.image}
                      alt={fruit.name}
                      style={{
                        width: "100%",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                    <h5 style={{ margin: "8px 0 4px 0", fontSize: "0.9rem" }}>
                      {fruit.name}
                    </h5>
                    <p
                      style={{
                        margin: "0 0 8px 0",
                        fontSize: "0.8rem",
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
                        padding: "6px",
                        borderRadius: "6px",
                        fontSize: "0.8rem",
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

          {/* ညာဘက်ခြမ်း: မှာယူသူအချက်အလက်နှင့် ငွေချေစနစ်ရွေးချယ်ခြင်း */}
          <div
            style={{
              backgroundColor: "#f7fafc",
              border: "1px solid #e2e8f0",
              padding: "25px",
              borderRadius: "12px",
              height: "fit-content",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: "20px" }}>
              မှာယူမှု အတည်ပြုရန်
            </h3>

            <form
              onSubmit={handleConfirmOrder}
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    marginBottom: "5px",
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
                    padding: "10px",
                    border: "1px solid #cbd5e0",
                    borderRadius: "8px",
                  }}
                  required
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    marginBottom: "5px",
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
                    padding: "10px",
                    border: "1px solid #cbd5e0",
                    borderRadius: "8px",
                  }}
                  required
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  မြို့နယ်ရွေးချယ်ပါ
                </label>
                <select
                  value={city}
                  onChange={handleCityChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #cbd5e0",
                    borderRadius: "8px",
                    backgroundColor: "white",
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
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  ငွေချေစနစ်
                </label>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {(city === "yangon" || city === "mandalay") && (
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
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
                      💵 အိမ်ရောက်မှ ငွေချေမည် (Cash On Delivery)
                    </label>
                  )}
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
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
                    🏦 မိုဘိုင်းဘဏ်စနစ် (KPay, WavePay)
                  </label>
                </div>
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  ပို့ဆောင်ပေးရမည့် လိပ်စာအပြည့်အစုံ
                </label>
                <textarea
                  rows={3}
                  placeholder="အမှတ်၊ လမ်း၊ ရပ်ကွက်"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #cbd5e0",
                    borderRadius: "8px",
                    fontFamily: "inherit",
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
                  padding: "14px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "1rem",
                  marginTop: "10px",
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

