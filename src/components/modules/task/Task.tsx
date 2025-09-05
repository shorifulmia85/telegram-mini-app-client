import { Clock, Zap } from "lucide-react";

export default function EarnScreen() {
  return (
    <div className="mt-5 rounded-2xl overflow-hidden">
      {/* Navigation Tabs */}
      <div className="text-white flex gap-2 pb-1 overflow-x-auto no-scrollbar">
        <button className="chip-active flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 text-md bg-gray-100/20 font-medium">
          All
        </button>
        <button className="chip-inactive flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 text-md bg-gray-100/20 font-medium">
          Ads
        </button>
        <button className="chip-inactive flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 text-md bg-gray-100/20 font-medium">
          Offerwall
        </button>
        <button className="chip-inactive flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 text-md bg-gray-100/20 font-medium">
          Tasks
        </button>
        <button className="chip-inactive flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 text-md bg-gray-100/20 font-medium">
          Surveys
        </button>
      </div>

      {/* Location Info */}
      <div className="flex items-center gap-2 py-2">
        <div className="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
        </div>
        <span className="text-sm text-white">Available in Bangladesh</span>
      </div>

      {/* Earning Options */}
      <div className=" space-y-4">
        {/* Watch Ads */}
        <div className="bg-gray-100/10 shadow rounded-xl p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="w-full">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-lg text-white">Watch Ads</h3>
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                  CAR
                </span>
              </div>
              <p className="text-sm text-white mb-3">
                Earn by watching short video ads.
              </p>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">~1 min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">Easy</span>
                </div>
              </div>

              <div className="flex items-center justify-between font-semibold text-green-600">
                <p>+$0.05</p>

                <button className="bg-primary  text-white text-lg  px-4 py-1 rounded-lg font-medium">
                  Watch
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Offerwall */}
        <div className="bg-gray-100/10 shadow rounded-xl p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="w-full ">
              <h3 className="font-bold text-lg text-white mb-1">Offerwall</h3>
              <p className="text-sm text-white mb-3">
                Complete offers for higher rewards.
              </p>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">5-15 min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">Medium</span>
                </div>
              </div>
              <div className="flex items-center justify-between font-semibold text-green-600">
                <p>+$0.05</p>

                <button className="bg-primary  text-white text-lg  px-4 py-1 rounded-lg font-medium">
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Spin the Wheel */}
        <div className="bg-gray-100/10 shadow rounded-xl p-4">
          <div className=" flex items-start justify-between mb-3">
            <div className="w-full">
              <h3 className="font-bold text-lg text-white mb-1">
                Spin the Wheel
              </h3>
              <p className="text-sm text-white mb-3">
                Try your luck for daily bonus rewards.
              </p>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">~30 sec</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">Easy</span>
                </div>
              </div>

              <div className="flex items-center justify-between font-semibold text-green-600">
                <p>+$0.05</p>

                <button className="bg-primary  text-white text-lg px-4 py-2 rounded-lg font-medium">
                  Spin
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Spin the Wheel */}
        <div className="bg-gray-100/10 shadow rounded-xl p-4">
          <div className=" flex items-start justify-between mb-3">
            <div className="w-full">
              <h3 className="font-bold text-lg text-white mb-1">
                Spin the Wheel
              </h3>
              <p className="text-sm text-white mb-3">
                Try your luck for daily bonus rewards.
              </p>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">~30 sec</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">Easy</span>
                </div>
              </div>

              <div className="flex items-center justify-between font-semibold text-green-600">
                <p>+$0.05</p>

                <button className="bg-primary  text-white text-lg px-4 py-2 rounded-lg font-medium">
                  Spin
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Spin the Wheel */}
        <div className="bg-gray-100/10 shadow rounded-xl p-4">
          <div className=" flex items-start justify-between mb-3">
            <div className="w-full">
              <h3 className="font-bold text-lg text-white mb-1">
                Spin the Wheel
              </h3>
              <p className="text-sm text-white mb-3">
                Try your luck for daily bonus rewards.
              </p>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">~30 sec</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">Easy</span>
                </div>
              </div>

              <div className="flex items-center justify-between font-semibold text-green-600">
                <p>+$0.05</p>

                <button className="bg-primary  text-white text-lg px-4 py-2 rounded-lg font-medium">
                  Spin
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Spin the Wheel */}
        <div className="bg-gray-100/10 shadow rounded-xl p-4">
          <div className=" flex items-start justify-between mb-3">
            <div className="w-full">
              <h3 className="font-bold text-lg text-white mb-1">
                Spin the Wheel
              </h3>
              <p className="text-sm text-white mb-3">
                Try your luck for daily bonus rewards.
              </p>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">~30 sec</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">Easy</span>
                </div>
              </div>

              <div className="flex items-center justify-between font-semibold text-green-600">
                <p>+$0.05</p>

                <button className="bg-primary  text-white text-lg px-4 py-2 rounded-lg font-medium">
                  Spin
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Spin the Wheel */}
        <div className="bg-gray-100/10 shadow rounded-xl p-4">
          <div className=" flex items-start justify-between mb-3">
            <div className="w-full">
              <h3 className="font-bold text-lg text-white mb-1">
                Spin the Wheel
              </h3>
              <p className="text-sm text-white mb-3">
                Try your luck for daily bonus rewards.
              </p>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">~30 sec</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">Easy</span>
                </div>
              </div>

              <div className="flex items-center justify-between font-semibold text-green-600">
                <p>+$0.05</p>

                <button className="bg-primary  text-white text-lg px-4 py-2 rounded-lg font-medium">
                  Spin
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Spin the Wheel */}
        <div className="bg-gray-100/10 shadow rounded-xl p-4">
          <div className=" flex items-start justify-between mb-3">
            <div className="w-full">
              <h3 className="font-bold text-lg text-white mb-1">
                Spin the Wheel
              </h3>
              <p className="text-sm text-white mb-3">
                Try your luck for daily bonus rewards.
              </p>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">~30 sec</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">Easy</span>
                </div>
              </div>

              <div className="flex items-center justify-between font-semibold text-green-600">
                <p>+$0.05</p>

                <button className="bg-primary  text-white text-lg px-4 py-2 rounded-lg font-medium">
                  Spin
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Spin the Wheel */}
        <div className="bg-gray-100/10 shadow rounded-xl p-4">
          <div className=" flex items-start justify-between mb-3">
            <div className="w-full">
              <h3 className="font-bold text-lg text-white mb-1">
                Spin the Wheel
              </h3>
              <p className="text-sm text-white mb-3">
                Try your luck for daily bonus rewards.
              </p>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">~30 sec</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">Easy</span>
                </div>
              </div>

              <div className="flex items-center justify-between font-semibold text-green-600">
                <p>+$0.05</p>

                <button className="bg-primary  text-white text-lg px-4 py-2 rounded-lg font-medium">
                  Spin
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Spin the Wheel */}
        <div className="bg-gray-100/10 shadow rounded-xl p-4">
          <div className=" flex items-start justify-between mb-3">
            <div className="w-full">
              <h3 className="font-bold text-lg text-white mb-1">
                Spin the Wheel
              </h3>
              <p className="text-sm text-white mb-3">
                Try your luck for daily bonus rewards.
              </p>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">~30 sec</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">Easy</span>
                </div>
              </div>

              <div className="flex items-center justify-between font-semibold text-green-600">
                <p>+$0.05</p>

                <button className="bg-primary  text-white text-lg px-4 py-2 rounded-lg font-medium">
                  Spin
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Spin the Wheel */}
        <div className="bg-gray-100/10 shadow rounded-xl p-4">
          <div className=" flex items-start justify-between mb-3">
            <div className="w-full">
              <h3 className="font-bold text-lg text-white mb-1">
                Spin the Wheel
              </h3>
              <p className="text-sm text-white mb-3">
                Try your luck for daily bonus rewards.
              </p>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">~30 sec</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">Easy</span>
                </div>
              </div>

              <div className="flex items-center justify-between font-semibold text-green-600">
                <p>+$0.05</p>

                <button className="bg-primary  text-white text-lg px-4 py-2 rounded-lg font-medium">
                  Spin
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Spin the Wheel */}
        <div className="bg-gray-100/10 shadow rounded-xl p-4">
          <div className=" flex items-start justify-between mb-3">
            <div className="w-full">
              <h3 className="font-bold text-lg text-white mb-1">
                Spin the Wheel
              </h3>
              <p className="text-sm text-white mb-3">
                Try your luck for daily bonus rewards.
              </p>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">~30 sec</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">Easy</span>
                </div>
              </div>

              <div className="flex items-center justify-between font-semibold text-green-600">
                <p>+$0.05</p>

                <button className="bg-primary  text-white text-lg px-4 py-2 rounded-lg font-medium">
                  Spin
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Spin the Wheel */}
        <div className="bg-gray-100/10 shadow rounded-xl p-4">
          <div className=" flex items-start justify-between mb-3">
            <div className="w-full">
              <h3 className="font-bold text-lg text-white mb-1">
                Spin the Wheel
              </h3>
              <p className="text-sm text-white mb-3">
                Try your luck for daily bonus rewards.
              </p>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">~30 sec</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">Easy</span>
                </div>
              </div>

              <div className="flex items-center justify-between font-semibold text-green-600">
                <p>+$0.05</p>

                <button className="bg-primary  text-white text-lg px-4 py-2 rounded-lg font-medium">
                  Spin
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Spin the Wheel */}
        <div className="bg-gray-100/10 shadow rounded-xl p-4">
          <div className=" flex items-start justify-between mb-3">
            <div className="w-full">
              <h3 className="font-bold text-lg text-white mb-1">
                Spin the Wheel
              </h3>
              <p className="text-sm text-white mb-3">
                Try your luck for daily bonus rewards.
              </p>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">~30 sec</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">Easy</span>
                </div>
              </div>

              <div className="flex items-center justify-between font-semibold text-green-600">
                <p>+$0.05</p>

                <button className="bg-primary  text-white text-lg px-4 py-2 rounded-lg font-medium">
                  Spin
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Spin the Wheel */}
        <div className="bg-gray-100/10 shadow rounded-xl p-4">
          <div className=" flex items-start justify-between mb-3">
            <div className="w-full">
              <h3 className="font-bold text-lg text-white mb-1">
                Spin the Wheel
              </h3>
              <p className="text-sm text-white mb-3">
                Try your luck for daily bonus rewards.
              </p>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">~30 sec</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">Easy</span>
                </div>
              </div>

              <div className="flex items-center justify-between font-semibold text-green-600">
                <p>+$0.05</p>

                <button className="bg-primary  text-white text-lg px-4 py-2 rounded-lg font-medium">
                  Spin
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Spin the Wheel */}
        <div className="bg-gray-100/10 shadow rounded-xl p-4">
          <div className=" flex items-start justify-between mb-3">
            <div className="w-full">
              <h3 className="font-bold text-lg text-white mb-1">
                Spin the Wheel
              </h3>
              <p className="text-sm text-white mb-3">
                Try your luck for daily bonus rewards.
              </p>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">~30 sec</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">Easy</span>
                </div>
              </div>

              <div className="flex items-center justify-between font-semibold text-green-600">
                <p>+$0.05</p>

                <button className="bg-primary  text-white text-lg px-4 py-2 rounded-lg font-medium">
                  Spin
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Spin the Wheel */}
        <div className="bg-gray-100/10 shadow rounded-xl p-4">
          <div className=" flex items-start justify-between mb-3">
            <div className="w-full">
              <h3 className="font-bold text-lg text-white mb-1">
                Spin the Wheel
              </h3>
              <p className="text-sm text-white mb-3">
                Try your luck for daily bonus rewards.
              </p>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">~30 sec</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">Easy</span>
                </div>
              </div>

              <div className="flex items-center justify-between font-semibold text-green-600">
                <p>+$0.05</p>

                <button className="bg-primary  text-white text-lg px-4 py-2 rounded-lg font-medium">
                  Spin
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Spin the Wheel */}
        <div className="bg-gray-100/10 shadow rounded-xl p-4">
          <div className=" flex items-start justify-between mb-3">
            <div className="w-full">
              <h3 className="font-bold text-lg text-white mb-1">
                Spin the Wheel
              </h3>
              <p className="text-sm text-white mb-3">
                Try your luck for daily bonus rewards.
              </p>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">~30 sec</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">Easy</span>
                </div>
              </div>

              <div className="flex items-center justify-between font-semibold text-green-600">
                <p>+$0.05</p>

                <button className="bg-primary  text-white text-lg px-4 py-2 rounded-lg font-medium">
                  Spin
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Spin the Wheel */}
        <div className="bg-gray-100/10 shadow rounded-xl p-4">
          <div className=" flex items-start justify-between mb-3">
            <div className="w-full">
              <h3 className="font-bold text-lg text-white mb-1">
                Spin the Wheel
              </h3>
              <p className="text-sm text-white mb-3">
                Try your luck for daily bonus rewards.
              </p>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">~30 sec</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">Easy</span>
                </div>
              </div>

              <div className="flex items-center justify-between font-semibold text-green-600">
                <p>+$0.05</p>

                <button className="bg-primary  text-white text-lg px-4 py-2 rounded-lg font-medium">
                  Spin
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Spin the Wheel */}
        <div className="bg-gray-100/10 shadow rounded-xl p-4">
          <div className=" flex items-start justify-between mb-3">
            <div className="w-full">
              <h3 className="font-bold text-lg text-white mb-1">
                Spin the Wheel
              </h3>
              <p className="text-sm text-white mb-3">
                Try your luck for daily bonus rewards.
              </p>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">~30 sec</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">Easy</span>
                </div>
              </div>

              <div className="flex items-center justify-between font-semibold text-green-600">
                <p>+$0.05</p>

                <button className="bg-primary  text-white text-lg px-4 py-2 rounded-lg font-medium">
                  Spin
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Spin the Wheel */}
        <div className="bg-gray-100/10 shadow rounded-xl p-4">
          <div className=" flex items-start justify-between mb-3">
            <div className="w-full">
              <h3 className="font-bold text-lg text-white mb-1">
                Spin the Wheel
              </h3>
              <p className="text-sm text-white mb-3">
                Try your luck for daily bonus rewards.
              </p>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">~30 sec</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">Easy</span>
                </div>
              </div>

              <div className="flex items-center justify-between font-semibold text-green-600">
                <p>+$0.05</p>

                <button className="bg-primary  text-white text-lg px-4 py-2 rounded-lg font-medium">
                  Spin
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Spin the Wheel */}
        <div className="bg-gray-100/10 shadow rounded-xl p-4">
          <div className=" flex items-start justify-between mb-3">
            <div className="w-full">
              <h3 className="font-bold text-lg text-white mb-1">
                Spin the Wheel
              </h3>
              <p className="text-sm text-white mb-3">
                Try your luck for daily bonus rewards.
              </p>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">~30 sec</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">Easy</span>
                </div>
              </div>

              <div className="flex items-center justify-between font-semibold text-green-600">
                <p>+$0.05</p>

                <button className="bg-primary  text-white text-lg px-4 py-2 rounded-lg font-medium">
                  Spin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
