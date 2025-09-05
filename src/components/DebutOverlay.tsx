/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/DebugOverlay.tsx
import { useEffect, useRef, useState } from "react";

type Label = "LOG" | "WRN" | "ERR";

type DebugAPI = {
  push: (msg: any, label?: Label) => void;
  clear: () => void;
  enabled: () => boolean;
};

declare global {
  interface Window {
    __debug?: DebugAPI;
  }
}

const isEnabled = () => {
  if (typeof window === "undefined") return false;
  const sp = new URLSearchParams(window.location.search);
  return sp.get("debug") === "1";
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fmt = (v: any) => {
  try {
    if (typeof v === "string") return v;
    return JSON.stringify(v, null, 2);
  } catch {
    return String(v);
  }
};

export default function DebugOverlay() {
  const [logs, setLogs] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(isEnabled());
  const mounted = useRef(false);

  // render ফেজে setState না করার জন্য enqueue helper
  const enqueue = (updater: (prev: string[]) => string[]) => {
    // React render সম্পূর্ণ হওয়ার পর state আপডেট হবে
    if (typeof queueMicrotask === "function") {
      queueMicrotask(() => mounted.current && setLogs(updater));
    } else {
      requestAnimationFrame(() => mounted.current && setLogs(updater));
    }
  };

  useEffect(() => {
    if (!isEnabled()) return; // ডিফল্টে অফ

    mounted.current = true;
    setOpen(true);

    // আসল console methods সংরক্ষণ
    const olog = console.log;
    const owarn = console.warn;
    const oerror = console.error;

    // overlay-তে log যোগ করার ফাংশন
    const push = (label: Label, args: any[]) => {
      const ts = new Date().toLocaleTimeString();
      const joined = args.length === 1 ? fmt(args[0]) : args.map(fmt).join(" ");
      enqueue((prev) => [`[${ts}] ${label}: ${joined}`, ...prev].slice(0, 200));
    };

    // console override: UI-তে দেখাও + আসলটাও চালাও
    console.log = (...a: any[]) => {
      push("LOG", a);
      olog(...a);
    };
    console.warn = (...a: any[]) => {
      push("WRN", a);
      owarn(...a);
    };
    console.error = (...a: any[]) => {
      push("ERR", a);
      oerror(...a);
    };

    // গ্লোবাল ডিবাগ API
    const api: DebugAPI = {
      push: (msg: any, label: Label = "LOG") => push(label, [msg]),
      clear: () => enqueue(() => []),
      enabled: isEnabled,
    };
    window.__debug = api;

    return () => {
      // cleanup
      console.log = olog;
      console.warn = owarn;
      console.error = oerror;
      if (window.__debug === api) delete window.__debug;
      mounted.current = false;
    };
  }, []);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 10,
        left: 10,
        right: 10,
        maxHeight: "45vh",
        zIndex: 999999,
      }}
      className="pointer-events-none"
    >
      <div className="pointer-events-auto rounded-2xl border border-white/15 bg-black/70 text-white shadow-xl backdrop-blur p-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="text-xs opacity-80">
            DebugOverlay (use <code>?debug=1</code>)
          </div>
          <div className="flex gap-2">
            <button
              className="px-2 py-1 text-xs rounded bg-white/10 hover:bg-white/20"
              onClick={() => enqueue(() => [])}
            >
              Clear
            </button>
            <button
              className="px-2 py-1 text-xs rounded bg-white/10 hover:bg-white/20"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>

        <div
          style={{ fontSize: 12, lineHeight: "18px" }}
          className="max-h-[35vh] overflow-auto space-y-1 pr-1"
        >
          {logs.length === 0 ? (
            <div className="opacity-60">No logs yet…</div>
          ) : (
            logs.map((l, i) => (
              <div
                key={i}
                className="whitespace-pre-wrap font-mono bg-white/5 rounded p-2"
              >
                {l}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
