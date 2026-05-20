import { useCallback, useState } from "react";
import { copyToClipboard } from "../lib/clipboard";

type CopyStatus = "idle" | "success" | "error";

export function useClipboard(timeoutMs = 1800) {
  const [status, setStatus] = useState<CopyStatus>("idle");

  const copy = useCallback(
    async (text: string) => {
      const ok = await copyToClipboard(text);
      setStatus(ok ? "success" : "error");

      window.setTimeout(() => setStatus("idle"), timeoutMs);
      return ok;
    },
    [timeoutMs],
  );

  return { status, copy };
}
