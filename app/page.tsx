export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-8 py-24">
      <p className="label text-xs text-muted-soft">Portfolio · 2026 · Makassar, Indonesia</p>

      <h1 className="display mt-4 text-7xl font-semibold leading-none">Nadia</h1>
      <h2 className="display-italic text-6xl text-rose">Indriani Sumardi</h2>

      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
        Building models that listen, read, and see.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <span className="h-16 w-16 rounded-full bg-pink" />
        <span className="h-16 w-16 rounded-full bg-pink-soft" />
        <span className="h-16 w-16 rounded-full bg-pink-pale" />
        <span className="h-16 w-16 rounded-full bg-rose" />
        <span className="h-16 w-16 rounded-full bg-silver" />
        <span className="h-16 w-16 rounded-full bg-steel" />
        <span className="h-16 w-16 rounded-full bg-ink" />
      </div>
    </main>
  );
}