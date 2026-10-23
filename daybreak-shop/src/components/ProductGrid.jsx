import { useState } from "react";
import { categories, products } from "../data/products.js";
import ProductCard from "./ProductCard.jsx";

export default function ProductGrid() {
  const [category, setCategory] = useState("All");
  const visible =
    category === "All"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <section id="shop" className="mx-auto max-w-6xl px-5 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Shop</h2>
        <div
          className="flex gap-2"
          role="group"
          aria-label="Filter by category"
        >
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`rounded-full px-4 py-1.5 text-sm ${
                category === c
                  ? "bg-cobalt text-white"
                  : "bg-fog hover:bg-fog/60"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {visible.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
