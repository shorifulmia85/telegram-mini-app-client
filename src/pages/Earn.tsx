import taskImg from "@/assets/earn/task.png";

import TmaTabs from "../components/TmaTabs";

const Earn = () => {
  return (
    <div className="mt-5">
      <div>
        <div className="flex items-center justify-center">
          <img className="size-24" src={taskImg} alt="" />
        </div>
        <p className="text-center text-xl font-semibold">
          More tasks, More rewards
        </p>
      </div>

      <div className="mt-5 space-y-3">
        <div className="w-full">
          <TmaTabs />
        </div>
      </div>
    </div>
  );
};

export default Earn;
