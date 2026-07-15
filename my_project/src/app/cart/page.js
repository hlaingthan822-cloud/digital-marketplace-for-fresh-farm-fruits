// src/app/cart/page.js
import Link from "next/link";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="text-green-700 hover:underline mb-6 inline-block"
        >
          ← ဝယ်ယူမှု ဆက်လုပ်ရန်
        </Link>
        <h1 className="text-3xl font-bold text-green-800 mb-8">
          သင့်ခြင်းတောင်း 🛒
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ဝယ်ယူထားသည့် စာရင်း */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border">
              <div>
                <h3 className="font-bold text-green-800">
                  ပြင်ဦးလွင် စတော်ဘယ်ရီ
                </h3>
                <p className="text-gray-500 text-sm">၅၀၀၀ ကျပ် / ပိဿာ</p>
              </div>
              <p className="font-bold text-orange-600">၅၀၀၀ ကျပ်</p>
            </div>
          </div>

          {/* ငွေချေရန် ဖောင် */}
          <div className="bg-white p-6 rounded-2xl border h-fit">
            <h3 className="text-lg font-bold text-green-800 mb-4">
              မှာယူသူ အချက်အလက်
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="အမည်"
                className="w-full p-2.5 border rounded-lg text-sm"
              />
              <input
                type="text"
                placeholder="ဖုန်းနံပါတ်"
                className="w-full p-2.5 border rounded-lg text-sm"
              />
              <textarea
                placeholder="ပို့ဆောင်ရမည့် လိပ်စာ"
                className="w-full p-2.5 border rounded-lg text-sm h-20"
              ></textarea>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold text-sm transition">
                မှာယူမှုကို အတည်ပြုမည်
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
