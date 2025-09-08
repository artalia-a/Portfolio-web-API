"use client";

import React, { useEffect, useState } from "react";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
        const data = await res.json();
        setBlogs(data.data || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (blogs.length === 0) return <p>No blogs found</p>;

  return (
    <div>
      <h1>Blog List</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <a href={`/blog/${blog.slug}`}>{blog.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
