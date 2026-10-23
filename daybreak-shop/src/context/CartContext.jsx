import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const CartContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "add": {
      const found = state.find((i) => i.id === action.product.id);
      return found
        ? state.map((i) => (i.id === found.id ? { ...i, qty: i.qty + 1 } : i))
        : [...state, { ...action.product, qty: 1 }];
    }
    case "setQty":
      return state
        .map((i) => (i.id === action.id ? { ...i, qty: action.qty } : i))
        .filter((i) => i.qty > 0);
    case "remove":
      return state.filter((i) => i.id !== action.id);
    case "clear":
      return [];
    default:
      return state;
  }
}

function load() {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [], load);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch {
      /* storage unavailable */
    }
  }, [items]);

  const count = items.reduce((n, i) => n + i.qty, 0);
  const total = items.reduce((n, i) => n + i.qty * i.price, 0);

  const value = {
    items,
    count,
    total,
    open,
    openCart: () => setOpen(true),
    closeCart: () => setOpen(false),
    add: (product) => {
      dispatch({ type: "add", product });
      setOpen(true);
    },
    setQty: (id, qty) => dispatch({ type: "setQty", id, qty }),
    remove: (id) => dispatch({ type: "remove", id }),
    clear: () => dispatch({ type: "clear" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
