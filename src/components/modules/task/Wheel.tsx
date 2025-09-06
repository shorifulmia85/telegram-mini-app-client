import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { MapPin } from "lucide-react";
import ThickIndicator from "../../ThikIndicator";
import { Button } from "../../ui/button";

const NUM_SEGMENTS = 10;
const SEGMENT_ANGLE = 360 / NUM_SEGMENTS;
const WHEEL_RADIUS = 150;

const toRadians = (angle: number) => angle * (Math.PI / 180);
const getCoordinates = (angle: number, radius: number) => ({
  x: radius * Math.cos(toRadians(angle)),
  y: radius * Math.sin(toRadians(angle)),
});

export default function Wheel() {
  // ✅ নতুন: কেবল ইউজার-ইনিশিয়েটেড স্পিন ট্র্যাক করতে
  const userInitiatedRef = useRef(false);

  const [segments, setSegments] = useState<
    {
      value: string;
      color: string;
      textColor: string;
      rotationOffset?: number;
    }[]
  >([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    generateSegments();
  }, []);

  const generateSegments = () => {
    const fixedSegments = [
      { value: "500", color: "white", textColor: "#3f51b5" },
      {
        value: "100",
        color: "linear-gradient(to bottom right, #3f51b5, #2196f3)",
        textColor: "white",
      },
      { value: "400", color: "white", textColor: "#3f51b5" },
      {
        value: "1000",
        color: "linear-gradient(to bottom right, #3f51b5, #2196f3)",
        textColor: "white",
      },
      { value: "300", color: "white", textColor: "#3f51b5" },
      {
        value: "2000",
        color: "linear-gradient(to bottom right, #3f51b5, #2196f3)",
        textColor: "white",
      },
      { value: "500", color: "white", textColor: "#e91e63" },
      {
        value: "200",
        color: "linear-gradient(to bottom right, #e91e63, #ff4081)",
        textColor: "white",
      },
      { value: "700", color: "white", textColor: "#e91e63" },
      {
        value: "200",
        color: "linear-gradient(to bottom right, #e91e63, #ff4081)",
        textColor: "white",
      },
    ];
    setSegments(fixedSegments);
  };

  const spinWheel = () => {
    if (isSpinning) return;
    userInitiatedRef.current = true; // ✅ ইউজার স্পিন শুরু করেছে
    setIsSpinning(true);

    const minRotations = 5,
      maxRotations = 10;
    const randomFullRotations =
      Math.floor(Math.random() * (maxRotations - minRotations + 1)) +
      minRotations;
    const randomStopAngle = Math.random() * 360;

    const newTargetRotation =
      rotation + randomFullRotations * 360 + randomStopAngle;
    setRotation(newTargetRotation);
  };

  const handleSpinComplete = () => {
    setIsSpinning(false);

    // ✅ ইউজার স্পিন না করলে রেজাল্ট দেখাবো না
    if (!userInitiatedRef.current) return;

    const effectiveRotation = ((rotation % 360) + 360) % 360;
    const indicatorAngleOnWheel = (270 - effectiveRotation + 360) % 360; // top pointer
    const winningIndex = Math.floor(indicatorAngleOnWheel / SEGMENT_ANGLE);
    const winningSegment = segments[winningIndex];
    if (!winningSegment) return;

    toast.success(`Win: ${winningSegment.value}`, { position: "top-center" });

    userInitiatedRef.current = false; // ✅ রিসেট
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className=" relative w-[300px] h-[300px] flex items-center justify-center">
        {/* spinning wheel ONLY */}
        <motion.div
          ref={wheelRef}
          className="relative w-[250px] h-[250px] rounded-full flex items-center justify-center"
          style={{
            background: "#fff",
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            border: "10px solid #6457e4",
            outline: "5px solid #6457e4",
            outlineOffset: "-6px",
          }}
          initial={false} // ✅ মাউন্টে কোনো ইনিশিয়াল অ্যানিমেশন নয়
          animate={{ rotate: rotation }}
          transition={{ duration: isSpinning ? 5 : 0 }} // ✅ কেবল স্পিনিং হলে ডিউরেশন
          onAnimationComplete={handleSpinComplete}
        >
          <svg viewBox="-150 -150 300 300" className="w-full h-full">
            {segments.map((segment, index) => {
              const startAngle = index * SEGMENT_ANGLE;
              const endAngle = (index + 1) * SEGMENT_ANGLE;
              const p1 = getCoordinates(startAngle, WHEEL_RADIUS);
              const p2 = getCoordinates(endAngle, WHEEL_RADIUS);
              const gradientId = `gradient-${index}`;
              const gradientStyle = segment.color.startsWith("linear-gradient")
                ? segment.color.replace("linear-gradient(", "").replace(")", "")
                : "";

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
                    x={
                      getCoordinates(
                        startAngle + SEGMENT_ANGLE / 2,
                        WHEEL_RADIUS * 0.7
                      ).x
                    }
                    y={
                      getCoordinates(
                        startAngle + SEGMENT_ANGLE / 2,
                        WHEEL_RADIUS * 0.7
                      ).y
                    }
                    fill={segment.textColor}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${
                      startAngle + SEGMENT_ANGLE / 2 + 90
                    }, ${
                      getCoordinates(
                        startAngle + SEGMENT_ANGLE / 2,
                        WHEEL_RADIUS * 0.7
                      ).x
                    }, ${
                      getCoordinates(
                        startAngle + SEGMENT_ANGLE / 2,
                        WHEEL_RADIUS * 0.7
                      ).y
                    })`}
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

      <Button
        onClick={spinWheel}
        disabled={isSpinning}
        className="px-5 py-4 font-bold bg-[var(--tma-secondary)] rounded-full"
      >
        {isSpinning ? "Spinning..." : "Spin & Win"}
      </Button>
    </div>
  );
}
