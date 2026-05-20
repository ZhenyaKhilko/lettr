export function LoadingSpinner() {
  return (
    <svg viewBox="0 0 22 22" className="h-[22px] w-[22px] animate-spin" aria-hidden>
      <path
        d="M11 1V5M11 17V21M5 11H1M21 11H17M18.0784 18.0784L15.25 15.25M18.0784 3.99994L15.25 6.82837M3.92157 18.0784L6.75 15.25M3.92157 3.99994L6.75 6.82837"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
