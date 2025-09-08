import { ChevronRight, CoinsIcon, Wallet2 } from "lucide-react";
import { useGetMeQuery } from "../redux/features/authApi/authApi";
import { Button } from "../components/ui/button";
import Loading from "../components/Loading";

const Wallet = () => {
  const { data, isLoading } = useGetMeQuery(undefined);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h1 className="text-center text-2xl font-semibold">
        {data?.data?.firstName} {data?.data?.lastName}
      </h1>

      <div className="mt-5">
        <p className="text-lg flex items-center gap-3 font-semibold bg-[var(--tma-mini-card)] p-3 rounded-md">
          <CoinsIcon />
          <span>{data?.data?.balance}</span>
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-5 ">
        <Button className="flex-1 bg-[var(--tma-secondary)]">Deposit</Button>
        <Button className="flex-1 bg-[var(--tma-mini-card)]">Withdraw</Button>
      </div>

      <div className="mt-5 ">
        <p className="font-medium">Wallet</p>

        <div className="mt-3 flex items-center justify-between bg-[var(--tma-mini-card)] p-3 rounded-md">
          <div className="flex items-center gap-3  ">
            <Wallet2 />
            <p className="font-medium">Connect Wallet</p>
          </div>
          <div>
            <ChevronRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
