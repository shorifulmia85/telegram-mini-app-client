/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/BackButtonController.tsx

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    Telegram: any;
  }
}

export function BackButtonController() {
  const { pathname } = useLocation();

  useEffect(() => {
    const tg = window?.Telegram?.WebApp;
    if (!tg) return;

    tg.ready();

    // Root page হলে লুকাবে, অন্য রুটে দেখাবে
    if (pathname === "/") {
      tg.BackButton.hide();
    } else {
      tg.BackButton.show();
    }

    const onClick = () => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        tg.close();
      }
    };

    tg.BackButton.onClick(onClick);

    return () => {
      tg.BackButton.offClick(onClick);
    };
  }, [pathname]);

  return null;
}
