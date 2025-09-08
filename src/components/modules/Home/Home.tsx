import { useGetMeQuery } from "../../../redux/features/authApi/authApi";
import { LoadingScreen } from "../../LoadingScreen";
import { Crown, Sparkles } from "lucide-react";
import Wheel from "../task/Wheel";
import defaultProfile from "@/assets/icons/ProfileIcons/defaultProfile.png";

const Home = () => {
  const { data, isLoading } = useGetMeQuery(undefined);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <div className="-mt-2 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            className="size-10 rounded-2xl object-cover"
            src={defaultProfile}
            alt=""
          />
          <p className="font-semibold">{data?.data?.firstName}</p>
        </div>

        <div className="bg-[var(--tma-mini-card)] px-4 py-2 rounded-md shadow-sm flex items-center place-items-center gap-2">
          <Sparkles size={20} />
          <p className="font-medium text-sm">Daily Bonus</p>
        </div>
      </div>
      <div className="mt-10 flex items-center justify-center gap-2 text-2xl font-semibold text-center">
        <Crown color="yellow" />
        <p>{data?.data?.balance}</p>
      </div>

      <div className="">
        <Wheel />
      </div>

      {/* <div>
        <h1 className="text-center text-3xl font-semibold">
          {data?.data?.balance} HMSTR
        </h1>
      </div> */}
    </div>
  );
};

export default Home;
