import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ReactionDisplay = ({ reactions, onReactionClick }) => {
  const { isDarkMode } = useTheme();

  const reactionEmojis = {
    like: '👍',
    love: '❤️',
    laugh: '😂',
    wow: '😮',
    sad: '😢',
    angry: '😠'
  };

  // Group reactions by type
  const reactionGroups = reactions.reduce((acc, reaction) => {
    if (!acc[reaction.type]) {
      acc[reaction.type] = [];
    }
    acc[reaction.type].push(reaction);
    return acc;
  }, {});

  const reactionTypes = Object.keys(reactionGroups);

  if (reactionTypes.length === 0) return null;

  return (
    <div className="flex items-center space-x-1">
      {reactionTypes.slice(0, 3).map((type) => (
        <button
          key={type}
          onClick={() => onReactionClick && onReactionClick(type)}
          className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          <span className="text-sm">{reactionEmojis[type]}</span>
          <span>{reactionGroups[type].length}</span>
        </button>
      ))}
      {reactionTypes.length > 3 && (
        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          +{reactionTypes.length - 3} more
        </span>
      )}
    </div>
  );
};

export default ReactionDisplay;
