// app/page.js
export default function HomePage() {
  const fruits = [
    {
      id: 1,
      name: "ပြင်ဦးလွင် စတော်ဘယ်ရီ",
      price: "၅၀၀၀",
      farmer: "ဒေါ်လှ (ပြင်ဦးလွင်)",
    },
    {
      id: 2,
      name: "ရှမ်းရိုးရာ လิမ္မော်သီး",
      price: "၃၀၀၀",
      farmer: "စိုင်းဆိုင် (ရှမ်း)",
    },
    {
      id: 3,
      name: "အောင်ပန်း အာလူး",
      price: "၁၅၀၀",
      farmer: "ဦးလှ (အောင်ပန်း)",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-green-700">
          ချိတ်ဆက်ဈေးကွက်
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Digital Marketplace for Fresh Farm Fruits
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {fruits.map((fruit) => (
          <div
            key={fruit.id}
            className="border rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition"
          >
            <div className="w-full h-40 bg-green-50 rounded-lg mb-4 flex items-center justify-center text-green-700 font-bold">
              လတ်ဆတ်သော အသီးအနှံပုံ
            </div>
            <h3 className="font-bold text-xl text-green-800">{fruit.name}</h3>
            <p className="text-gray-600 text-sm mt-1">
              တောင်သူ - {fruit.farmer}
            </p>
            <p className="font-bold mt-3 text-orange-600 text-lg">
              {fruit.price} ကျပ် / ပိဿာ
            </p>
            <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium transition">
              ခြင်းတောင်းထဲထည့်မည်
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
