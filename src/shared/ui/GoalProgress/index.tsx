import { cn } from "@/shared/lib/cn";

type GoalProgressProps = {
  total: number;
  current: number;
  dotClassName?: string;
};

export function GoalProgress({ total, current, dotClassName }: GoalProgressProps) {
  return (
    <span className="flex items-center gap-1" aria-hidden>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-2 w-2 rounded-full bg-gray-900",
            i < current ? "opacity-100" : "opacity-24",
            dotClassName,
          )}
        />
      ))}
    </span>
  );
}
