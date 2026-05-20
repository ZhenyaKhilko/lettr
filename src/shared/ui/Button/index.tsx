import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import { LoadingSpinner } from './LoadingSpinner';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'ghostInline' | 'icon';
type ButtonSize = 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  loadingLabel?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border-green-600 bg-green-600 text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-[#066a37] disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed',
  secondary:
    'border-gray-300 bg-white text-gray-700 shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-gray-50 disabled:border-gray-300 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed',
  ghost:
    'border-transparent bg-transparent text-gray-600 shadow-none hover:text-gray-900 disabled:opacity-70 disabled:cursor-not-allowed',
  ghostInline:
    'border-transparent bg-transparent text-gray-600 shadow-none hover:text-gray-900 disabled:opacity-70 disabled:cursor-not-allowed p-0',
  icon: 'border-gray-300 bg-white text-gray-900 shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-gray-50 disabled:border-gray-300 disabled:bg-gray-50 disabled:opacity-70 disabled:cursor-not-allowed',
};

const sizeClasses: Record<ButtonVariant, Record<ButtonSize, string>> = {
  primary: {
    md: 'gap-2 px-[18px] py-2.5 text-base font-semibold',
    lg: 'gap-3 px-7 py-4 text-lg font-semibold',
  },
  secondary: {
    md: 'gap-2 px-[18px] py-2.5 text-base font-semibold',
    lg: 'gap-3 px-7 py-4 text-lg font-semibold',
  },
  ghost: {
    md: 'gap-2 px-[18px] py-2.5 text-base font-semibold',
    lg: 'gap-3 px-7 py-4 text-lg font-semibold',
  },
  ghostInline: {
    md: 'gap-2 text-base font-semibold',
    lg: 'gap-3 text-lg font-semibold',
  },
  icon: {
    md: 'p-2.5',
    lg: 'p-2.5',
  },
};

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  loadingLabel = 'Loading',
  children,
  className = '',
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const hasLeftIcon = Boolean(icon && iconPosition === 'left');
  const hasRightIcon = Boolean(icon && iconPosition === 'right');
  const shouldRenderText = children !== undefined && children !== null;
  const textSlotHeightClass = size === 'lg' ? 'h-7' : 'h-6';
  const iconSlotSizeClass = size === 'lg' ? 'h-6 w-6' : 'h-5 w-5';

  return (
    <button
      {...props}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      aria-live={loading ? 'polite' : undefined}
      className={cn(
        'inline-flex items-center justify-center rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2',
        variantClasses[variant],
        sizeClasses[variant][size],
        loading &&
          variant === 'primary' &&
          'border-green-600 bg-green-600 text-white hover:bg-green-600 disabled:border-green-600 disabled:bg-green-600 disabled:text-white',
        loading && 'cursor-wait',
        className,
      )}>
      {loading ? (
        <span className={cn(variant === 'primary' ? 'text-white' : 'text-gray-700')}>
          <LoadingSpinner />
        </span>
      ) : (
        <>
          {hasLeftIcon && (
            <span className={cn('flex shrink-0 [&_img]:h-full [&_img]:w-full', iconSlotSizeClass)}>
              {icon}
            </span>
          )}
          {shouldRenderText && (
            <span
              className={cn(
                'inline-flex items-center justify-center pt-[3px] text-center leading-none',
                textSlotHeightClass,
              )}>
              {children}
            </span>
          )}
          {hasRightIcon && (
            <span className={cn('flex shrink-0 [&_img]:h-full [&_img]:w-full', iconSlotSizeClass)}>
              {icon}
            </span>
          )}
        </>
      )}
      {loading && <span className='sr-only'>{loadingLabel}</span>}
    </button>
  );
}
