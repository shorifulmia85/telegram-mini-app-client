/* eslint-disable no-empty */
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThickIndicator from "../../ThikIndicator";
import { Button } from "../../ui/button";
import { Megaphone } from "lucide-react";
import { MonetagAds } from "../../ads/MonetagAds";
import toast from "react-hot-toast";
import {
  useGetAllSpinsQuery,
  useSpinAndWinMutation,
} from "../../../redux/features/spinApi/spinApi";
const WHEEL_RADIUS = 150;

// ---------- utils ----------
const toRadians = (angle: number) => angle * (Math.PI / 180);
const getCoordinates = (angle: number, radius: number) => ({
  x: radius * Math.cos(toRadians(angle)),
  y: radius * Math.sin(toRadians(angle)),
});
const genIdemKey = () =>
  window.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);

type ApiSpin = {
  value: string;
  coin: number;
  bgColor: string;
  textColor: string;
  segmentIndex: number;
  weight: number;
};

type Segment = {
  value: string;
  color: string; // from bgColor
  textColor: string;
  rotationOffset?: number;
  coin?: number;
  weight?: number;
  segmentIndex?: number;
};

type ResultDetails = {
  amount: number;
  base: number;
  bonus: number;
  time: string;
};

// 🔐 localStorage keys
const FREE_SPINS_MAX = 2;
const LS_KEY = "freeSpinsRemaining_v1";

