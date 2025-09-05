/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";

import { LoadingScreen } from "../components/LoadingScreen";
import { RequireTelegramScreen } from "../components/TelegramRequirementScreen";
import { UnauthorizedScreen } from "../components/UnAuthorizedScreen";
import {
  useGetMeQuery,
  useRegisterOrLoginMutation,
} from "../redux/features/authApi/authApi";
import type { TUser } from "../types";

declare global {
  interface Window {
    Telegram: any;
  }
}

type GuardProps = PropsWithChildren<{ allowRole?: TUser }>;

const AuthGuard = ({ children, allowRole }: GuardProps) => {
  const tg = useMemo(
    () =>
      typeof window !== "undefined" ? window.Telegram?.WebApp ?? null : null,
    []
  );
  const insideTelegram = !!tg && !!tg.initData;

  const [registerOrLogin] = useRegisterOrLoginMutation();

  // 1) Bootstrap: Telegram UI + register/login (best-effort)
  const [booting, setBooting] = useState(true);
  const attemptedLoginRef = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        if (!tg) return; // Telegram নেই
        tg.ready?.();
        tg.expand?.();
        tg.setHeaderColor?.("#0F2230");
        tg.setBackgroundColor?.("#0F2230");

        const initData: string | undefined = tg.initData;
        if (initData && !attemptedLoginRef.current) {
          attemptedLoginRef.current = true;
          try {
            await registerOrLogin({ initData }).unwrap();
          } catch (err) {
            // fail silently; নিচে /me পোল করে নিব
            console.error("registerOrLogin failed:", err);
          }
        }
      } finally {
        setBooting(false);
      }
    })();
  }, [tg, registerOrLogin]);

  // 2) /me — bootstrap শেষ না হওয়া পর্যন্ত স্কিপ
  const { data, isFetching, isLoading, refetch } = useGetMeQuery(undefined, {
    skip: booting,
  });

  const role = (data?.data?.role as TUser | undefined) ?? undefined;
  const tgId = data?.data?.tgId as string | undefined;

  // 3) Telegram context থাকলে ইউজার না আসা পর্যন্ত পোলিং চালু রাখুন
  useEffect(() => {
    if (booting || !insideTelegram) return;

    let cancelled = false;
    let timer: any;

    const tick = async () => {
      if (cancelled) return;
      // ইউজার এলে থামুন
      if (tgId) return;
      const res = await refetch();
      const freshTgId = (res.data as any)?.data?.tgId as string | undefined;
      if (freshTgId || cancelled) return;
      // 300ms পর আবার চেষ্টা
      timer = setTimeout(tick, 300);
    };

    // প্রথম কল
    tick();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [booting, insideTelegram, tgId, refetch]);

  // 4) Render rules
  // 👉 Telegram + initData থাকলে ইউজার না আসা পর্যন্ত সবসময় Loading
  if (booting || isLoading || isFetching || (insideTelegram && !tgId)) {
    return <LoadingScreen />;
  }

  // 👉 Telegram context-ই নেই → সত্যিই রিকোয়ার্ড
  if (!insideTelegram) {
    return <RequireTelegramScreen onRetry={() => location.reload()} />;
  }

  // 👉 Role check
  if (allowRole) {
    const normalize = (v: unknown) => String(v ?? "").toLowerCase();
    if (normalize(role) !== normalize(allowRole)) {
      return <UnauthorizedScreen required={[allowRole]} current={role} />;
    }
  }

  return <>{children}</>;
};

export default AuthGuard;
