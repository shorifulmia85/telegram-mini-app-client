// src/components/ads/GigaPub.ts
declare global {
  interface Window {
    showGiga?: () => Promise<void>;
  }
}

type Waiter = () => boolean;

function waitFor(cond: Waiter, timeoutMs = 8000, everyMs = 50) {
  return new Promise<void>((resolve, reject) => {
    const start = Date.now();
    const tick = () => {
      if (cond()) return resolve();
      if (Date.now() - start > timeoutMs)
        return reject(new Error("GigaPub API timeout"));
      setTimeout(tick, everyMs);
    };
    tick();
  });
}

const inflightBySrc: Record<string, Promise<void>> = {};

async function ensureScript(src: string) {
  if (typeof window === "undefined") return Promise.resolve();

  // already present
  if (document.querySelector(`script[src="${src}"]`)) return Promise.resolve();

  // in-flight cache
  // if (inflightBySrc[src]) return inflightBySrc[src];

  inflightBySrc[src] = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load GigaPub script"));
    document.head.appendChild(s); // ⬅️ head এ বসালাম
  });

  return inflightBySrc[src];
}

/** Back-end থেকে পাওয়া ID দিয়েই ad লোড+শো করবে */
export async function showGigaAd(adUnitId: string | number): Promise<void> {
  const id = String(adUnitId ?? "").trim();
  if (!id) throw new Error("GigaPub Ad ID missing");

  const src = `https://ad.gigapub.tech/script?id=${encodeURIComponent(id)}`;

  // 1) স্ক্রিপ্ট নিশ্চিতভাবে লোড করো
  await ensureScript(src);

  // 2) window.showGiga ready হওয়া পর্যন্ত অপেক্ষা করো
  await waitFor(() => typeof window.showGiga === "function");

  // 3) এখন শুধু ad দেখাও
  await window.showGiga!();
}
