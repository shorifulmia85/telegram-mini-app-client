import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { MapPin } from "lucide-react"; // Import MapPin icon
import { Button } from "../../ui/button";

const NUM_SEGMENTS = 10;
const SEGMENT_ANGLE = 360 / NUM_SEGMENTS;
const WHEEL_RADIUS = 150; // Radius of the wheel SVG

// Helper to convert degrees to radians
const toRadians = (angle: number) => angle * (Math.PI / 180);

// Helper to get coordinates on a circle
const getCoordinates = (angle: number, radius: number) => ({
  x: radius * Math.cos(toRadians(angle)),
  y: radius * Math.sin(toRadians(angle)),
});

export default function Wheel() {
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
  }, [isSpinning]);

  const generateSegments = () => {
    // Adjusted to 10 segments, maintaining alternating colors and key values
    const fixedSegments = [
      { value: "$5", color: "white", textColor: "#3f51b5" },
      {
        value: "$10",
        color: "linear-gradient(to bottom right, #3f51b5, #2196f3)",
        textColor: "white",
      },
      { value: "ZERO", color: "white", textColor: "#3f51b5" },
      {
        value: "$2",
        color: "linear-gradient(to bottom right, #3f51b5, #2196f3)",
        textColor: "white",
      },
      { value: "$50", color: "white", textColor: "#3f51b5" },
      {
        value: "$1",
        color: "linear-gradient(to bottom right, #3f51b5, #2196f3)",
        textColor: "white",
      },
      { value: "$20", color: "white", textColor: "#e91e63" }, // Special color for JACKPOT
      {
        value: "$20",
        color: "linear-gradient(to bottom right, #e91e63, #ff4081)",
        textColor: "white",
      },
      { value: "$15", color: "white", textColor: "#e91e63" },
      {
        value: "$100",
        color: "linear-gradient(to bottom right, #e91e63, #ff4081)",
        textColor: "white",
      },
    ];
    setSegments(fixedSegments);
  };

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    // generateSegments(); // Only generate once or if you want new values each spin

    const minRotations = 5; // Minimum full rotations
    const maxRotations = 10; // Maximum full rotations
    const randomFullRotations =
      Math.floor(Math.random() * (maxRotations - minRotations + 1)) +
      minRotations;
    const randomStopAngle = Math.random() * 360; // Random angle within 0-360 degrees

    // Ensure the new rotation is always greater than the current rotation to force forward spin
    const newTargetRotation =
      rotation + randomFullRotations * 360 + randomStopAngle;

    setRotation(newTargetRotation);
  };

  const handleSpinComplete = () => {
    setIsSpinning(false);

    // Calculate the effective rotation after spin (0-360 degrees)
    // Ensure it's positive.
    const effectiveRotation = ((rotation % 360) + 360) % 360;

    // The indicator is at the top (0 degrees relative to the container).
    // In SVG coordinates (right is 0, down is 90, top is 270), the indicator points to 270 degrees.
    // We need to find which segment's original angle range contains the angle that is now at 270 degrees.
    // The angle on the wheel that ends up under the indicator.
    const indicatorAngleOnWheel = (270 - effectiveRotation + 360) % 360;

    const winningIndex = Math.floor(indicatorAngleOnWheel / SEGMENT_ANGLE);
    const winningSegment = segments[winningIndex];

    toast.success(`Win: ${winningSegment.value}`, {
      position: "top-center",
      style: {
        background: "#fff",
        color: "#333",
        boxShadow: "0 0 15px rgba(0,0,0,0.2)",
      },
      iconTheme: {
        primary: "#FFD700",
        secondary: "#333",
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="relative w-[350px] h-[350px] flex items-center justify-center">
        {/* Top Indicator - MapPin Icon */}
        <div className="mt-8 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full z-20">
          <MapPin
            className="text-background" // Gold color for the icon
            size={50} // Adjust size as needed
            style={{ filter: "drop-shadow(0 5px 5px rgba(0,0,0,0.2))" }} // Add shadow for depth
          />
        </div>

        {/* Wheel */}
        <motion.div
          ref={wheelRef}
          className="relative w-[280px] h-[280px] rounded-full border-[10px] border-[#3f51b5] flex items-center justify-center"
          style={{
            background: "#fff", // White background for the wheel
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)", // Soft shadow
            border: "10px solid #3c0af1ff", // Outer blue border
            outline: "5px solid #1d12b3ff", // Inner gold border
            outlineOffset: "-6px", // Ensure outline is inside the border
          }}
          animate={{ rotate: rotation }}
          transition={{
            // type: "tween", // Changed to tween for linear motion
            duration: 5, // 5 seconds spin duration
            // ease: "easeOutCubic", // Smooth deceleration
          }}
          onAnimationComplete={handleSpinComplete}
        >
          <svg viewBox={`-150 -150 300 300`} className="w-full h-full">
            {segments.map((segment, index) => {
              const startAngle = index * SEGMENT_ANGLE;
              const endAngle = (index + 1) * SEGMENT_ANGLE;

              const p1 = getCoordinates(startAngle, WHEEL_RADIUS);
              const p2 = getCoordinates(endAngle, WHEEL_RADIUS);

              // Create a temporary SVG element to apply the gradient
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
                        {gradientStyle.split(", ").map((color, i) => (
                          <stop
                            key={i}
                            offset={`${
                              (i / (gradientStyle.split(", ").length - 1)) * 100
                            }%`}
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
                    stroke="#ccc" // Light stroke for separation
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
                    // Rotate text to be upright when the segment is at the top
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
          {/* Central hub - small blue circle */}
          <div
            className="absolute w-20 h-20 rounded-full bg-[#3c0af1ff] border-4 border-white"
            style={{
              boxShadow: "0 0 10px rgba(207, 14, 14, 0.2)",
            }}
          />
        </motion.div>
      </div>
      <Button
        onClick={spinWheel}
        disabled={isSpinning}
        className="w-full mt-5 px-5 py-8 text-lg font-bold bg-primary text-background rounded-md"
      >
        {isSpinning ? "Spinning..." : "Spin & Win"}
      </Button>
    </div>
  );
}
