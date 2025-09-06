// src/components/TmaTabs.tsx
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useGetAllTaskQuery } from "../../../redux/features/taskApi/taskApi";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import AdViewCard from "./AdViewCard";
import VisitCard from "./VisitCard";

export interface Task {
  _id: string;
  title: string;
  type: string; // e.g., "VIEW"
  adNetwork: string; // e.g., "ONCLICKA"
  adUnitId: string | undefined; // e.g., "6089319"
  rewardCoin: number;
  cooldownSec: number;
  perUserCap: number;
  status: string;
  completedCount: number;
  link?: string;
  createdAt: string;
  updatedAt: string;
}

export default function TmaTabs() {
  const { data, isLoading } = useGetAllTaskQuery(undefined);
  const viewAds: Task[] | undefined = data?.data?.filter(
    (item: Task) => item.type === "VIEW"
  );
  const visitAds: Task[] | undefined = data?.data?.filter(
    (item: Task) => item.type === "VISIT"
  );

  // default to View Ads
  const [tab, setTab] = useState("tab-2");

  // ----- active indicator calculation -----
  const listRef = useRef<HTMLDivElement | null>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  const updateIndicator = () => {
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector<HTMLElement>("[data-state='active']");
    if (!active) return;
    const rect = active.getBoundingClientRect();
    const parentRect = list.getBoundingClientRect();
    setIndicator({ left: rect.left - parentRect.left, width: rect.width });
  };

  useLayoutEffect(() => {
    // wait a frame so Tabs can lay out
    const id = requestAnimationFrame(updateIndicator);
    return () => cancelAnimationFrame(id);
  }, [tab, isLoading, viewAds?.length, visitAds?.length]);

  useEffect(() => {
    const onResize = () => updateIndicator();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ----- animations -----
  const listVariants: Variants = {
    hidden: { opacity: 1 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };

  const itemVariants: Variants = {
    hidden: { y: 8, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 500, damping: 30, mass: 0.6 },
    },
  };

  const panelVariants: Variants = {
    initial: { y: 8, opacity: 0 },
    enter: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 400, damping: 30 },
    },
    exit: { y: -8, opacity: 0, transition: { duration: 0.18 } },
  };

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      {/* Tab list + sliding active pill */}
      <div className="relative w-full">
        <TabsList
          ref={listRef}
          className="relative w-full overflow-x-auto no-scrollbar rounded-md border border-gray-50/20 bg-black/10"
        >
          {/* Sliding active pill */}
          <motion.div
            layout
            layoutId="tabActivePill"
            className=" pointer-events-none absolute top-0 h-full rounded-md  bg-[#1d5bea]"
            animate={{ left: indicator.left, width: indicator.width }}
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 32,
              mass: 0.35,
            }}
          />

          <AnimatedTrigger value="tab-1" current={tab} label="Join Bonus" />
          <AnimatedTrigger value="tab-2" current={tab} label="View Ads" />
          <AnimatedTrigger value="tab-3" current={tab} label="Web Visit" />
        </TabsList>

        {/* (Optional) underline under the triggers */}
        <motion.span
          className="pointer-events-none absolute bottom-0 h-[2px] rounded bg-primary"
          animate={{ left: indicator.left, width: indicator.width }}
          transition={{
            type: "spring",
            stiffness: 420,
            damping: 32,
            mass: 0.35,
          }}
        />
      </div>

      {/* Tab panels with enter/exit */}
      <AnimatePresence mode="wait">
        {tab === "tab-1" && (
          <motion.div
            key="tab-1"
            variants={panelVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <TabsContent value="tab-1">
              <p className="p-4 text-center text-muted-foreground">
                Coming soon
              </p>
            </TabsContent>
          </motion.div>
        )}

        {tab === "tab-2" && (
          <motion.div
            key="tab-2"
            variants={panelVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <TabsContent value="tab-2" className="w-full">
              <motion.div
                className="mt-3 grid w-full grid-cols-1 gap-2 [&>*]:col-span-1 [&>*]:w-full [&>*]:max-w-none"
                variants={listVariants}
                initial="hidden"
                animate="show"
              >
                {isLoading &&
                  Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                      key={`sk-${i}`}
                      variants={itemVariants}
                      className="h-24 w-full animate-pulse rounded-2xl border border-white/10 bg-white/5"
                    />
                  ))}

                {!isLoading && (viewAds?.length ?? 0) === 0 && (
                  <motion.div
                    variants={itemVariants}
                    className="p-4 text-center text-muted-foreground"
                  >
                    No view tasks available right now.
                  </motion.div>
                )}

                {!isLoading &&
                  viewAds?.map((item: Task) => (
                    <motion.div key={item._id} variants={itemVariants}>
                      <AdViewCard item={item} />
                    </motion.div>
                  ))}
              </motion.div>
            </TabsContent>
          </motion.div>
        )}
        {tab === "tab-3" && (
          <motion.div
            key="tab-3"
            variants={panelVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <TabsContent value="tab-3" className="w-full ">
              <motion.div
                className="mt-3 grid w-full grid-cols-1 gap-2 [&>*]:col-span-1 [&>*]:w-full [&>*]:max-w-none"
                variants={listVariants}
                initial="hidden"
                animate="show"
              >
                {isLoading &&
                  Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                      key={`sk-${i}`}
                      variants={itemVariants}
                      className="h-24 w-full animate-pulse rounded-2xl border border-white/10 bg-white/5"
                    />
                  ))}

                {!isLoading && (visitAds?.length ?? 0) === 0 && (
                  <motion.div
                    variants={itemVariants}
                    className="p-4 text-center text-muted-foreground"
                  >
                    No visit tasks available right now.
                  </motion.div>
                )}

                {!isLoading &&
                  visitAds?.map((item: Task) => (
                    <motion.div key={item._id} variants={itemVariants}>
                      <VisitCard item={item} />
                    </motion.div>
                  ))}
              </motion.div>
            </TabsContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Tabs>
  );
}

/** Animated trigger: color changes based on active */
function AnimatedTrigger({
  value,
  current,
  label,
}: {
  value: string;
  current: string;
  label: string;
}) {
  const isActive = current === value;
  return (
    <TabsTrigger
      value={value}
      className={`relative z-[1] w-full rounded-md px-3 py-2 text-center transition-colors
        ${isActive ? "text-white" : "text-white/70 hover:text-white"}`}
    >
      {label}
    </TabsTrigger>
  );
}
