import useSuccessModalStore from "../hooks/useSuccessModalStore";
import { Button } from "./ui/button";
import rewardCoinImage from "@/assets/earn/rewardCoin.png";

const SuccessModal = () => {
  const { isOpen, rewardCoin, hideModal } = useSuccessModalStore();

  if (!isOpen) return null;

  const handleClose = () => {
    hideModal();
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-gradient-to-b from-zinc-900 to-black border border-white/10 text-white rounded-xl px-4 py-6 w-[90%] max-w-sm text-center shadow-lg">
        {/* 🔥 BACKGLOW LINES */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,0.15)_0%,transparent_60%)] opacity-20" />

        {/* 🏆 TOP TEXT */}
        <h2 className="text-white text-lg font-semibold">
          Congratulations on getting
        </h2>

        {/* 🎉 COIN VALUE */}
        <p className="text-yellow-400 text-4xl font-extrabold mt-2">
          {rewardCoin.toLocaleString()}
        </p>
        <p className="text-yellow-500 text-lg font-semibold">TapCoins</p>

        {/* 🪙 COIN IMAGE */}
        <img
          src={rewardCoinImage}
          alt="TapCoins"
          className="mx-auto w-32 h-32 mt-4 object-contain drop-shadow-[0_4px_10px_rgba(255,215,0,0.3)]"
        />

        {/* ✅ BUTTON */}
        <Button
          type="button"
          onClick={handleClose}
          className="mt-6 w-full bg-[var(--tma-primary)] text-white text-lg font-bold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          ACCEPT
        </Button>
      </div>
    </div>
  );
};

export default SuccessModal;
