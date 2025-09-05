/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "../components/Loading";
import { PodiumItem } from "../components/modules/Leaderboard/PodiumItem";
import { useLeaderboardQuery } from "../redux/features/referral/referralApi";

const Leaderboard = () => {
  const { data, isLoading } = useLeaderboardQuery(undefined);

  function getInitials(name?: string, max = 2) {
    if (!name) return "?";
    return (
      name
        .trim()
        .split(/\s+/)
        .slice(0, max)
        .map((w) => w[0]?.toUpperCase() ?? "")
        .join("") || "?"
    );
  }

  // stable pseudo-random color from a string
  const colorFor = (seed = "?") => {
    let h = 0;
    for (let i = 0; i < seed.length; i++)
      h = (h * 31 + seed.charCodeAt(i)) % 360;
    const s = 65; // %
    const l = 45; // %
    return `hsl(${h} ${s}% ${l}%)`;
  };

  // const me = data?.data?.me;
  // const fullName = [me?.firstName, me?.lastName].filter(Boolean).join(" ");

  const top3 = ((data?.data?.leaderboard as any[]) ?? []).slice(0, 3);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <p className="text-xl font-semibold text-center mb-5">Leaderboard</p>

      {/* Me card (optional) */}
      {/* ... (your existing “me” card here if you want) ... */}

      {/* ---- Top 3 podium (center up, sides down) + medals ---- */}
      <div className="mt-5 flex items-end justify-center gap-6">
        {(() => {
          const u1 = top3[0]; // 1st (center)
          const u2 = top3[1]; // 2nd (left)
          const u3 = top3[2]; // 3rd (right)
          const name = (u: any) =>
            [u?.firstName, u?.lastName].filter(Boolean).join(" ");
          const pts = (u: any) =>
            typeof u?.balance === "number" ? u.balance : 0;

          return (
            <>
              {/* 2nd (left) — a bit lower */}
              {u2 && (
                <div className="flex flex-col items-center translate-y-1 md:translate-y-5">
                  <PodiumItem
                    name={name(u2)}
                    points={pts(u2)}
                    rank={2}
                    big={false}
                    colorFor={colorFor}
                    getInitials={getInitials}
                  />
                </div>
              )}

              {/* 1st (center) — a bit higher */}
              {u1 && (
                <div className="flex flex-col items-center -translate-y-4 mt-5 md:-translate-y-6">
                  <PodiumItem
                    name={name(u1)}
                    points={pts(u1)}
                    rank={1}
                    big
                    colorFor={colorFor}
                    getInitials={getInitials}
                    // if your PodiumItem supports props like offset/badgeDown you can pass them too
                  />
                </div>
              )}

              {/* 3rd (right) — a bit lower */}
              {u3 && (
                <div className="flex flex-col items-center translate-y-1 md:translate-y-5">
                  <PodiumItem
                    name={name(u3)}
                    points={pts(u3)}
                    rank={3}
                    big={false}
                    colorFor={colorFor}
                    getInitials={getInitials}
                  />
                </div>
              )}
            </>
          );
        })()}
      </div>
    </div>
  );
};

export default Leaderboard;
