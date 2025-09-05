/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import type { TUser } from "../types";
import { Lock } from "lucide-react";

type Props = React.PropsWithChildren<{
  required: TUser[];
  current?: TUser;
  title?: string;
  onRetry?: () => void;
}>;

/** Unauthorized screen with optional children & retry action */
export function UnauthorizedScreen({
  required,
  current,
  title = "Unauthorized",
  onRetry,
  children,
}: Props) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 p-6 text-center">
      <Lock className="h-8 w-8 text-muted-foreground" />
      <h2 className="text-base font-semibold">{title}</h2>

      <p className="text-sm text-muted-foreground">
        Required: <b>{(required ?? []).join(", ") || "N/A"}</b>
        {" • "}
        Yours: <b>{(current as any) ?? "unknown"}</b>
      </p>

      {children ? <div className="mt-1 w-full max-w-md">{children}</div> : null}

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
        >
          Try again
        </button>
      )}
    </div>
  );
}
