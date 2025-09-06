import taskImg from "@/assets/earn/task.png";

import TmaTabs from "../components/modules/Earn/TmaTabs";

const Earn = () => {
  return (
    <div className="mt-5">
      <div>
        <div className="flex items-center justify-center mb-8 relative">
          {/* Glowing Light Behind Image */}
          <div className="absolute w-52 h-52 bg-[radial-gradient(circle,_rgba(44,100,255,0.5)_0%,_transparent_70%)] blur-2xl rounded-full"></div>
          <img
            src={taskImg}
            alt="Refer"
            className="relative z-10 w-36 h-36 drop-shadow-[0_0_25px_rgba(44,100,255,0.7)]"
          />
        </div>
        <p className="text-center text-xl font-bold">
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
