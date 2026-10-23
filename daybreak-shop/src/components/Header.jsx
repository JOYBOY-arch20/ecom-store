import { useCart } from "../context/CartContext.jsx";

export default function Header() {
  const { count, openCart } = useCart();

  return (
    <header className="sticky top-0 z-30 border-b border-fog bg-chalk/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="text-xl font-bold tracking-tight">
          Daybreak
        </a>
        <nav className="flex items-center gap-6 text-sm">
          <a href="#shop" className="hover:text-cobalt">
            Shop
          </a>
          <button
            onClick={openCart}
            className="rounded-full bg-ink px-4 py-2 font-medium text-chalk hover:bg-cobalt"
            aria-label={`Open cart, ${count} items`}
          >
            Cart ({count})
          </button>
        </nav>
      </div>
    </header>
  );
}
