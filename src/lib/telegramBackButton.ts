/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/telegramBackButton.ts

declare global {
  interface Window {
    Telegram: any;
  }
}

/**
 * Telegram BackButton setup utility
 */
export function setupTelegramBackButton() {
  const tg = window?.Telegram?.WebApp;
  if (!tg) return;

  tg.ready();
  tg.BackButton.show();

  tg.BackButton.onClick(() => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      tg.close();
    }
  });
}
