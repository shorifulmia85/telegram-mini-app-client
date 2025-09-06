import referImage from "@/assets/refer/referImage.png";

import {
  Copy,
  Home,
  Trophy,
  Users,
  Wallet,
  HelpCircle,
  User2,
} from "lucide-react";
import { useGetMeQuery } from "../redux/features/authApi/authApi";

function Refer() {
  const { data, isLoading } = useGetMeQuery(undefined);
  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* 🎉 Confetti Elements */}
      <div className="absolute top-36 left-8 w-2 h-4 bg-red-500 rounded-full rotate-45"></div>
      <div className="absolute top-44 right-12 w-3 h-3 bg-green-400 rounded-full"></div>
      <div className="absolute top-56 left-16 w-1.5 h-6 bg-yellow-400 rounded-full -rotate-12"></div>
      <div className="absolute top-64 right-20 w-2.5 h-2.5 bg-blue-400 rounded-full"></div>
      <div className="absolute top-52 right-32 w-1.5 h-3 bg-orange-400 rounded-full rotate-90"></div>

      <div className="pt-8">
        {/* 👥 Refer Image with Light Glow */}
        <div className="flex items-center justify-center mb-8 relative">
          {/* Glowing Light Behind Image */}
          <div className="absolute w-52 h-52 bg-[radial-gradient(circle,_rgba(44,100,255,0.5)_0%,_transparent_70%)] blur-2xl rounded-full"></div>
          <img
            src={referImage}
            alt="Refer"
            className="relative z-10 w-36 h-36 drop-shadow-[0_0_25px_rgba(44,100,255,0.7)]"
          />
        </div>

        {/* 🏷️ Title */}
        <h2 className="text-3xl font-bold text-center mb-8"> Invite Friends</h2>

        {/* 🎯 Invite + Copy Buttons */}
        <div className="flex items-center space-x-3 mb-8">
          <button className="flex-1 bg-[var(--tma-secondary)] rounded-full py-4 px-6 flex items-center justify-center space-x-2">
            <User2 /> <span className="font-semibold">Invite Friend</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 rounded-full p-4">
            <Copy className="w-5 h-5" />
          </button>
        </div>

        {/* 📊 Income Cards */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Income</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[var(--tma-mini-card)] rounded-2xl p-4 ">
              <div className="text-2xl font-bold mb-1">0</div>
              <div className="text-gray-400 text-sm">My Invite</div>
            </div>
            <div className="bg-[var(--tma-mini-card)] rounded-2xl p-4 ">
              <div className="text-2xl font-bold mb-1">0</div>
              <div className="text-gray-400 text-sm">Refer Income</div>
            </div>
          </div>
        </div>

        {/* 🪙 Reward Details */}
        <div className="bg-[var(--tma-mini-card)] rounded-2xl p-4 mb-24">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-300">
              1. Recharge <span className="text-yellow-400 font-bold">10%</span>{" "}
              Ton rebate
            </span>
            <HelpCircle className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-gray-300 mb-2">
            2. Invite a regular member and get{" "}
            <span className="text-yellow-400 font-bold">1,000</span> Coin
          </div>
          <div className="text-gray-300 mb-4">
            3. Invite a premium member and get{" "}
            <span className="text-yellow-400 font-bold">5,000</span> Coin
          </div>
          <div className="text-gray-400 text-sm">
            4. Referred players must complete the tutorial for the referrer to
            receive rewards.
          </div>
        </div>
      </div>

      {/* 📱 Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#141a3b] border-t border-white/10">
        <div className="flex items-center justify-around py-3">
          <div className="flex flex-col items-center">
            <Home className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400">Home</span>
          </div>
          <div className="flex flex-col items-center">
            <Trophy className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400">Mining</span>
          </div>
          <div className="flex flex-col items-center">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
            </svg>
            <span className="text-xs text-gray-400">Arena</span>
          </div>
          <div className="flex flex-col items-center">
            <Users className="w-6 h-6 text-white" />
            <span className="text-xs text-white font-semibold">Friends</span>
          </div>
          <div className="flex flex-col items-center">
            <Wallet className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400">Assets</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Refer;
