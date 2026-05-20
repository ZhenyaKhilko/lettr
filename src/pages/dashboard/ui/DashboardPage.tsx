import { useNavigate } from "react-router-dom";
import { ApplicationCard } from "@/widgets/dashboard/ui/ApplicationCard";
import { GoalBanner } from "@/widgets/dashboard/ui/GoalBanner";
import { Header } from "@/widgets/header/ui/Header";
import { Button, PageLayout } from "@/shared/ui";
import { useLetters } from "@/entities/letter/model/context/LettersContext";
import { GOAL_COUNT, APP_ROUTES } from "@/shared/config/constants";
import { useClipboard } from "@/shared/hooks/useClipboard";

export function DashboardPage() {
  const navigate = useNavigate();
  const { letters, isLoading, deleteLetter } = useLetters();
  const { status, copy } = useClipboard();

  const count = letters.length;
  const showGoal = count < GOAL_COUNT;

  const handleCopy = async (text: string) => {
    await copy(text);
  };

  return (
    <PageLayout>
      <Header count={count} />
      <section className="flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <header className="flex flex-col gap-4 border-b border-gray-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="m-0 font-display text-3xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl lg:leading-[60px]">
              Applications
            </h1>
            <Button
              className="w-fit self-start sm:self-auto"
              icon={<img src="/assets/icon-plus.svg" alt="" />}
              iconPosition="left"
              onClick={() => navigate(APP_ROUTES.create)}
            >
              Create New
            </Button>
          </header>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex h-60 w-full animate-pulse flex-col justify-between rounded-xl bg-gray-100 p-6"
                  aria-hidden="true"
                >
                  <div className="flex flex-col gap-3">
                    <div className="h-6 w-2/3 rounded bg-gray-200" />
                    <div className="h-4 w-1/2 rounded bg-gray-200" />
                  </div>
                  <div className="flex-1 py-4">
                    <div className="mb-2 h-4 w-full rounded bg-gray-200" />
                    <div className="h-4 w-5/6 rounded bg-gray-200" />
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="h-8 w-20 rounded bg-gray-200" />
                    <div className="h-8 w-32 rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : letters.length === 0 ? (
            <p className="m-0 text-lg leading-7 text-gray-500">
              No applications yet. Create your first one to get started.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              {letters.map((letter) => (
                <ApplicationCard
                  key={letter.id}
                  letter={letter}
                  onDelete={deleteLetter}
                  onCopy={handleCopy}
                />
              ))}
            </div>
          )}
        </div>

        {!isLoading && showGoal && <GoalBanner count={count} />}
        <p className="m-0 text-sm text-gray-600" aria-live="polite">
          {status === "success" && "Letter copied to clipboard."}
          {status === "error" && "Could not copy letter. Check browser permissions."}
        </p>
      </section>
    </PageLayout>
  );
}
