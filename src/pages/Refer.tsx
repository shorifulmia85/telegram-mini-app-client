/* eslint-disable @typescript-eslint/no-unused-vars */
import referImage from "@/assets/refer/referImage.png";

import { Copy, User2 } from "lucide-react";
import { useGetMyReferralsQuery } from "../redux/features/referral/referralApi";
import Loading from "../components/Loading";
import { useGetMeQuery } from "../redux/features/authApi/authApi";
import toast from "react-hot-toast";
import ReferList from "../components/modules/Refer/ReferList";
import type { IRefer } from "../types/refer";

function Refer() {
  const { data, isLoading } = useGetMyReferralsQuery(undefined);
  const { data: userData, isLoading: userLoading } = useGetMeQuery(undefined);

  const handleCopy = async () => {
    const text = userData?.data?.referLink || "";
    if (!text) return;
    await navigator.clipboard.writeText(text);
    toast.success("Refer link copied");
  };

  if (isLoading || userLoading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* 🎉 Confetti Elements */}
      <div className="absolute top-36 left-8 w-2 h-4 bg-red-500 rounded-full rotate-45"></div>
      <div className="absolute top-44 right-12 w-3 h-3 bg-green-400 rounded-full"></div>
      <div className="absolute top-56 left-16 w-1.5 h-6 bg-yellow-400 rounded-full -rotate-12"></div>
      <div className="absolute top-64 right-20 w-2.5 h-2.5 bg-blue-400 rounded-full"></div>
      <div className="absolute top-52 right-32 w-1.5 h-3 bg-orange-400 rounded-full rotate-90"></div>

      <div>
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
        <div className="flex items-center gap-3 mb-8">
          {/* Left: link pill */}
          <div className="flex-1 min-w-0">
            <div className="bg-[var(--tma-secondary)] rounded-full py-4 px-6 flex items-center gap-2">
              <User2 className="shrink-0" />
              {/* key: w-0 flex-1 + truncate + min-w-0 parent */}
              <span
                className="w-0 flex-1 truncate"
                title={userData?.data?.referLink}
              >
                {userData?.data?.referLink || "No link"}
              </span>
            </div>
          </div>

          {/* Right: copy button */}
          <button
            onClick={handleCopy}
            className="shrink-0 bg-blue-600 hover:bg-blue-700 rounded-full p-4 text-white"
            aria-label="Copy referral link"
          >
            <Copy className="w-5 h-5 pointer-events-none" />
          </button>
        </div>

        {/* 📊 Income Cards */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4  text-white/60">Income</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[var(--tma-mini-card)] rounded-2xl p-4 ">
              <div className="text-2xl font-bold mb-1">
                {data?.data?.length}
              </div>
              <div className="text-gray-400 text-sm">My Invite</div>
            </div>
            <div className="bg-[var(--tma-mini-card)] rounded-2xl p-4 ">
              <div className="text-2xl font-bold mb-1">
                {userData?.data?.referIncome ? userData?.data?.referIncome : 0}
              </div>
              <div className="text-gray-400 text-sm">Refer Income</div>
            </div>
          </div>
        </div>

        {/* 🪙 Reward Details */}
        {/* <div className="bg-[var(--tma-mini-card)] rounded-2xl p-4 mb-24">
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
        </div> */}

        <div>
          <h1 className="text-xl font-semibold mb-4 text-white/60">
            Refer List
          </h1>
          <div>
            {data?.data?.map((fnd: IRefer) => (
              <ReferList key={fnd?._id} fnd={fnd} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Refer;
