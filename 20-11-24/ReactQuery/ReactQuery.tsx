// React Query
//  is a JavaScript library designed to simplify the complex task of data fetching and caching in React applications.It offers a set of hooks and utilities that enable you to manage data from various sources,
// including REST APIs, GraphQL, or even local state, effortlessly.a JavaScript library designed to simplify the complex task of data fetching and caching in React applications.

// Data fetching: Fetching data from various sources, such as GraphQL, REST APIs, or local state
// Caching: Caching query results
// Deduping requests: Deduplicating requests
// Updating data: Updating data in the background
// Performance optimizations: Optimizing performance
// Memory management: Managing memory and garbage collection

import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

// Define the type for a single post
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Define the function to fetch posts
const retrievePosts = async (): Promise<Post[]> => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data;
};

const ReactQuery: React.FC = () => {
  const {
    data: posts,
    error,
    isLoading,
  } = useQuery<Post[], Error>("postsData", retrievePosts);

  const [visibleCount, setVisibleCount] = useState(5); // Initially show 5 posts

  if (isLoading) return <div>Fetching posts...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  // Provide a fallback to empty array if posts are undefined
  const displayedPosts = (posts ?? []).slice(0, visibleCount);

  // Load more posts
  const handleLoadMore = () => {
    setVisibleCount(visibleCount + 5);
  };

  return (
    <div>
      <h1>Post Titles</h1>
      <ul>
        {displayedPosts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      {visibleCount < (posts?.length ?? 0) && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
};

export default ReactQuery;
