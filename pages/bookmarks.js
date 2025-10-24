import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";
import { parseCookies } from "nookies";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import { Facebook } from "react-content-loader";

function Bookmarks({ user, bookmarkedPosts, errorLoading }) {
  const [posts, setPosts] = useState(bookmarkedPosts || []);
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Header user={user} />
      
      <main className="flex">
        <Sidebar user={user} />
        
        <div className="flex-grow h-full pt-6 mr-5 md:ml-auto scrollbar-hide">
          <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Saved Posts
              </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Posts you&apos;ve bookmarked for later viewing
                </p>
            </div>

            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  user={user}
                  setPosts={setPosts}
                />
              ))
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
                <div className="text-gray-400 dark:text-gray-500 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No saved posts yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Start bookmarking posts you want to save for later
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

Bookmarks.getInitialProps = async (ctx) => {
  try {
    const { token } = parseCookies(ctx);
    
    if (!token) {
      return { bookmarkedPosts: null, errorLoading: true };
    }

    const res = await axios.get(`${baseUrl}/api/posts/bookmarks`, {
      headers: { Authorization: token }
    });

    return { bookmarkedPosts: res.data };
  } catch (error) {
    console.log(error);
    return { bookmarkedPosts: null, errorLoading: true };
  }
};

export default Bookmarks;
