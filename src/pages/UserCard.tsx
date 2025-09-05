/* eslint-disable @typescript-eslint/no-explicit-any */
type TgUser = {
  id: number;
  is_bot?: boolean;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
};

export default function UserCard({
  user,
  error,
}: {
  user: TgUser | null;
  error?: string | null;
}) {
  const fullName =
    (user?.first_name ?? "") + (user?.last_name ? ` ${user?.last_name}` : "");

  const avatar = user?.photo_url
    ? user.photo_url
    : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        fullName || user?.username || "TG User"
      )}`;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6 shadow-[0_10px_40px_-20px_rgba(0,0,0,.6)]">
      <h2 className="text-xl font-semibold mb-4">User Details</h2>

      {!user && !error && (
        <div className="animate-pulse space-y-3">
          <div className="h-16 w-16 rounded-2xl bg-white/10" />
          <div className="h-4 w-2/3 rounded bg-white/10" />
          <div className="h-3 w-1/2 rounded bg-white/10" />
          <div className="h-3 w-1/3 rounded bg-white/10" />
        </div>
      )}

      {error && <div className="text-red-300 text-sm mb-3">⚠️ {error}</div>}

      {user && (
        <>
          <div className="flex items-center gap-4 mb-4">
            <img
              src={avatar}
              alt="avatar"
              className="h-16 w-16 rounded-2xl object-cover border border-white/10"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="text-lg font-semibold">
                {fullName || "Telegram User"}
              </p>
              <p className="text-white/60 text-sm">
                {user.username ? `@${user.username}` : "No username"}
              </p>
            </div>
          </div>

          <ul className="grid grid-cols-1 gap-2 text-sm">
            <li className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <span className="text-white/60">User ID</span>
              <span className="font-medium">{user.id}</span>
            </li>
            <li className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <span className="text-white/60">Language</span>
              <span className="font-medium">{user.language_code || "N/A"}</span>
            </li>
            <li className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <span className="text-white/60">Premium</span>
              <span className="font-medium">
                {user.is_premium ? "Yes" : "No"}
              </span>
            </li>
            <li className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <span className="text-white/60">Bot?</span>
              <span className="font-medium">{user.is_bot ? "Yes" : "No"}</span>
            </li>
          </ul>

          <div className="mt-4 text-xs text-white/60">
            Tip: verify <code>initData</code> hash on your server before
            trusting these fields.
          </div>
        </>
      )}
    </div>
  );
}
