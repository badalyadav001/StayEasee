"use client";
import { useState } from "react";

const testimonials = [
  { name: "Rahul Sharma", text: "Best stay ever! Everything was perfect.", rating: 5 },
  { name: "Anjali Verma", text: "Super clean rooms and amazing service.", rating: 4 },
  { name: "Amit Patel", text: "Felt like a 5-star experience at great price.", rating: 5 },
  { name: "Sneha Kapoor", text: "Loved the ambience and comfort!", rating: 5 },
  { name: "Rohit Mehta", text: "Very smooth booking experience.", rating: 4 },
  { name: "Priya Singh", text: "Highly recommended for couples!", rating: 5 },
  { name: "Karan Malhotra", text: "Rooms were exactly as shown.", rating: 4 },
  { name: "Neha Gupta", text: "Amazing hospitality and support.", rating: 5 },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index < testimonials.length - 3) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <section className="py-20 bg-white">
      <h2 className="text-3xl font-bold text-center mb-12">
        What Our Guests Say
      </h2>

      <div className="relative max-w-6xl mx-auto px-6">

        {/* ⬅️ LEFT BUTTON */}
        <button
          onClick={prev}
          className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white border shadow-md w-11 h-11 rounded-full flex items-center justify-center z-10 transition hover:scale-110 hover:bg-gray-100 active:scale-95"
        >
          <span className="text-xl font-bold">‹</span>
        </button>

        {/* ➡️ RIGHT BUTTON */}
        <button
          onClick={next}
          className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white border shadow-md w-11 h-11 rounded-full flex items-center justify-center z-10 transition hover:scale-110 hover:bg-gray-100 active:scale-95"
        >
          <span className="text-xl font-bold">›</span>
        </button>

        {/* SLIDER */}
        <div className="overflow-hidden">
          <div
            className="flex gap-8 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${index * 33.33}%)` }}
          >
            {testimonials.map((item, i) => (
              <div
                key={i}
                className="min-w-[33.33%] bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-xl transition duration-300"
              >
                {/* ⭐ Rating */}
                <div className="mb-3 text-yellow-500 text-lg">
                  {"★".repeat(item.rating)}
                </div>

                {/* TEXT */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  "{item.text}"
                </p>

                {/* NAME */}
                <h4 className="font-semibold text-gray-800">
                  {item.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}