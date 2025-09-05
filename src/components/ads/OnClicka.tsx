// src/ads/onClicka.ts

const SDK_URL = "https://js.onclckvd.com/in-stream-ad-admanager/tma.js";

function loadScriptOnce(src: string, id: string) {
  return new Promise<void>((resolve, reject) => {
    if (document.getElementById(id)) return resolve();
    const s = document.createElement("script");
    s.id = id;
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load OnClickA TMA SDK"));
    document.head.appendChild(s);
  });
}

let showFn: null | (() => Promise<void>) = null;

/** Show OnClickA TMA Rewarded video */
export async function showOnClickaRewarded(spotId: number) {
  if (typeof window === "undefined") throw new Error("Browser only");

  // Telegram WebApp ready (optional, safe)
  const tg = window.Telegram?.WebApp;
  tg?.ready?.();

  // 1) SDK লোড
  if (!window.initCdTma) {
    await loadScriptOnce(SDK_URL, "onclicka-tma-sdk");
  }
  if (!window.initCdTma) throw new Error("TMA SDK not available");

  // 2) init (একবারই)
  if (!showFn) {
    showFn = await window.initCdTma({ id: spotId });
  }

  // 3) show
  await showFn();
}
