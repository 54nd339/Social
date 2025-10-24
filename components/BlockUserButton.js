import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { NoSymbolIcon } from '@heroicons/react/outline';
import { NoSymbolIcon as NoSymbolIconSolid } from '@heroicons/react/solid';
import baseUrl from '../utils/baseUrl';

const BlockUserButton = ({ userId, username, isBlocked, onBlockChange }) => {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);

  const handleBlock = async () => {
    setLoading(true);
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

      if (isBlocked) {
        await fetch(`${baseUrl}/api/block/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        });
        onBlockChange(false);
      } else {
        await fetch(`${baseUrl}/api/block/${userId}`, {
          method: 'POST',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        });
        onBlockChange(true);
      }
    } catch (error) {
      console.error('Error updating block status:', error);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleBlock}
      disabled={loading}
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        isBlocked
          ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
      }`}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
      ) : isBlocked ? (
        <NoSymbolIconSolid className="h-4 w-4" />
      ) : (
        <NoSymbolIcon className="h-4 w-4" />
      )}
      <span>{isBlocked ? 'Unblock' : 'Block'} {username}</span>
    </button>
  );
};

export default BlockUserButton;
