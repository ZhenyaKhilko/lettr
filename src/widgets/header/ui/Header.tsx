import { Link, useNavigate } from 'react-router-dom';
import { GOAL_COUNT, APP_ROUTES } from '@/shared/config/constants';
import { Button, GoalProgress } from '@/shared/ui';

type HeaderProps = {
  count: number;
};

export function Header({ count }: HeaderProps) {
  const navigate = useNavigate();
  const displayCount = Math.min(count, GOAL_COUNT);
  const completed = count >= GOAL_COUNT;

  return (
    <header className='flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
      <Link
        to={APP_ROUTES.dashboard}
        aria-label='Back to applications'>
        <img
          src='/assets/logo.svg'
          alt='Application Letters'
          className='h-12 w-[179px]'
        />
      </Link>
      <div className='flex items-center justify-end gap-6'>
        <div className='flex items-center gap-4'>
          <span
            className='text-sm leading-6 text-gray-500 sm:text-base sm:leading-7 lg:text-lg'
            aria-live='polite'>
            {displayCount}/{GOAL_COUNT} applications generated
          </span>
          {completed ? (
            <img
              src='/assets/icon-check.svg'
              alt=''
              className='h-7 w-7 shrink-0'
              aria-hidden
            />
          ) : (
            <GoalProgress
              total={GOAL_COUNT}
              current={displayCount}
            />
          )}
        </div>
        <Button
          variant='icon'
          aria-label='Home'
          onClick={() => navigate(APP_ROUTES.dashboard)}
          icon={
            <img
              src='/assets/icon-home.svg'
              alt=''
              className='h-5 w-5'
            />
          }
        />
      </div>
    </header>
  );
}
