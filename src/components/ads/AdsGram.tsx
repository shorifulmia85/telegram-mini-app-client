/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/adsgram.ts
declare global {
  interface Window {
    Adsgram?: any; // SDK global
  }
}

// Interstitial দেখানো
export async function AdsGramAds(blockId = "int-13980") {
  const sdk = window.Adsgram;
  if (!sdk) throw new Error("Adsgram SDK not loaded");

  // SDK’র দুইটা কমন শেপ কভার করলাম
  const controller =
    typeof sdk.init === "function"
      ? sdk.init({ blockId }) // shape 1: Adsgram.init({ blockId })
      : sdk.AdController
      ? new sdk.AdController(blockId) // shape 2: new Adsgram.AdController(blockId)
      : null;

  if (!controller || typeof controller.show !== "function") {
    throw new Error("Unsupported Adsgram SDK shape");
  }

  // ad দেখান
  return controller.show();
}
