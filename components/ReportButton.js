import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FlagIcon } from '@heroicons/react/outline';
import { FlagIcon as FlagIconSolid } from '@heroicons/react/solid';
import baseUrl from '../utils/baseUrl';

const ReportButton = ({ 
  reportedUser, 
  reportedPost, 
  reportedComment, 
  onReport 
}) => {
  const { isDarkMode } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const reportReasons = [
    { value: 'spam', label: 'Spam' },
    { value: 'harassment', label: 'Harassment' },
    { value: 'hate_speech', label: 'Hate Speech' },
    { value: 'violence', label: 'Violence' },
    { value: 'nudity', label: 'Nudity' },
    { value: 'fake_news', label: 'Fake News' },
    { value: 'copyright', label: 'Copyright' },
    { value: 'other', label: 'Other' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason) return;

    setLoading(true);
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

      await fetch(`${baseUrl}/api/reports`, {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reportedUser,
          reportedPost,
          reportedComment,
          reason,
          description
        })
      });

      setShowModal(false);
      setReason('');
      setDescription('');
      onReport && onReport();
    } catch (error) {
      console.error('Error submitting report:', error);
    }
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
      >
        <FlagIcon className="h-4 w-4" />
        <span>Report</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <h3 className="text-lg font-semibold mb-4">Report Content</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Reason for reporting
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Select a reason</option>
                  {reportReasons.map((reason) => (
                    <option key={reason.value} value={reason.value}>
                      {reason.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Additional details (optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide more details about why you're reporting this content..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  rows={3}
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !reason}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Submitting...' : 'Submit Report'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportButton;
