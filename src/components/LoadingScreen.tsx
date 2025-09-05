export function LoadingScreen() {
  return (
    <div className="min-h-dvh grid place-items-center bg-black/90 text-white">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        <p className="text-sm opacity-80">Loading…</p>
      </div>
    </div>
  );
}
