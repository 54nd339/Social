import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import PostCard from "../../components/PostCard";
import { parseCookies } from "nookies";
import baseUrl from "../../utils/baseUrl";
import axios from "axios";
import { useRouter } from "next/router";
import { HashtagIcon } from "@heroicons/react/outline";

function HashtagPage({ user, hashtagPosts, hashtag, errorLoading }) {
  const [posts, setPosts] = useState(hashtagPosts || []);
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Header user={user} />
      
      <main className="flex">
        <Sidebar user={user} />
        
        <div className="flex-grow h-full pt-6 mr-5 md:ml-auto scrollbar-hide">
          <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
            {/* Hashtag Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <HashtagIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    #{hashtag}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    {posts.length} posts
                  </p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400">
                Explore posts tagged with #{hashtag}
              </p>
            </div>

            {/* Posts */}
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
                <HashtagIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No posts found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  No posts have been tagged with #{hashtag} yet
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

HashtagPage.getInitialProps = async (ctx) => {
  try {
    const { token } = parseCookies(ctx);
    const { hashtag } = ctx.query;
    
    if (!token) {
      return { hashtagPosts: null, hashtag, errorLoading: true };
    }

    const res = await axios.get(`${baseUrl}/api/posts/hashtag/${hashtag}`, {
      headers: { Authorization: token }
    });

    return { hashtagPosts: res.data, hashtag };
  } catch (error) {
    console.log(error);
    return { hashtagPosts: null, hashtag: ctx.query.hashtag, errorLoading: true };
  }
};

export default HashtagPage;
