import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Bu yerda amoCRM API yoki backendga yuborasiz

    setTimeout(() => {
      alert("So'rovingiz yuborildi!");
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-900 p-6">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          Buyurtma qoldiring
        </h2>

        <p className="text-slate-500 mb-6">
          Ma'lumotlaringizni qoldiring, tez orada bog'lanamiz.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Ismingiz"
            required
            className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="tel"
            placeholder="+998 XX XXX XX XX"
            required
            className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            rows="4"
            placeholder="Xabaringiz..."
            className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            {loading ? "Yuborilmoqda..." : "Yuborish"}
          </button>
        </form>
      </div>
    </section>
  );
}