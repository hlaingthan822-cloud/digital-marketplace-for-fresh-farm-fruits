// src/app/dashboard/page.js
"use client";

import { useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [farmer, setFarmer] = useState("");
  const [image, setImage] = useState(null); // File Upload သိမ်းဆည်းရန် State

  // သစ်သီး (၉) မျိုးစာရင်း
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "ပြင်ဦးလွင် စတော်ဘယ်ရီ",
      price: "၅၀၀၀",
      farmer: "ဒေါ်လှ (ပြင်ဦးလွင်)",
      image:
        "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&q=80",
    },
    {
      id: "2",
      name: "ရှမ်းရိုးရာ လိမ္မော်သီး",
      price: "၃၀၀၀",
      farmer: "စိုင်းဆိုင် (ရှမ်း)",
      image:
        "https://images.unsplash.com/photo-1547514701-42782101795e?w=500&q=80",
    },
    {
      id: "3",
      name: "အောင်ပန်း အာလူး",
      price: "၁၅၀၀",
      farmer: "ဦးလှ (အောင်ပန်း)",
      image:
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&q=80",
    },
    {
      id: "4",
      name: "မော်လမြိုင် ကျွဲကောသီး",
      price: "၄၅၀၀",
      farmer: "ဒေါ်နီ (မော်လမြိုင်)",
      image:
        "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=500&q=80",
    },
    {
      id: "5",
      name: "ရွှေတောင် ထောပတ်သီး",
      price: "၃၅၀၀",
      farmer: "ကိုမင်း (ရွှေတောင်)",
      image:
        "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500&q=80",
    },
    {
      id: "6",
      name: "ကျောက်ဆည် သရက်သီး (စိန်တလုံး)",
      price: "၆၀၀၀",
      farmer: "ဦးဘ (ကျောက်ဆည်)",
      image:
        "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&q=80",
    },
    {
      id: "7",
      name: "မှော်ဘီ သင်္ဘောသီး",
      price: "၂၀၀၀",
      farmer: "ဦးတင် (မှော်ဘီ)",
      image:
        "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=500&q=80",
    },
    {
      id: "8",
      name: "သီပေါ နာနတ်သီး",
      price: "၂၅၀၀",
      farmer: "နန်းမွေ (သီပေါ)",
      image:
        "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&q=80",
    },
    {
      id: "9",
      name: "ပြင်ဦးလွင် ပန်းသီး",
      price: "၄၀၀၀",
      farmer: "ဒေါ်မြ (ပြင်ဦးလွင်)",
      image:
        "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&q=80",
    },
  ]);

  // File ရွေးချယ်မှု ပြောင်းလဲသည့်အခါ ဖတ်ရန်
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Laptop ထဲက ပုံဖိုင်ကို Browser မှာ မြင်တွေ့ရအောင် URL အဖြစ် ပြောင်းလဲပေးခြင်း
      setImage(URL.createObjectURL(file));
    }
  };

  // သီးနှံသစ် တင်သွင်းခြင်း
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!name || !price) {
      alert("သီးနှံအမည်နှင့် ဈေးနှုန်းကို ဖြည့်စွက်ပေးပါဦး ခင်ဗျာ!");
      return;
    }

    // တကယ်လို့ ပုံမတင်ထားရင် default ပုံ ထည့်ပေးမည်
    const finalImage =
      image ||
      "https://images.unsplash.com/photo-1610832958506-ee56336191d1?w=500&q=80";

    const newProduct = {
      id: Date.now().toString(),
      name,
      price,
      farmer: farmer || "အမည်မသိ တောင်သူ",
      image: finalImage,
    };

    setProducts([newProduct, ...products]);
    alert(`${name} သီးနှံအသစ်ကို အောင်မြင်စွာ တင်သွင်းပြီးပါပြီ! 🎉`);

    // Form ပြန်ရှင်းရန်
    setName("");
    setPrice("");
    setFarmer("");
    setImage(null);
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "inherit",
      }}
    >
      {/* အပေါ်ပိုင်း Navbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
          borderBottom: "1px solid #e2e8f0",
          paddingBottom: "20px",
        }}
      >
        <h1 style={{ color: "#2e7d32", margin: 0, fontSize: "1.8rem" }}>
          Farmer Dashboard 🚜
        </h1>
        <Link
          href="/"
          style={{
            color: "#2e7d32",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          ← ပင်မစာမျက်နှာသို့
        </Link>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "40px",
        }}
      >
        {/* လက်ဝဲဘက်ခြမ်း: သီးနှံအသစ် တင်သွင်းရန် Form */}
        <div
          style={{
            backgroundColor: "#f8fafc",
            padding: "30px",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            height: "fit-content",
          }}
        >
          <h2 style={{ color: "#1e293b", marginTop: 0, marginBottom: "20px" }}>
            သီးနှံအသစ် တင်သွင်းရန်
          </h2>
          <form
            onSubmit={handleAddProduct}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "500",
                }}
              >
                သီးနှံအမည်
              </label>
              <input
                type="text"
                placeholder="ဥပမာ - ရွှေတောင်ထောပတ်သီး"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e0",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "500",
                }}
              >
                ဈေးနှုန်း (ကျပ် / ပိဿာ)
              </label>
              <input
                type="text"
                placeholder="ဥပမာ - ၃၅၀၀"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e0",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "500",
                }}
              >
                တောင်သူအမည်
              </label>
              <input
                type="text"
                placeholder="ဥပမာ - ဦးလှ"
                value={farmer}
                onChange={(e) => setFarmer(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e0",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "500",
                }}
              >
                သစ်သီးဓာတ်ပုံ ရွေးချယ်ရန်
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ width: "100%", padding: "5px 0" }}
              />
            </div>

            {/* ပုံရွေးချယ်ထားပြီးပါက Preview ပြသရန် */}
            {image && (
              <div style={{ marginTop: "10px" }}>
                <p
                  style={{
                    margin: "0 0 5px 0",
                    fontSize: "0.9rem",
                    color: "#64748b",
                  }}
                >
                  ရွေးချယ်ထားသော ပုံနမူနာ -
                </p>
                <img
                  src={image}
                  alt="preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}

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
                marginTop: "10px",
              }}
            >
              တင်သွင်းမည်
            </button>
          </form>
        </div>

        {/* လက်ယာဘက်ခြမ်း: ရောင်းချနေဆဲ သီးနှံများပြသသည့်စာရင်း */}
        <div>
          <h2 style={{ color: "#1e293b", marginTop: 0, marginBottom: "20px" }}>
            ရောင်းချနေဆဲ သီးနှံများ ({products.length})
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  padding: "15px",
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: "0 0 5px 0", color: "#1e293b" }}>
                    {product.name}
                  </h4>
                  <p
                    style={{ margin: 0, fontSize: "0.9rem", color: "#64748b" }}
                  >
                    တောင်သူ: {product.farmer}
                  </p>
                </div>
                <div style={{ color: "#e65100", fontWeight: "bold" }}>
                  {product.price} ကျပ်
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
