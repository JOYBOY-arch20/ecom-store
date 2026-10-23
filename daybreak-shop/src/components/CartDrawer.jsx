import { useEffect } from "react";
import { useCart } from "../context/CartContext.jsx";
import { formatPrice } from "../utils/format.js";

export default function CartDrawer() {
  const { items, total, open, closeCart, setQty, remove, clear } = useCart();

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeCart();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeCart]);

  const checkout = () => {
    // Replace with Stripe Checkout, Shopify, or your own API call.
    alert(
      `Order total: ${formatPrice(total)}. Connect a payment provider to finish checkout.`,
    );
    clear();
    closeCart();
  };

  return (
    <>
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-40 bg-ink/40 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-chalk shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-fog px-5 py-4">
          <h2 className="text-lg font-bold">Your cart</h2>
          <button onClick={closeCart} className="text-sm hover:text-cobalt">
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="mt-10 text-center text-ink/60">
              Your cart is empty. Add something from the shop.
            </p>
          ) : (
            <ul className="divide-y divide-fog">
              {items.map((i) => (
                <li key={i.id} className="flex gap-4 py-4">
                  <div
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-2xl"
                    style={{ backgroundColor: i.tint }}
                  >
                    {i.image ? (
                      <img
                        src={i.image}
                        alt=""
                        className="h-full w-full rounded-xl object-cover"
                      />
                    ) : (
                      i.emoji
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{i.name}</p>
                    <p className="text-sm text-ink/60">
                      {formatPrice(i.price)}
                    </p>
                    <div className="mt-2 flex items-center gap-3 text-sm">
                      <button
                        onClick={() => setQty(i.id, i.qty - 1)}
                        className="h-7 w-7 rounded-full border border-ink/30 hover:bg-fog"
                        aria-label={`Decrease ${i.name}`}
                      >
                        −
                      </button>
                      <span>{i.qty}</span>
                      <button
                        onClick={() => setQty(i.id, i.qty + 1)}
                        className="h-7 w-7 rounded-full border border-ink/30 hover:bg-fog"
                        aria-label={`Increase ${i.name}`}
                      >
                        +
                      </button>
                      <button
                        onClick={() => remove(i.id)}
                        className="ml-auto text-ink/60 hover:text-cobalt"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-fog px-5 py-4">
          <div className="mb-4 flex justify-between font-medium">
            <span>Subtotal</span>
            <span>{formatPrice(total)}</span>
          </div>
          <button
            onClick={checkout}
            disabled={items.length === 0}
            className="w-full rounded-full bg-cobalt py-3 font-medium text-white hover:bg-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            Check out
          </button>
        </div>
      </aside>
    </>
  );
}
