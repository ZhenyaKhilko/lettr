import { Button } from "@/shared/ui";

type GeneratorPreviewProps = {
  content: string | null;
  loading: boolean;
  error: string | null;
  copyStatus: "idle" | "success" | "error";
  onCopy: () => void;
  onRetry: () => void;
};

export function GeneratorPreview({
  content,
  loading,
  error,
  copyStatus,
  onCopy,
  onRetry,
}: GeneratorPreviewProps) {
  const hasContent = Boolean(content);
  const showActions = hasContent && !loading && !error;

  return (
    <aside className="relative flex h-[400px] w-full min-h-[400px] min-w-0 flex-col justify-between overflow-hidden rounded-xl bg-gray-50 p-6 md:h-[600px] md:min-h-[600px]">
      {loading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-50 z-20"
          aria-busy="true"
          aria-label="Generating application"
        >
          <div className="relative flex h-full w-full items-center justify-center">
            <div
              className="absolute h-40 w-40 rounded-full blur-[80px]"
              style={{
                background:
                  "radial-gradient(circle, rgba(9, 146, 80, 0.35) 0%, transparent 70%)",
              }}
            />
            <div
              className="relative h-20 w-20 shrink-0 animate-spin rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 74% 22%, #fff 0%, rgba(255,255,255,0.16) 100%), radial-gradient(circle at 0% 0%, #fff 0%, #d0d5dd 100%)",
                boxShadow: "inset 0 -2px 32px rgba(16, 24, 40, 0.08)",
                animationDuration: "3s",
              }}
            />
          </div>
        </div>
      )}

      {loading && <div className="flex-1" aria-hidden="true" />}

      {!loading && error && (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50" aria-hidden>
            <span className="text-xl font-bold text-red-500">!</span>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-gray-900">Generation Failed</h3>
            <p className="text-sm text-gray-500 max-w-sm">{error}</p>
          </div>
          <Button variant="primary" onClick={onRetry}>
            Try Again
          </Button>
        </div>
      )}

      {!loading && !error && !hasContent && (
        <p className="m-0 text-lg leading-7 text-gray-500">
          Your personalized job application will appear here...
        </p>
      )}

      {!loading && !error && hasContent && (
        <div className="relative flex-1 overflow-y-auto overflow-x-hidden pr-1">
          <p className="m-0 whitespace-pre-line text-lg leading-7 text-gray-500 wrap-anywhere">
            {content}
          </p>
          <div
            className="pointer-events-none sticky bottom-0 left-0 right-0 h-10 bg-linear-to-b from-gray-50/0 to-gray-50"
            aria-hidden
          />
        </div>
      )}

      {showActions && (
        <>
          <footer className="flex justify-end pt-4 border-t border-gray-200/50 mt-2 bg-gray-50 z-10">
            <Button
              variant="ghost"
              icon={<img src="/assets/icon-copy.svg" alt="" />}
              iconPosition="right"
              onClick={onCopy}
            >
              Copy to clipboard
            </Button>
          </footer>

          <p className="m-0 text-sm text-gray-600 animate-fade-in" aria-live="polite">
            {copyStatus === "success" && "Letter copied to clipboard."}
            {copyStatus === "error" && "Could not copy letter. Check browser permissions."}
          </p>
        </>
      )}
    </aside>
  );
}
