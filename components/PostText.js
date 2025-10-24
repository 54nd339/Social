import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const PostText = ({ text, className = "" }) => {
  const router = useRouter();

  // Function to process text and convert hashtags and mentions to clickable links
  const processText = (text) => {
    if (!text) return '';

    // Split text by hashtags and mentions
    const parts = text.split(/(#[\w\u0590-\u05ff]+|@[\w]+)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('#')) {
        const hashtag = part.substring(1);
        return (
          <Link key={index} href={`/hashtag/${hashtag}`} passHref>
            <span className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer">
              {part}
            </span>
          </Link>
        );
      } else if (part.startsWith('@')) {
        const username = part.substring(1);
        return (
          <Link key={index} href={`/${username}`} passHref>
            <span className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer">
              {part}
            </span>
          </Link>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  };

  return (
    <p className={className}>
      {processText(text)}
    </p>
  );
};

export default PostText;
