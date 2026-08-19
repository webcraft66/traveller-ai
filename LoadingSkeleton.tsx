export default function LoadingSkeleton() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Generating your itinerary"
      className="mt-8 space-y-5"
    >
      <div className="rounded-2xl border border-mist-300 bg-white p-6 shadow-card sm:p-8">
        <div className="skeleton h-5 w-40 rounded-full" />
        <div className="skeleton mt-4 h-4 w-full rounded-full" />
        <div className="skeleton mt-2 h-4 w-5/6 rounded-full" />
      </div>

      {[1, 2].map((i) => (
        <div key={i} className="rounded-2xl border border-mist-300 bg-white p-6 shadow-card sm:p-8">
          <div className="flex items-center gap-3">
            <div className="skeleton h-10 w-10 shrink-0 rounded-full" />
            <div className="skeleton h-5 w-48 rounded-full" />
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((j) => (
              <div key={j}>
                <div className="skeleton h-3 w-16 rounded-full" />
                <div className="skeleton mt-2 h-3 w-full rounded-full" />
                <div className="skeleton mt-1.5 h-3 w-4/5 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
      <span className="sr-only">Generating your itinerary, please wait…</span>
    </div>
  );
}
