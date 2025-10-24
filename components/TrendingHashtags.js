import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HashtagIcon, TrendingUpIcon } from '@heroicons/react/outline';
import baseUrl from '../utils/baseUrl';

const TrendingHashtags = ({ className = "" }) => {
  const [trendingHashtags, setTrendingHashtags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingHashtags = async () => {
      try {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('token='))
          ?.split('=')[1];

        const response = await fetch(`${baseUrl}/api/posts/trending/hashtags`, {
          headers: { Authorization: token }
        });
        
        if (response.ok) {
          const data = await response.json();
          setTrendingHashtags(data);
        }
      } catch (error) {
        console.error('Error fetching trending hashtags:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingHashtags();
  }, []);

  if (loading) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-3"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (trendingHashtags.length === 0) {
    return null;
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 ${className}`}>
      <div className="flex items-center space-x-2 mb-3">
        <TrendingUpIcon className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Trending Hashtags
        </h3>
      </div>
      
      <div className="space-y-2">
        {trendingHashtags.slice(0, 5).map((hashtag, index) => (
          <Link key={hashtag._id} href={`/hashtag/${hashtag._id}`} passHref>
            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  #{index + 1}
                </span>
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  #{hashtag._id}
                </span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {hashtag.count} posts
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingHashtags;
