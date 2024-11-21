import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Post = {
    id: number;
    title: string;
    author: string;
  };
  

const Demo = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch data from JSON Server
    axios
      .get('http://localhost:5000/posts')
      .then((response) => {
        setPosts(response.data);
        console.log("author",response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
      {posts.map((post, index) => (
          <li key={post.id}>
            {index + 1}. {post.title} (by {post.author})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Demo;
