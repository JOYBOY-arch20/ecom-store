export default function Footer() {
  return (
    <footer className="border-t border-fog">
      <div className="mx-auto max-w-6xl px-5 py-8 text-sm text-ink/60">
        © {new Date().getFullYear()} Daybreak Coffee Supply. Free shipping on
        orders over $50.
      </div>
    </footer>
  );
}
