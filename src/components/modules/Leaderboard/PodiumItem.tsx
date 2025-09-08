import { Crown, Medal } from "lucide-react";

type PodiumItemProps = {
  name: string;
  points: number;
  rank: 1 | 2 | 3;
  big?: boolean;
  colorFor: (s?: string) => string;
  getInitials: (s?: string, max?: number) => string;
  /** optional vertical offset classes for whole item (e.g. -translate-y-4) */
  offset?: string;
  /** push the rank badge a bit further down on the avatar */
  badgeDown?: boolean;
};

/** tiny rank medal with number (gold/silver/bronze) */
function RankBadge({ rank, size = 28 }: { rank: number; size?: number }) {
  const grad =
    rank === 1
      ? "from-amber-300 to-orange-500" // gold
      : rank === 2
      ? "from-slate-200 to-slate-400" // silver
      : "from-amber-700 to-amber-600"; // bronze;
  const bubble = Math.max(18, Math.round(size * 0.44));

  return (
    <div
      className="relative inline-grid place-items-center"
      style={{ width: size, height: size }}
      aria-label={`Rank ${rank}`}
      title={`Rank ${rank}`}
    >
      <div
        className={`w-full h-full rounded-xl bg-gradient-to-br ${grad} shadow ring-1 ring-black/10`}
      >
        <div className="w-full h-full rounded-xl grid place-items-center bg-white/20">
          <Medal className="w-[70%] h-[70%] text-white/80 drop-shadow" />
        </div>
      </div>
      <div
        className="absolute grid place-items-center rounded-full bg-white text-slate-700 font-extrabold ring-2 ring-white/70 shadow"
        style={{ width: bubble, height: bubble }}
      >
        <span className="text-[0.7rem] leading-none">{rank}</span>
      </div>
    </div>
  );
}

export function PodiumItem({
  name,
  points,
  rank,
  big,
  colorFor,
  getInitials,
  offset = "",
  badgeDown = false,
}: PodiumItemProps) {
  const size = big ? 64 : 48; // avatar size
  const ringWidth = 4; // outer ring thickness
  const inner = size - ringWidth * 2; // inner circle size
  const badgeSize = big ? 30 : 26; // <-- medal size on avatar

  return (
    <div className={`flex flex-col items-center gap-2 ${offset}`}>
      <div className="relative">
        {/* crown only for #1 */}
        {rank === 1 && (
          <span className="absolute -top-4 left-1/2 -translate-x-1/2">
            <Crown className="h-6 w-6 text-lime-400 drop-shadow" />
          </span>
        )}

        {/* avatar with lime ring */}
        <div
          className="relative grid place-items-center rounded-full ring-4 ring-lime-400/70 shadow-lg"
          style={{ width: size, height: size }}
        >
          <div
            className="grid place-items-center rounded-full text-white font-bold"
            style={{
              width: inner,
              height: inner,
              background: colorFor(name),
            }}
          >
            {getInitials(name)}
          </div>

          {/* ⬇️ previous numeric bubble REPLACED WITH MEDAL BADGE */}
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{ bottom: badgeDown ? -14 : -10 }}
          >
            <RankBadge rank={rank} size={badgeSize} />
          </div>
        </div>
      </div>

      {/* name & points */}
      <div className="text-center">
        <p className="font-semibold max-w-[8.5rem] truncate">{name || "—"}</p>
        <p className="text-sm text-white/70">{points.toLocaleString()} </p>
      </div>
    </div>
  );
}
