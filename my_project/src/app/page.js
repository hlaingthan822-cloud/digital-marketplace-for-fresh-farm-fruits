"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // ၁။ Database မှ Products များ API မှတစ်ဆင့် ခေါ်ယူခြင်း
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("Products ယူရာတွင် အမှားရှိပါသည်:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();

    // LocalStorage မှ မူလ Cart Data ကို ယူခြင်း
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  // ၂။ Cart ထဲသို့ သီးနှံထည့်သည့် Function
  const addToCart = (product) => {
    const existingIndex = cart.findIndex((item) => item.id === product.id);
    let updatedCart = [...cart];

    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.name} ကို Cart ထဲသို့ ထည့်ပြီးပါပြီ! 🛒`);
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
      {/* Header Bar */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", borderBottom: "2px solid #eee", paddingBottom: "15px" }}>
        <h1 style={{ color: "#2e7d32", margin: 0 }}>🍊 Fresh Farm Fruits Market</h1>
        <div>
          <Link href="/cart" style={{ textDecoration: "none", backgroundColor: "#2e7d32", color: "white", padding: "10px 20px", borderRadius: "8px", fontWeight: "bold" }}>
            🛒 Cart ({totalCartItems})
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ backgroundColor: "#e8f5e9", padding: "30px", borderRadius: "12px", textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ color: "#1b5e20", marginTop: 0 }}>လတ်ဆတ်သော စိုက်ခင်းထွက် အသီးအနှံများကို တိုက်ရိုက် ဝယ်ယူပါ</h2>
        <p style={{ color: "#388e3c" }}>တောင်သူများထံမှ စားသုံးသူများလက်ဝယ်သို့ စျေးနှုန်းချိုသာစွာဖြင့် ပို့ဆောင်ပေးနေပါပြီ။</p>
      </section>

      {/* Products Grid */}
      <h2 style={{ color: "#333", borderLeft: "5px solid #2e7d32", paddingLeft: "10px" }}>ရရှိနိုင်သော သီးနှံများ</h2>

      {loading ? (
        <p style={{ textAlign: "center", padding: "50px", color: "#666" }}>🔄 သီးနှံစာရင်းများကို ခေါ်ယူနေပါသည်...</p>
      ) : products.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888", padding: "30px" }}>လက်ရှိ စိုက်ခင်းတွင် သီးနှံများ မရှိသေးပါ။ (Farmer Dashboard မှ ထည့်သွင်းနိုင်ပါသည်။)</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "25px", marginTop: "20px" }}>
          {products.map((product) => (
            <div key={product.id} style={{ border: "1px solid #e0e0e0", borderRadius: "10px", padding: "15px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <img
                src={product.image || "https://via.placeholder.com/150?text=Fruit"}
                alt={product.name}
                style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
              />
              <h3 style={{ margin: "10px 0 5px 0", color: "#222" }}>{product.name}</h3>
              <p style={{ color: "#666", fontSize: "14px", margin: "5px 0" }}>စိုက်ပျိုးသူ - {product.farmer || "စိုက်ပျိုးသူ"}</p>
              <p style={{ color: "#e65100", fontWeight: "bold", fontSize: "18px", margin: "10px 0" }}>{product.price.toLocaleString()} ကျပ်</p>
              <button
                onClick={() => addToCart(product)}
                style={{ width: "100%", backgroundColor: "#4caf50", color: "white", border: "none", padding: "10px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
              >
                + Cart ထဲထည့်မည်
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}