/* eslint-disable @typescript-eslint/ban-ts-comment */
export function RequireTelegramScreen({
  title = "Open inside Telegram",
  subtitle = "এই মিনিঅ্যাপটি Telegram এর ভেতর থেকে চালাতে হবে। দয়া করে বট থেকে পুনরায় খুলুন।",
  onRetry,
  deepLink, // ঐচ্ছিক: তোমার বট deep link দিতে পারো
}: {
  title?: string;
  subtitle?: string;
  onRetry?: () => void;
  deepLink?: string;
}) {
  const isInTelegram =
    typeof window !== "undefined" &&
    // @ts-ignore
    !!window?.Telegram?.WebApp?.initDataUnsafe?.user?.id;

  return (
    <div className="min-h-dvh grid place-items-center bg-neutral-950 text-neutral-100 p-6">
      <div className="max-w-md w-full rounded-2xl bg-neutral-900/60 backdrop-blur p-6 border border-white/10">
        <h1 className="text-xl font-semibold mb-2">{title}</h1>
        <p className="text-sm text-neutral-300 mb-5">{subtitle}</p>

        <ul className="text-sm space-y-2 mb-6 list-disc pl-5 text-neutral-300">
          <li>ব্রাউজার না, Telegram অ্যাপ থেকে খুলুন।</li>
          <li>ইন্টারনেট ঠিক আছে কিনা দেখুন, তারপর Retry দিন।</li>
          <li>
            {isInTelegram
              ? "Telegram context পাওয়া গেছে, আবার চেষ্টা করুন।"
              : "Telegram context পাওয়া যাচ্ছে না।"}
          </li>
        </ul>

        <div className="flex gap-3">
          {deepLink && (
            <a
              href={deepLink}
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 bg-white text-black font-medium"
            >
              Open Bot
            </a>
          )}
          <button
            onClick={onRetry}
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 bg-neutral-800 hover:bg-neutral-700"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}
