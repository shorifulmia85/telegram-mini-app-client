// BottomNavigation.tsx
import * as React from "react";
import { Pickaxe, Users, Wallet, Home, Trophy } from "lucide-react";
import { cn } from "../../lib/utils";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

interface NavItem {
  name: string;
  icon: React.ElementType;
  href: string;
}

const navigation: NavItem[] = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Earn", icon: Pickaxe, href: "/earn" },
  { name: "Leaderboard", icon: Trophy, href: "/leaderboard" },
  { name: "Refer", icon: Users, href: "/refer" },
  { name: "Wallet", icon: Wallet, href: "/wallet" },
];

export function BottomNavigation() {
  const { pathname } = useLocation();

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 mb-5 px-4 md:hidden">
      <motion.nav
        initial={{ y: 32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="mx-auto flex h-20 tma-bottom-nav rounded-2xl px-2 shadow-lg backdrop-blur"
      >
        {navigation.map((item) => {
          // nested route support: "/" exact, others prefix match
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "relative group flex flex-1 items-center justify-center rounded-md",
                "text-xs font-medium"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {/* sliding highlight */}
              {isActive && (
                <motion.span
                  layoutId="navActive"
                  className="absolute inset-0 rounded-md bg-white/10"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                    mass: 0.8,
                  }}
                />
              )}

              {/* icon + label (animated) */}
              <motion.div
                initial={false}
                animate={{
                  y: isActive ? -2 : 0,
                  scale: isActive ? 1.08 : 1,
                }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="relative z-[1] flex flex-col items-center justify-center gap-1 p-2"
              >
                <item.icon
                  className={cn(
                    "mb-1 size-6 transition-colors",
                    isActive
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  )}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    "transition-colors",
                    isActive
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  )}
                >
                  {item.name}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
}