export default function Wheel() {
  // wheel config
  const { data, isLoading, isError } = useGetAllSpinsQuery(undefined);

  // spin mutation (server-authoritative)
  const [spinAndWin, { isLoading: isSpinRequest }] = useSpinAndWinMutation();

  // UI / state
  const userInitiatedRef = useRef(false);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const [freeSpins, setFreeSpins] = useState<number>(FREE_SPINS_MAX);
  const [adShowing, setAdShowing] = useState(false);

  // keep server prize to show after animation
  const [serverPrize, setServerPrize] = useState<{
    value: string;
    coin: number;
    segmentIndex: number;
    balance?: number;
    lifeTimeBalance?: number;
  } | null>(null);

  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<ResultDetails | null>(null);

  // build segments from API
  useEffect(() => {
    if (!data?.data || !Array.isArray(data.data)) return;
    const apiSpins: ApiSpin[] = [...data.data].sort(
      (a, b) => (a.segmentIndex ?? 0) - (b.segmentIndex ?? 0)
    );
    const mapped: Segment[] = apiSpins.map((s) => ({
      value: s.value,
      color: s.bgColor,
      textColor: s.textColor,
      coin: s.coin,
      weight: s.weight,
      segmentIndex: s.segmentIndex,
    }));
    setSegments(mapped);
  }, [data]);

  // init localStorage free spins
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      const val = raw !== null ? parseInt(raw, 10) : NaN;
      if (!Number.isFinite(val) || val < 0 || val > FREE_SPINS_MAX) {
        localStorage.setItem(LS_KEY, String(FREE_SPINS_MAX));
        setFreeSpins(FREE_SPINS_MAX);
      } else {
        setFreeSpins(val);
      }
    } catch {
      setFreeSpins(FREE_SPINS_MAX);
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, String(freeSpins));
    } catch {}
  }, [freeSpins]);

  const isFreeMode = useMemo(() => freeSpins > 0, [freeSpins]);

  // geometry
  const numSegments = segments.length || 10;
  const SEGMENT_ANGLE = 360 / numSegments;

  // ▶️ MAIN click: free ⇒ call backend; else ⇒ show ad
  const handlePrimaryClick = async () => {
    if (isSpinning || adShowing || isSpinRequest) return;

    if (!isFreeMode) {
      await handleShowAd();
      return;
    }

    try {
      userInitiatedRef.current = true;
      setIsSpinning(true);

      // 1) server call with fresh idempotencyKey
      const idempotencyKey = genIdemKey();

      const resp = await spinAndWin({ idempotencyKey }).unwrap();
      // expected:
      // {
      //   success, message,
      //   data: {
      //     spinId, displayAngle, prize:{value,coin,segmentIndex},
      //     balance, lifeTimeBalance, createdAt
      //   }
      // }
      const payload = resp?.data;
      if (!payload) throw new Error("Invalid spin response");

      const { displayAngle, prize } = payload;
      setServerPrize({
        value: prize?.value,
        coin: prize?.coin,
        segmentIndex: prize?.segmentIndex,
        balance: payload?.balance,
        lifeTimeBalance: payload?.lifeTimeBalance,
      });

      // 2) animate to server angle (+ few full spins for drama)
      const fullSpins = 5 + Math.floor(Math.random() * 3); // 5–7
      const target = rotation + fullSpins * 360 + (displayAngle % 360);
      setRotation(target);
    } catch (e: any) {
      userInitiatedRef.current = false;
      setIsSpinning(false);
      toast.error(e?.data?.message || e?.message || "Spin failed");
    }
  };

  // ▶️ Ad → grant 1 free spin
  const handleShowAd = async () => {
    try {
      setAdShowing(true);
      toast.loading("Loading ad...", { id: "ad" });
      await MonetagAds("9657971");
      setFreeSpins((p) => Math.min(FREE_SPINS_MAX, p + 1));
      toast.success("Ad completed. You got 1 free spin!", { id: "ad" });
    } catch {
      toast.error("Ad not completed.", { id: "ad" });
    } finally {
      setAdShowing(false);
    }
  };

  // ▶️ animation end → show server prize (authoritative)
  const handleSpinComplete = () => {
    setIsSpinning(false);
    if (!userInitiatedRef.current) return;

    const amount =
      Number(serverPrize?.value ?? 0) || Number(serverPrize?.coin ?? 0) || 0;

    setResult({
      amount,
      base: amount,
      bonus: 0,
      time: new Date().toLocaleString(),
    });
    setShowResult(true);

    setFreeSpins((prev) => Math.max(0, prev - 1));

    userInitiatedRef.current = false;
    setServerPrize(null);
  };

  // loading / error state
  if (isLoading && segments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="text-sm opacity-70">Loading wheel…</div>
      </div>
    );
  }
  if (isError || segments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="text-sm text-red-500">Failed to load spin config.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-[350px] h-[350px] flex items-center justify-center">
        {/* spinning wheel ONLY */}
        <motion.div
          className="relative w-[265px] h-[265px] rounded-full flex items-center justify-center"
          style={{
            background: "#fff",
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            border: "10px solid #6457e4",
            outline: "5px solid #6457e4",
            outlineOffset: "-6px",
          }}
          initial={false}
          animate={{ rotate: rotation }}
          transition={{ duration: isSpinning ? 5 : 0 }}
          onAnimationComplete={handleSpinComplete}
        >
          <svg viewBox="-150 -150 300 300" className="w-full h-full">
            {segments.map((segment, index) => {
              const startAngle = index * SEGMENT_ANGLE;
              const p1 = getCoordinates(startAngle, WHEEL_RADIUS);
              const endAngle = (index + 1) * SEGMENT_ANGLE;
              const p2 = getCoordinates(endAngle, WHEEL_RADIUS);
              const gradientId = `gradient-${index}`;
              const gradientStyle = segment.color.startsWith("linear-gradient")
                ? segment.color.replace("linear-gradient(", "").replace(")", "")
                : "";

              const mid = getCoordinates(
                startAngle + SEGMENT_ANGLE / 2,
                WHEEL_RADIUS * 0.7
              );

              return (
                <g key={index}>
                  {segment.color.startsWith("linear-gradient") ? (
                    <defs>
                      <linearGradient
                        id={gradientId}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        {gradientStyle.split(", ").map((color, i, arr) => (
                          <stop
                            key={i}
                            offset={`${(i / (arr.length - 1)) * 100}%`}
                            stopColor={color}
                          />
                        ))}
                      </linearGradient>
                    </defs>
                  ) : null}
                  <path
                    d={`M 0 0 L ${p1.x} ${p1.y} A ${WHEEL_RADIUS} ${WHEEL_RADIUS} 0 0 1 ${p2.x} ${p2.y} Z`}
                    fill={
                      segment.color.startsWith("linear-gradient")
                        ? `url(#${gradientId})`
                        : segment.color
                    }
                    stroke="#ccc"
                    strokeWidth="1"
                  />
                  <text
                    x={mid.x}
                    y={mid.y}
                    fill={segment.textColor}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${
                      startAngle + SEGMENT_ANGLE / 2 + 90
                    }, ${mid.x}, ${mid.y})`}
                    fontSize="20"
                    fontWeight="bold"
                    className="font-sans"
                  >
                    {segment.value}
                  </text>
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* FIXED center indicator */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
          <ThickIndicator
            size="md"
            animated={false}
            ringColor="border-red-500"
            ringBg="bg-green-100"
          />
        </div>
      </div>

      {/* ▶️ Main Button */}
      <Button
        onClick={handlePrimaryClick}
        disabled={isSpinning || adShowing || isSpinRequest}
        className="px-5 py-4 font-bold rounded-full mt-4 shadow-lg shadow-indigo-500/30 bg-[var(--tma-secondary)] flex items-center gap-2"
      >
        {isSpinning ? (
          "Spinning..."
        ) : adShowing || isSpinRequest ? (
          "Loading…"
        ) : isFreeMode ? (
          <>Free Spin ({freeSpins} left)</>
        ) : (
          <>
            <Megaphone className="w-4 h-4" />
            Free spin
          </>
        )}
      </Button>

      {/* ✅ Result Modal */}
      <AnimatePresence>
        {showResult && result && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResult(false)}
            />
            <motion.div
              className="fixed z-[70] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-md"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
            >
              <div className="relative p-[1px] rounded-2xl bg-[linear-gradient(120deg,#06b6d4,#3b82f6,#8b5cf6,#ec4899,#f43f5e)] bg-[length:300%_300%] animate-gradient">
                <div className="relative rounded-2xl bg-[#0b1121]/90 backdrop-blur-xl text-white overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent)] pointer-events-none" />
                  <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:20px_20px] opacity-10 pointer-events-none" />
                  <div className="flex items-center justify-between px-5 pt-4">
                    <h3 className="text-lg font-semibold tracking-tight">
                      Congratulations
                    </h3>
                    <button
                      onClick={() => setShowResult(false)}
                      className="p-1.5 rounded-lg hover:bg-white/10 transition"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="px-5 pb-6 pt-3 text-center">
                    <div className="text-sm text-white/60">You earned</div>
                    <div className="mt-1 text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                      {result.amount}
                      <span className="ml-1 text-lg text-white/70 font-medium">
                        pts
                      </span>
                    </div>
                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() => setShowResult(false)}
                        className="flex-1 rounded-xl bg-[var(--tma-secondary)] hover:opacity-90 transition py-2.5 font-semibold"
                      >
                        Continue
                      </button>
                    </div>
                    {result.time && (
                      <div className="mt-3 text-xs text-white/50">
                        {result.time}
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
}
