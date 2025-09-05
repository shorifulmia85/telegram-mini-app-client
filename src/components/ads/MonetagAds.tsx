/* eslint-disable @typescript-eslint/no-explicit-any */
/* lib/monetagAds.ts */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function MonetagAds(idOrName: string): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("window is not available (SSR)"));
  }
  const name = idOrName.startsWith("show_") ? idOrName : `show_${idOrName}`;
  const fn = (window as any)[name];

  if (typeof fn !== "function") {
    console.warn(`Monetag function ${name} পাওয়া যায়নি`);
    return Promise.reject(new Error("Ad function missing"));
  }

  // Monetag সাধারণত Promise রিটার্ন করে; না করলে resolve করে দেই
  const out = fn();
  return out && typeof out.then === "function" ? out : Promise.resolve();
}
