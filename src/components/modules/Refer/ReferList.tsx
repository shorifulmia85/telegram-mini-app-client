/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import type { IRefer } from "../../../types/refer";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { useClaimedReferralMutation } from "../../../redux/features/referral/referralApi";
import { cn } from "../../../lib/utils";

const ReferList = ({ fnd }: { fnd: IRefer }) => {
  const [claimedReferral] = useClaimedReferralMutation();
  const handleClaim = async (id: string) => {
    try {
      const res = await claimedReferral(id).unwrap();
      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <div>
      <div
        className="flex items-center justify-between bg-[var(--tma-mini-card)] p-3 rounded-lg"
        key={fnd?._id}
      >
        <div className=" flex items-center gap-3">
          {" "}
          <Avatar>
            <AvatarImage src={fnd?.referred?.photo} alt="Profile photo" />
          </Avatar>
          <p>
            {fnd?.referred?.firstName} {fnd?.referred?.lastName}
          </p>
        </div>

        <div>
          <Button
            onClick={() => handleClaim(fnd?._id)}
            disabled={
              Number(fnd?.lockedAmount) !== Number(fnd?.referred?.balance) ||
              !fnd?.unlockedAmount
            }
            className={cn(
              "text-[var(--tma-warning)]",
              fnd?.unlockedAmount
                ? "bg-green-600" // Claimed হলে
                : Number(fnd?.lockedAmount) !== Number(fnd?.referred?.balance)
                ? "bg-white/10" // Pending হলে
                : "bg-[var(--tma-secondary)]" // Claim হলে
            )}
          >
            {fnd?.unlockedAmount
              ? "Claimed"
              : Number(fnd?.lockedAmount) !== Number(fnd?.referred?.balance)
              ? "Pending"
              : "Claim"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReferList;
