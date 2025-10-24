import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";
import { parseCookies } from "nookies";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { 
  SearchIcon as MagnifyingGlassIcon, 
  UserIcon, 
  HashtagIcon,
  FilterIcon as FunnelIcon 
} from "@heroicons/react/outline";

function Search({ user }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(router.query.q || "");
  const [searchType, setSearchType] = useState(router.query.type || "all");
  const [searchResults, setSearchResults] = useState({
    users: [],
    posts: [],
    hashtags: []
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const searchTypes = [
    { id: "all", label: "All", icon: MagnifyingGlassIcon },
    { id: "users", label: "Users", icon: UserIcon },
    { id: "posts", label: "Posts", icon: HashtagIcon },
    { id: "hashtags", label: "Hashtags", icon: HashtagIcon }
  ];

  const performSearch = async (term, type = "all") => {
    if (!term.trim()) {
      setSearchResults({ users: [], posts: [], hashtags: [] });
      return;
    }

    setLoading(true);
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

      const requests = [];

      if (type === "all" || type === "users") {
        requests.push(
          axios.get(`${baseUrl}/api/search/${term}`, {
            headers: { Authorization: token }
          }).then(res => ({ users: res.data }))
        );
      }

      if (type === "all" || type === "posts") {
        requests.push(
          axios.get(`${baseUrl}/api/posts/search?q=${encodeURIComponent(term)}`, {
            headers: { Authorization: token }
          }).then(res => ({ posts: res.data }))
        );
      }

      if (type === "all" || type === "hashtags") {
        requests.push(
          axios.get(`${baseUrl}/api/posts/trending/hashtags`, {
            headers: { Authorization: token }
          }).then(res => ({ hashtags: res.data.filter(tag => 
            tag._id.toLowerCase().includes(term.toLowerCase())
          ) }))
        );
      }

      const results = await Promise.all(requests);
      const combinedResults = results.reduce((acc, result) => ({
        ...acc,
        ...result
      }), { users: [], posts: [], hashtags: [] });

      setSearchResults(combinedResults);
    } catch (error) {
      console.error("Search error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (searchTerm) {
      performSearch(searchTerm, searchType);
    }
  }, [searchTerm, searchType]);

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch(searchTerm, searchType);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (searchTerm) {
      performSearch(searchTerm, tab);
    }
  };

  const getTotalResults = () => {
    return searchResults.users.length + searchResults.posts.length + searchResults.hashtags.length;
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Header user={user} />
      
      <main className="flex">
        <Sidebar user={user} />
        
        <div className="flex-grow h-full pt-6 mr-5 md:ml-auto scrollbar-hide">
          <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
            {/* Search Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Search
              </h1>
              
              {/* Search Form */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search users, posts, hashtags..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="all">All</option>
                    <option value="users">Users</option>
                    <option value="posts">Posts</option>
                    <option value="hashtags">Hashtags</option>
                  </select>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Search Tabs */}
              {searchTerm && (
                <div className="flex space-x-1 border-b border-gray-200 dark:border-gray-700">
                  {searchTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleTabChange(type.id)}
                      className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === type.id
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      <type.icon className="h-4 w-4" />
                      <span>{type.label}</span>
                      {type.id === "all" && getTotalResults() > 0 && (
                        <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                          {getTotalResults()}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Results */}
            {loading ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Searching...</p>
              </div>
            ) : searchTerm ? (
              <div className="space-y-6">
                {/* Users Results */}
                {(activeTab === "all" || activeTab === "users") && searchResults.users.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Users ({searchResults.users.length})
                    </h3>
                    <div className="space-y-3">
                      {searchResults.users.map((user) => (
                        <div
                          key={user._id}
                          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-center space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                          onClick={() => router.push(`/${user.username}`)}
                        >
                          <Image
                            src={user.profilePicUrl}
                            alt={user.name}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {user.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              @{user.username}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Posts Results */}
                {(activeTab === "all" || activeTab === "posts") && searchResults.posts.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Posts ({searchResults.posts.length})
                    </h3>
                    <div className="space-y-4">
                      {searchResults.posts.map((post) => (
                        <PostCard
                          key={post._id}
                          post={post}
                          user={user}
                          setPosts={() => {}}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Hashtags Results */}
                {(activeTab === "all" || activeTab === "hashtags") && searchResults.hashtags.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Hashtags ({searchResults.hashtags.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {searchResults.hashtags.map((hashtag) => (
                        <div
                          key={hashtag._id}
                          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                          onClick={() => router.push(`/hashtag/${hashtag._id}`)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-blue-600 dark:text-blue-400">
                                #{hashtag._id}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {hashtag.count} posts
                              </p>
                            </div>
                            <HashtagIcon className="h-6 w-6 text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* No Results */}
                {getTotalResults() === 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
                    <MagnifyingGlassIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No results found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Try searching for something else or check your spelling
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
                <MagnifyingGlassIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Start searching
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Enter a search term to find users, posts, and hashtags
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Search;
