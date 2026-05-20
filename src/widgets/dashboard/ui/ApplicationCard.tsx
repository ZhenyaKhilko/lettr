import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui';
import type { Letter } from '@/entities/letter/model/types';
import { getLetterRoute } from '@/shared/config/routes';

type ApplicationCardProps = {
  letter: Letter;
  onDelete: (id: string) => void;
  onCopy: (text: string) => void;
};

export function ApplicationCard({ letter, onDelete, onCopy }: ApplicationCardProps) {
  const previewContent = letter.content
    .split('\n')
    .filter((line) => !/^\s*(\.\.\.|…)\s*$/.test(line))
    .join('\n');

  return (
    <article className='relative flex h-60 w-full cursor-pointer flex-col justify-between overflow-hidden rounded-xl bg-gray-50 p-5'>
      <Link
        to={getLetterRoute(letter.id)}
        className='absolute inset-0 z-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2'
        aria-label={`Open application for ${letter.jobTitle} at ${letter.company}`}
      />
      <div className='relative z-10 flex-1 overflow-hidden pointer-events-none'>
        <p className='m-0 whitespace-pre-line text-lg leading-7 text-gray-500'>
          {previewContent}
        </p>
        <div
          className='pointer-events-none absolute bottom-0 left-0 right-0 h-12'
          style={{
            background: 'linear-gradient(180deg, rgba(242, 244, 247, 0) 0%, #F2F4F7 100%)',
          }}
          aria-hidden
        />
      </div>
      <footer
        className='z-10 flex items-center justify-between'
        onClick={(e) => e.stopPropagation()}>
        <Button
          variant='ghostInline'
          icon={
            <img
              src='/assets/icon-trash.svg'
              alt=''
            />
          }
          iconPosition='left'
          onClick={() => onDelete(letter.id)}
          aria-label={`Delete application for ${letter.jobTitle}`}>
          Delete
        </Button>
        <Button
          variant='ghostInline'
          icon={
            <img
              src='/assets/icon-copy.svg'
              alt=''
            />
          }
          iconPosition='right'
          onClick={() => onCopy(letter.content)}
          aria-label={`Copy application for ${letter.company}`}>
          Copy to clipboard
        </Button>
      </footer>
    </article>
  );
}
