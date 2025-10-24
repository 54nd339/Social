import React from 'react';
import Link from 'next/link';
import { HashtagIcon } from '@heroicons/react/outline';

const HashtagDisplay = ({ hashtags, className = "" }) => {
  if (!hashtags || hashtags.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 mt-2 ${className}`}>
      {hashtags.map((hashtag, index) => (
        <Link key={index} href={`/hashtag/${hashtag}`} passHref>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 cursor-pointer transition-colors">
            <HashtagIcon className="h-3 w-3 mr-1" />
            {hashtag}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default HashtagDisplay;
