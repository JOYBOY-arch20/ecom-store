import Header from "./components/Header.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div id="top">
      <Header />
      <main>
        <section className="mx-auto max-w-6xl px-5 pb-6 pt-20">
          <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Gear and beans for a better first cup.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink/70">
            Small-batch coffee and the tools to brew it well at home. Ships in
            two days.
          </p>
          <a
            href="#shop"
            className="mt-8 inline-block rounded-full bg-cobalt px-6 py-3 font-medium text-white hover:bg-ink"
          >
            Shop all products
          </a>
        </section>
        <ProductGrid />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
