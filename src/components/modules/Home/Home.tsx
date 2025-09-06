import brandImg from "@/assets/home/brand.png";

import { useGetMeQuery } from "../../../redux/features/authApi/authApi";
import { LoadingScreen } from "../../LoadingScreen";
import { Gem } from "lucide-react";
import Wheel from "../task/Wheel";

const Home = () => {
  const { data, isLoading } = useGetMeQuery(undefined);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <div className="-mt-2 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img className="size-10 rounded-2xl" src={data?.data?.photo} alt="" />
          <p className="font-semibold">{data?.data?.firstName}</p>
        </div>

        <div className="bg-[var(--tma-mini-card)] px-4 py-1 rounded-md shadow-sm flex flex-col items-center">
          <Gem />
          <p className="font-medium mt-1 text-xs">Bonus</p>
        </div>
      </div>
      {/* <div className="flex items-center justify-center">
        <img className="size-64" src={brandImg} alt="" />
      </div> */}

      <Wheel />

      {/* <div>
        <h1 className="text-center text-3xl font-semibold">
          {data?.data?.balance} HMSTR
        </h1>
      </div> */}
    </div>
  );
};

export default Home;
