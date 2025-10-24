import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ReactionPicker = ({ postId, userReaction, onReactionChange }) => {
  const { isDarkMode } = useTheme();
  const [showPicker, setShowPicker] = useState(false);

  const reactions = [
    { type: 'like', emoji: '👍', label: 'Like' },
    { type: 'love', emoji: '❤️', label: 'Love' },
    { type: 'laugh', emoji: '😂', label: 'Laugh' },
    { type: 'wow', emoji: '😮', label: 'Wow' },
    { type: 'sad', emoji: '😢', label: 'Sad' },
    { type: 'angry', emoji: '😠', label: 'Angry' }
  ];

  const handleReaction = async (reactionType) => {
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

      if (userReaction === reactionType) {
        // Remove reaction
        await fetch(`/api/posts/reaction/${postId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        });
        onReactionChange(null);
      } else {
        // Add/change reaction
        await fetch(`/api/posts/reaction/${postId}`, {
          method: 'POST',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ type: reactionType })
        });
        onReactionChange(reactionType);
      }
    } catch (error) {
      console.error('Error updating reaction:', error);
    }
    setShowPicker(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowPicker(!showPicker)}
        className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
          userReaction ? 'bg-blue-50 dark:bg-blue-900/20' : ''
        }`}
      >
        <span className="text-lg">
          {userReaction 
            ? reactions.find(r => r.type === userReaction)?.emoji || '👍'
            : '👍'
          }
        </span>
      </button>

      {showPicker && (
        <div className={`absolute bottom-full left-0 mb-2 p-2 rounded-lg shadow-lg border ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex space-x-2">
            {reactions.map((reaction) => (
              <button
                key={reaction.type}
                onClick={() => handleReaction(reaction.type)}
                className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all transform hover:scale-110 ${
                  userReaction === reaction.type 
                    ? 'bg-blue-100 dark:bg-blue-900/30' 
                    : ''
                }`}
                title={reaction.label}
              >
                <span className="text-xl">{reaction.emoji}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReactionPicker;
