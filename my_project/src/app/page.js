"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  // အသီးအနှံများကို Database မှ ခေါ်ယူခြင်း
  useEffect(() => {
    fetchProducts();
    updateCartCount();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Products ခေါ်ယူရာတွင် အမှားဖြစ်ပေါ်ပါသည်:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cart ထဲမှ ပစ္စည်းအရေအတွက်ကို တွက်ချက်ခြင်း
  const updateCartCount = () => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const items = JSON.parse(storedCart);
        const count = items.reduce(
          (sum, item) => sum + (item.quantity || 1),
          0
        );
        setCartCount(count);
      } catch (e) {
        setCartCount(0);
      }
    } else {
      setCartCount(0);
    }
  };

  // Cart ထဲသို့ သီးနှံ ထည့်သွင်းခြင်း
  const addToCart = (product) => {
    const storedCart = localStorage.getItem("cart");
    let cart = storedCart ? JSON.parse(storedCart) : [];

    const existingIndex = cart.findIndex((item) => item.id === product.id);

    if (existingIndex > -1) {
      cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`🛒 ${product.name} ကို Cart ထဲသို့ ထည့်ပြီးပါပြီ!`);
  };

  // အသီး နာမည်အလိုက် public/ ထဲမှ ပုံကို အလိုအလျောက် ရှာပေးသော Helper Function
  const getSmartFruitImage = (name) => {
    if (!name) return "/apple.webp";
    const n = name.toLowerCase();

    if (n.includes("လိမ္မော်") || n.includes("orange")) return "/orange.jpg";
    if (n.includes("ငှက်ပျော") || n.includes("banana")) return "/banana.jpg";
    if (n.includes("ထောပတ်") || n.includes("avocado")) return "/avocado.jpg";
    if (n.includes("စတော်ဘယ်ရီ") || n.includes("strawberry")) return "/strawberry.jpg";
    if (n.includes("သရက်") || n.includes("mango")) return "/mango.jpg";
    if (n.includes("ဖရဲ") || n.includes("watermelon")) return "/watermelon.webp";
    if (n.includes("ဝက်သစ်ချ") || n.includes("lychee")) return "/lychee.jpg";

    return "/apple.webp"; // မသိသော အသီးဖြစ်ပါက default ပန်းသီးပုံ ပြမည်
  };

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Header Section */}
      <header
        style={{
          display: "flex",
          justify: "space-between",
          alignItems: "center",
          paddingBottom: "20px",
          borderBottom: "2px solid #e0e0e0",
        }}
      >
        <h1
          style={{
            color: "#2e7d32",
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          🍊 Fresh Farm Fruits Market
        </h1>

        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <Link
            href="/history"
            style={{
              textDecoration: "none",
              color: "#555",
              fontWeight: "bold",
            }}
          >
            📜 History
          </Link>
          <Link href="/cart" style={{ textDecoration: "none" }}>
            <button
              style={{
                backgroundColor: "#2e7d32",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "20px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              🛒 Cart ({cartCount})
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Banner */}
      <div
        style={{
          backgroundColor: "#e8f5e9",
          padding: "25px",
          borderRadius: "12px",
          textAlign: "center",
          margin: "25px 0",
          border: "1px solid #c8e6c9",
        }}
      >
        <h2 style={{ color: "#1b5e20", marginTop: 0 }}>
          လတ်ဆတ်သော စိုက်ခင်းထွက် အသီးအနှံများကို တိုက်ရိုက် ဝယ်ယူပါ
        </h2>
        <p style={{ color: "#388e3c", marginBottom: 0 }}>
          တောင်သူများထံမှ စားသုံးသူများလက်ဝယ်သို့ ဈေးနှုန်းချိုသာစွာဖြင့်
          ပို့ဆောင်ပေးနေပါပြီ။
        </p>
      </div>

      {/* Product List Section */}
      <section>
        <h3
          style={{
            color: "#2e7d32",
            borderLeft: "5px solid #2e7d32",
            paddingLeft: "10px",
          }}
        >
          ရရှိနိုင်သော သီးနှံများ
        </h3>

        {loading ? (
          <p style={{ textAlign: "center", margin: "40px 0" }}>
            သီးနှံများ ခေါ်ယူနေပါသည်...
          </p>
        ) : products.length === 0 ? (
          <p style={{ textAlign: "center", margin: "40px 0", color: "#666" }}>
            လက်ရှိ စိုက်ခင်းတွင် သီးနှံများ မရှိသေးပါ။ (Farmer Dashboard မှ
            ထည့်သွင်းနိုင်ပါသည်)
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {products.map((product) => {
              // ပုံ URL ရှိရင် သုံးမယ်၊ မရှိရင် အသီးနာမည်နဲ့ အလိုအလျောက် ပုံဖမ်းယူမယ်
              const imageSrc =
                product.image && product.image.startsWith("/")
                  ? product.image
                  : getSmartFruitImage(product.name);

              return (
                <div
                  key={product.id}
                  style={{
                    border: "1px solid #e0e0e0",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    {/* Auto Fruit Image Display */}
                    <img
                      src={imageSrc}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "160px",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = getSmartFruitImage(product.name);
                      }}
                    />

                    <div style={{ padding: "15px", textAlign: "center" }}>
                      <h4 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>
                        {product.name}
                      </h4>
                      <p
                        style={{
                          margin: "0 0 8px 0",
                          color: "#666",
                          fontSize: "14px",
                        }}
                      >
                        စိုက်ပျိုးသူ - {product.farmer || "တောင်သူ"}
                      </p>
                      <div
                        style={{
                          color: "#d84315",
                          fontWeight: "bold",
                          fontSize: "16px",
                        }}
                      >
                        {parseInt(product.price).toLocaleString()} ကျပ်
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: "0 15px 15px 15px" }}>
                    <button
                      onClick={() => addToCart(product)}
                      style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#4caf50",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      + Cart ထဲထည့်မည်
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}