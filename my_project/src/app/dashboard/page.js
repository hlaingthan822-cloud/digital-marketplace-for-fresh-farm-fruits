"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [farmer, setFarmer] = useState("");
  const [image, setImage] = useState("");
  const [editingId, setEditingId] = useState(null); // Edit လုပ်နေသည့် Product ID
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ၁။ စိုက်ပျိုးထားသော သီးနှံများ ခေါ်ယူခြင်း
  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    if (res.ok) {
      const data = await res.json();
      setProducts(data);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ၂။ သီးနှံအသစ် ထည့်ခြင်း သို့မဟုတ် Update ပြုလုပ်ခြင်း
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name,
      price: parseInt(price),
      farmer,
      image: image || "https://via.placeholder.com/150",
    };

    try {
      if (editingId) {
        // UPDATE (Edit) ပြုလုပ်ခြင်း
        const res = await fetch(`/api/products/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          alert("🎉 သီးနှံအချက်အလက်ကို Update ပြုလုပ်ပြီးပါပြီ!");
          setEditingId(null);
        }
      } else {
        // INSERT (အသစ်ထည့်ခြင်း)
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) alert("🎉 သီးနှံအသစ် တင်ပြီးပါပြီ!");
      }

      // Reset Form
      setName("");
      setPrice("");
      setFarmer("");
      setImage("");
      fetchProducts(); // List ကို Refresh ပြန်လုပ်ခြင်း
    } catch (err) {
      console.error(err);
      alert("အမှားတစ်ခု ဖြစ်ပေါ်နေပါသည်");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ၃။ Edit Button နှိပ်လိုက်ပါက Form ထဲသို့ Data များ ဖြည့်ပေးခြင်း
  const handleEditClick = (product) => {
    setEditingId(product.id);
    setName(product.name);
    setPrice(product.price);
    setFarmer(product.farmer || "");
    setImage(product.image || "");
  };

  // ၄။ သီးနှံ ဖျက်ထုတ်ခြင်း
  const handleDelete = async (id) => {
    if (confirm("ဒီသီးနှံကို ဖျက်မှာ သေချာပါသလား?")) {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("သီးနှံကို ဖျက်လိုက်ပါပြီ!");
        fetchProducts();
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName("");
    setPrice("");
    setFarmer("");
    setImage("");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "30px auto", padding: "20px", fontFamily: "sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>🌾 Farmer Dashboard (သီးနှံများ စီမံခန့်ခွဲရန်)</h2>
        <Link href="/" style={{ color: "#2e7d32", textDecoration: "none", fontWeight: "bold" }}>
          ← ပင်မစာမျက်နှာသို့
        </Link>
      </header>

      {/* Product Form (Add / Edit) */}
      <div style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px", border: "1px solid #ddd", marginBottom: "30px" }}>
        <h3 style={{ marginTop: 0, color: editingId ? "#e65100" : "#2e7d32" }}>
          {editingId ? "✏️ သီးနှံ ပြင်ဆင်ရန်" : "➕ သီးနှံအသစ် တင်ရန်"}
        </h3>
        <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <input type="text" placeholder="သီးနှံအမည်" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: "8px" }} />
          <input type="number" placeholder="စျေးနှုန်း (ကျပ်)" value={price} onChange={(e) => setPrice(e.target.value)} required style={{ padding: "8px" }} />
          <input type="text" placeholder="စိုက်ပျိုးသူအမည်" value={farmer} onChange={(e) => setFarmer(e.target.value)} required style={{ padding: "8px" }} />
          <input type="text" placeholder="ဓာတ်ပုံ URL" value={image} onChange={(e) => setImage(e.target.value)} style={{ padding: "8px" }} />
          
          <div style={{ gridColumn: "span 2", display: "flex", gap: "10px", marginTop: "10px" }}>
            <button type="submit" disabled={isSubmitting} style={{ flex: 1, padding: "10px", backgroundColor: editingId ? "#e65100" : "#2e7d32", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
              {isSubmitting ? "လုပ်ဆောင်နေပါသည်..." : editingId ? "Update လုပ်မည်" : "သီးနှံအသစ် တင်မည်"}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancelEdit} style={{ padding: "10px 20px", backgroundColor: "#757575", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                မလုပ်တော့ပါ
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Existing Products List Table */}
      <h3>📦 လက်ရှိ တင်ထားသော သီးနှံများ</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
        <thead>
          <tr style={{ backgroundColor: "#2e7d32", color: "white", textAlign: "left" }}>
            <th style={{ padding: "10px" }}>အမည်</th>
            <th style={{ padding: "10px" }}>စျေးနှုန်း</th>
            <th style={{ padding: "10px" }}>စိုက်ပျိုးသူ</th>
            <th style={{ padding: "10px", textAlign: "center" }}>လုပ်ဆောင်ချက်</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "10px" }}>{p.name}</td>
              <td style={{ padding: "10px" }}>{p.price} ကျပ်</td>
              <td style={{ padding: "10px" }}>{p.farmer}</td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                <button onClick={() => handleEditClick(p)} style={{ marginRight: "8px", padding: "5px 10px", backgroundColor: "#ff9800", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                  ✏️ ပြင်မည်
                </button>
                <button onClick={() => handleDelete(p.id)} style={{ padding: "5px 10px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                  🗑️ ဖျက်မည်
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}