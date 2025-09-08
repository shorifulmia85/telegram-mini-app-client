/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/tg.ts
export function openInTelegramWebApp(url: string) {
  const tg = (window as any)?.Telegram?.WebApp;
  if (tg?.openLink) {
    // In-app browser, back returns to the bot/webapp
    tg.openLink(url, { try_instant_view: false });
  } else {
    // Fallback (e.g., local dev outside Telegram)
    window.open(url, "_self"); // বা "_blank"
  }
}
