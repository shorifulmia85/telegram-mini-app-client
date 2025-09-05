// src/types/telegram.d.ts

export {};

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  is_premium?: boolean;
  photo_url?: string;
}

interface InitDataUnsafe {
  user?: TelegramUser;
  auth_date?: number;
  query_id?: string;
}

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: InitDataUnsafe;
  ready: () => void;
}

declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
    // ⬇️ OnClickA TMA SDK এর গ্লোবাল ফাংশন
    initCdTma?: (args: { id: number }) => Promise<() => Promise<void>>;
  }
}
