import { useCart } from "../context/CartContext.jsx";
import { formatPrice } from "../utils/format.js";

export default function ProductCard({ product }) {
  const { add } = useCart();

  return (
    <article className="flex flex-col">
      <div
        className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl"
        style={{ backgroundColor: product.tint }}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-6xl" aria-hidden="true">
            {product.emoji}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <h3 className="font-medium">{product.name}</h3>
        <p className="font-medium">{formatPrice(product.price)}</p>
      </div>
      <p className="mt-1 text-sm text-ink/60">{product.blurb}</p>

      <button
        onClick={() => add(product)}
        className="mt-4 rounded-full border border-ink px-4 py-2 text-sm font-medium transition hover:bg-ink hover:text-chalk"
      >
        Add to cart
      </button>
    </article>
  );
}
