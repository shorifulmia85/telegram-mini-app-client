/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ChevronRight, Megaphone } from "lucide-react";
import { Button } from "../../ui/button";
import icon from "/src/assets/icons/coin.png";
import type { Task } from "./TmaTabs";
import { MonetagAds } from "../../ads/MonetagAds";
import { AdNetwork } from "../../../constants";
import toast from "react-hot-toast";
import { AdsGramAds } from "../../ads/AdsGram";
import { showOnClickaRewarded } from "../../ads/OnClicka";
import { useCompleteTaskMutation } from "../../../redux/features/completeTaskApi/completeTaskApi";
import { cn } from "../../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

/** ---------- tiny cooldown hook (per item, persisted) ---------- */
function useItemCooldown(itemId?: string, cooldownSecInput?: number) {
  const cd =
    typeof cooldownSecInput === "number" && cooldownSecInput > 0
      ? cooldownSecInput
      : 300; // default 5m
  const key = itemId ? `tma:adCooldown:${itemId}` : undefined;

  const readRemaining = () => {
    if (typeof window === "undefined" || !key) return 0;
    const last = Number(localStorage.getItem(key) || 0);
    if (!last) return 0;
    const elapsed = Math.floor((Date.now() - last) / 1000);
    return Math.max(0, cd - elapsed);
  };

  const [remaining, setRemaining] = useState<number>(readRemaining);

  useEffect(() => {
    if (remaining <= 0) return;
    const id = setInterval(() => setRemaining((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [remaining]);

  useEffect(() => {
    setRemaining(readRemaining());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId, cd]);

  const start = () => {
    if (typeof window === "undefined" || !key) return;
    localStorage.setItem(key, String(Date.now()));
    setRemaining(cd);
  };

  return { remaining, start, cooldownSec: cd };
}

function formatMMSS(total: number) {
  const m = Math.floor(total / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(total % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

// ✅ Telegram WebApp helper
function openInTelegramWebApp(url?: string) {
  if (!url) return;
  const tg = (window as any)?.Telegram?.WebApp;
  if (tg?.openLink) {
    tg.openLink(url, { try_instant_view: false });
  } else {
    // local dev fallback
    window.open(url, "_self");
  }
}

const VISIT_REQUIRED_SECONDS = 30;

const VisitCard = ({ item }: { item: Task }) => {
  const { remaining, start } = useItemCooldown(
    item?._id,
    (item as any)?.cooldownSec
  );

  const [completeTask] = useCompleteTaskMutation();

  // Modal + visit timer states
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [visitLeft, setVisitLeft] = useState<number>(0);
  const [, setVisitStartedAt] = useState<number | null>(null);

  // start a 30s countdown
  const beginVisitTimer = () => {
    setVisitStartedAt(Date.now());
    setVisitLeft(VISIT_REQUIRED_SECONDS);
  };

  // tick visit timer
  useEffect(() => {
    if (visitLeft <= 0) return;
    const id = setInterval(() => {
      setVisitLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [visitLeft]);

  const handleShow = async () => {
    if (!item?.adUnitId && !item?.link) {
      toast.error("Missing ad unit or link");
      return;
    }
    if (remaining > 0) {
      toast.error(`Please wait ${formatMMSS(remaining)}`);
      return;
    }

    try {
      // optional: show ad networks before opening link
      if (item?.adNetwork === AdNetwork.MONETAG) {
        await MonetagAds(item.adUnitId!);
      } else if (item?.adNetwork === AdNetwork.ADSGRAM) {
        await AdsGramAds();
      } else if (item?.adNetwork === AdNetwork.ONCLICKA) {
        await showOnClickaRewarded(6089319);
      }

      // open link inside Telegram in-app browser
      openInTelegramWebApp(item?.link);

      // show modal and start 30s timer
      setShowVisitModal(true);
      beginVisitTimer();
    } catch (e) {
      toast.error("Failed to open");
    }
  };

  // Claim handler (only after 30s)
  const handleClaim = async () => {
    if (visitLeft > 0) {
      toast.error("Task is not completed. Continue to visit.");
      return;
    }

    try {
      // Call the trigger once
      const res = await completeTask(item!._id as string).unwrap();

      if (res?.success) {
        toast.success("Balance added");
      }

      // start item cooldown
      start();

      // close modal & reset timer state
      setShowVisitModal(false);
      setVisitStartedAt(null);
    } catch (e) {
      // RTK Query unwrap throws on rejected responses
      toast.error("Failed to claim");
    }
  };

  const btnDisabled = (!item?.adUnitId && !item?.link) || remaining > 0;
  const btnLabel = remaining > 0 ? formatMMSS(remaining) : undefined;

  return (
    <div>
      <div className="flex items-center justify-between border border-white/20 bg-white/5 shadow-sm p-3 rounded-2xl">
        <div className="flex items-center gap-5">
          <Megaphone
            size={32}
            className="bg-[var(--tma-primary)] border rounded-md p-1"
          />
          <div>
            <h1 className="font-medium text-white/70">{item?.title}</h1>
            <div className="flex items-center gap-2">
              <img className="size-4" src={icon} alt="" />
              <p className="font-semibold text-[18px]">{item?.rewardCoin}</p>

              {remaining > 0 ? (
                <span className="ml-2 inline-flex items-center rounded-full bg-neutral-700 px-2 py-0.5 text-[10px] text-white">
                  Wait...
                </span>
              ) : (
                <span className="ml-2 inline-flex items-center rounded-full bg-emerald-800 px-2 py-0.5 text-[10px] text-white">
                  Ready
                </span>
              )}
            </div>
          </div>
        </div>

        <motion.div
          whileHover={btnDisabled ? undefined : { scale: 1.03, y: -1 }}
          whileTap={btnDisabled ? undefined : { scale: 0.97 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="relative"
        >
          <a
            href={item?.link}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-white/20 text-white inline-flex items-center justify-center px-5 py-3",
              btnDisabled
                ? "opacity-60 cursor-not-allowed pointer-events-none"
                : "hover:shadow-[0_10px_30px_rgba(99,102,241,.35)]"
            )}
            onClick={(e) => {
              e.preventDefault();
              if (btnDisabled) return;
              handleShow();
            }}
          >
            {/* BG effects */}
            <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(160px_80px_at_0%_0%,#a78bfa40_0%,transparent_60%),radial-gradient(160px_80px_at_100%_100%,#60a5fa40_0%,transparent_60%)] opacity-40 group-hover:opacity-60 transition-opacity" />
            <span className="pointer-events-none absolute -left-24 top-0 h-full w-24 rotate-12 bg-white/20 blur-xl transition-transform duration-700 group-hover:translate-x-[260%]" />
            <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/15 group-hover:ring-white/25 transition-all" />

            <span className="relative z-10 tabular-nums font-semibold">
              {btnLabel ? btnLabel : "Visit"}
            </span>
            {!btnLabel && (
              <ChevronRight className="relative z-10 size-5 ml-1" />
            )}
          </a>
        </motion.div>
      </div>

      {/* —— Visit Modal with 30s countdown —— */}
      <AnimatePresence>
        {showVisitModal && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowVisitModal(false)}
            />
            <motion.div
              className="fixed z-[70] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-sm"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <div className="relative rounded-2xl p-[1px] bg-[linear-gradient(120deg,#22d3ee,#3b82f6,#8b5cf6,#ec4899)] bg-[length:300%_300%] animate-[gradient_6s_ease_infinite] shadow-[0_8px_40px_rgba(56,189,248,.25)]">
                <div className="relative rounded-2xl bg-[#0f1324]/90 backdrop-blur-xl text-white overflow-hidden px-6 pt-6 pb-5">
                  {/* icon */}
                  <div className="mx-auto mb-2 grid place-items-center">
                    <div className="size-14 rounded-2xl bg-white/10 grid place-items-center border border-white/10">
                      <span className="text-lg font-black tracking-wider">
                        NEW
                      </span>
                    </div>
                  </div>

                  <p className="text-center text-[15px] font-semibold">
                    Go to page, tap 2 ads. Stay {VISIT_REQUIRED_SECONDS}s
                  </p>

                  {/* reward row */}
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <img src={icon} alt="" className="size-5" />
                    <span className="font-bold text-[18px]">
                      +{item?.rewardCoin} CATS
                    </span>
                  </div>

                  {/* countdown pill */}
                  <div className="mt-4 flex items-center justify-center">
                    <div className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm">
                      Time left:{" "}
                      <span className="font-semibold">
                        {formatMMSS(visitLeft)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <Button
                      onClick={handleClaim}
                      disabled={visitLeft > 0}
                      className={cn(
                        "w-full rounded-xl py-3 font-semibold",
                        visitLeft > 0
                          ? "opacity-60 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      )}
                    >
                      {visitLeft > 0 ? "Visit in progress…" : "Claim"}
                    </Button>
                    {visitLeft > 0 && (
                      <div className="mt-2 text-center text-xs text-white/70">
                        Task is not completed — continue to visit
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VisitCard;
