import type { ReactNode } from "react";

type PageLayoutProps = {
  children: ReactNode;
};

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-8 md:px-12 lg:px-40 lg:pb-[120px]">
      <div className="flex w-full max-w-[1120px] flex-col gap-8">{children}</div>
    </main>
  );
}
