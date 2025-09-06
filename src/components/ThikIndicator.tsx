import { cn } from "../lib/utils";

interface ThickIndicatorProps {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  className?: string;
  ringColor?: string; // নতুন prop রিং এর রঙের জন্য
  ringBg?: string; // নতুন prop ব্যাকগ্রাউন্ডের রঙের জন্য
}

const sizeMap = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-24 h-24",
  xl: "w-32 h-32",
};

const ThickIndicator = ({
  size = "xl",
  animated = true,
  className,
  ringColor = "#050d31", // default border color
  ringBg = "#050d31", // default background color
}: ThickIndicatorProps) => {
  const triangleSize = {
    sm: "border-l-[10px] border-r-[10px] border-b-[16px]",
    md: "border-l-[14px] border-r-[14px] border-b-[22px]",
    lg: "border-l-[18px] border-r-[18px] border-b-[28px]",
    xl: "border-l-[32px] border-r-[22px] border-b-[34px]",
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-full",
        className
      )}
    >
      {/* 🔻 Top Triangle */}
      <div
        className={cn(
          "absolute -top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 z-10",
          "border-l-transparent border-r-transparent border-b-[#050d31]", // লাল রঙ
          "drop-shadow-lg",
          triangleSize[size]
        )}
      />

      {/* 🌟 Outer Glow */}
      <div
        className={cn(
          "absolute rounded-full opacity-60",
          sizeMap[size],
          "scale-150",
          animated && "animate-pulse-glow bg-amber-700"
        )}
      />

      {/* 🟢 Main Indicator Container */}
      <div
        className={cn(
          "relative rounded-full shadow-2xl",
          sizeMap[size],
          "border-[#050d31]", // Border Color এখানে সেট
          "border-8",
          "bg-[#050d31]", // Background Color এখানে সেট
          animated && "animate-rotate-slow"
        )}
      >
        {/* 🌈 Inner highlight circle */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/30 to-transparent" />

        {/* 🟠 Center core */}
        <div className="absolute inset-1/3 rounded-full bg-indicator-primary shadow-inner" />

        {/* ⚪ Center dot */}
        <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/80 shadow-sm" />
      </div>
    </div>
  );
};

export default ThickIndicator;
