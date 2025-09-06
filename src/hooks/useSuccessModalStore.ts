// src/hooks/useSuccessModalStore.ts
import { create } from "zustand";

interface SuccessModalState {
  isOpen: boolean;
  rewardCoin: number;
  //   startCooldownRef: () => void; // ✅ store as reference
  showModal: (coin: number) => void;
  hideModal: () => void;
}

const useSuccessModalStore = create<SuccessModalState>((set) => ({
  isOpen: false,
  rewardCoin: 0,
  startCooldownRef: () => {}, // default noop
  showModal: (coin) => set({ isOpen: true, rewardCoin: coin }),
  hideModal: () => set({ isOpen: false }),
}));

export default useSuccessModalStore;
