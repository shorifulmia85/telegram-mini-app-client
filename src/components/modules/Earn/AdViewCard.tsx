/* eslint-disable react-hooks/exhaustive-deps */
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
import { motion } from "framer-motion";
import { showGigaAd } from "../../ads/GigaPub";
import useSuccessModalStore from "../../../hooks/useSuccessModalStore";

// ⏳ Cooldown hook
function useItemCooldown(itemId?: string, cooldownSecInput?: number) {
  const cd =
    typeof cooldownSecInput === "number" && cooldownSecInput > 0
      ? cooldownSecInput
      : 20;

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
  }, [itemId, cd]);

  const start = () => {
    if (typeof window === "undefined" || !key) return;
    localStorage.setItem(key, String(Date.now()));
    setRemaining(cd);
  };

  return { remaining, start, cooldownSec: cd };
}

// ⏱️ Time formatting
function formatMMSS(total: number) {
  const m = Math.floor(total / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(total % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

const AdViewCard = ({ item }: { item: Task }) => {
  const { remaining, start } = useItemCooldown(item?._id, 20);
  const [completeTask] = useCompleteTaskMutation();

  const isLimitReached = item.completedCount >= item.perUserCap;
  const btnDisabled = !item?.adUnitId || remaining > 0 || isLimitReached;
  const btnLabel = isLimitReached
    ? "Complete"
    : remaining > 0
    ? formatMMSS(remaining)
    : "View";

  const handleShow = async () => {
    if (!item?.adUnitId) return toast.error("Ad unit missing");
    if (remaining > 0)
      return toast.error(`Please wait ${formatMMSS(remaining)}`);
    if (isLimitReached) return toast.error("You’ve reached today’s limit");

    try {
      // === MONETAG ===
      if (item?.adNetwork === AdNetwork.MONETAG) {
        await MonetagAds(item.adUnitId);
        const res = await completeTask(item._id).unwrap();
        if (res?.success) {
          start();
          useSuccessModalStore.getState().showModal(item.rewardCoin);
        }
      }

      // === ADSGRAM ===
      else if (item?.adNetwork === AdNetwork.ADSGRAM) {
        await AdsGramAds();
        const res = await completeTask(item._id).unwrap();
        if (res?.success) {
          start();
          useSuccessModalStore.getState().showModal(item.rewardCoin);
        }
      }

      // === ONCLICKA ===
      else if (item?.adNetwork === AdNetwork.ONCLICKA) {
        await showOnClickaRewarded(6089319);
        const res = await completeTask(item._id).unwrap();
        if (res?.success) {
          start();
          useSuccessModalStore.getState().showModal(item.rewardCoin);
        }
      }

      // === GIGAPUB ===
      else if (item?.adNetwork === AdNetwork.GIGAPUB) {
        await showGigaAd(item?.adUnitId);
        const res = await completeTask(item._id).unwrap();
        if (res?.success) {
          start();
          useSuccessModalStore.getState().showModal(item.rewardCoin);
        }
      }
    } catch (e: any) {
      toast.error(e?.data?.message || "Failed to complete task");
    }
  };

  return (
    <div>
      <div
        className={cn(
          "flex items-center justify-between  bg-[#1b2048] shadow-sm p-3 rounded-2xl transition",
          isLimitReached && "opacity-60"
        )}
      >
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

              {/* Status badge */}
              {isLimitReached ? (
                <span className="ml-2 inline-flex items-center rounded-full bg-gray-700 px-2 py-0.5 text-[10px] text-white">
                  Done
                </span>
              ) : remaining > 0 ? (
                <span className="ml-2 inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                  Wait...
                </span>
              ) : (
                <span className="ml-2 inline-flex items-center rounded-full bg-emerald-800 px-2 py-0.5 text-[10px] text-white">
                  Ready
                </span>
              )}

              <p className="ml-2 text-xs text-white/70">
                {item?.completedCount}/{item?.perUserCap}
              </p>
            </div>
          </div>
        </div>

        {/* View Button */}
        <motion.div
          whileHover={!btnDisabled ? { scale: 1.03, y: -1 } : undefined}
          whileTap={!btnDisabled ? { scale: 0.97 } : undefined}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="relative"
        >
          <Button
            size="lg"
            onClick={handleShow}
            disabled={btnDisabled}
            className={cn(
              "group relative overflow-hidden rounded-2xl text-white",
              btnDisabled
                ? "opacity-60 cursor-not-allowed"
                : "hover:shadow-[0_10px_30px_rgba(99,102,241,.35)]"
            )}
          >
            <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(160px_80px_at_0%_0%,#a78bfa40_0%,transparent_60%),radial-gradient(160px_80px_at_100%_100%,#60a5fa40_0%,transparent_60%)] opacity-40 group-hover:opacity-60 transition-opacity" />
            <span className="pointer-events-none absolute -left-24 top-0 h-full w-24 rotate-12 bg-white/20 blur-xl transition-transform duration-700 group-hover:translate-x-[260%]" />
            <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/15 group-hover:ring-white/25 transition-all" />
            <span className="relative z-10 tabular-nums font-semibold">
              {btnLabel}
            </span>
            {!isLimitReached && !btnLabel.includes(":") && (
              <ChevronRight className="relative z-10 size-5" />
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default AdViewCard;
