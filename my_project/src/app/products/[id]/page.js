// src/app/products/[id]/page.js
import Link from "next/link";

export default async function ProductDetailPage({ params }) {
  const { id } = await params; // URL က ID ကို ယူခြင်း

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-sm border mt-10">
        <Link
          href="/"
          className="text-green-700 hover:underline mb-6 inline-block"
        >
          ← ပင်မစာမျက်နှာသို့ ပြန်ရန်
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="w-full h-64 bg-green-50 rounded-2xl flex items-center justify-center text-green-700 font-bold text-lg">
            အသီးအနှံ ပုံကြီး
          </div>
          <div>
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              Organic
            </span>
            <h1 className="text-3xl font-bold text-green-800 mt-2">
              သီးနှံအမျိုးအစား {id}
            </h1>
            <p className="text-gray-600 mt-1">
              စိုက်ပျိုးသည့်ဒေသ - ရှမ်းပြည်တောင်ပိုင်း (အောင်ပန်း)
            </p>
            <p className="text-2xl font-extrabold text-orange-600 my-4">
              ၃၅၀၀ ကျပ် / ပိဿာ
            </p>

            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              ဤအသီးအနှံသည် ဒေသခံတောင်သူများမှ သဘာဝအတိုင်း စနစ်တကျ
              စိုက်ပျိုးထားခြင်း ဖြစ်ပါသည်။ ယခုပင် ခြံမှ တိုက်ရိုက်ဆွတ်ခူးပြီး
              ပို့ဆောင်ပေးမည် ဖြစ်ပါသည်။
            </p>

            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition">
              ခြင်းတောင်းထဲသို့ ထည့်မည်
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
