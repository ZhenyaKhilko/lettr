import { useNavigate } from "react-router-dom";
import { APP_ROUTES, GOAL_COUNT } from "@/shared/config/constants";
import { Button, GoalProgress } from "@/shared/ui";

type GoalBannerProps = {
  count: number;
};

export function GoalBanner({ count }: GoalBannerProps) {
  const navigate = useNavigate();

  return (
    <section className="flex w-full flex-col items-center gap-8 rounded-xl bg-green-50 px-6 py-10 md:px-16 md:py-14">
      <div className="flex max-w-[480px] flex-col items-center gap-4 text-center">
        <h2 className="m-0 font-display text-3xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-4xl sm:leading-[44px]">
          Hit your goal
        </h2>
        <p className="m-0 text-lg leading-7 text-gray-500">
          Generate and send out couple more job applications today to get hired faster
        </p>
        <Button
          size="lg"
          icon={
            <img
              src="/assets/icon-plus.svg"
              alt=""
              className="h-6 w-6"
            />
          }
          iconPosition="left"
          onClick={() => navigate(APP_ROUTES.create)}
        >
          Create New
        </Button>
      </div>
      <div className="flex flex-col items-center gap-2">
        <GoalProgress total={GOAL_COUNT} current={count} dotClassName="w-8 rounded" />
        <span className="text-lg leading-7 text-gray-500" aria-live="polite">
          {count} out of {GOAL_COUNT}
        </span>
      </div>
    </section>
  );
}
