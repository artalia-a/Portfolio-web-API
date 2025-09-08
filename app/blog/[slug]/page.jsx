"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function BlogDetail() {
  const { slug } = useParams(); // Ambil slug dari URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/blogs/${slug}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setBlog(data.data || null);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchBlog();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found</p>;

  return (
    <div className="mx-60">
      <div className="text-4xl font-bold  mt-20 mb-5">
        <h1>{blog.title}</h1>
      </div>
      <div className="flex gap-4 items-center">
        <p className="text-sm text-gray-700">
          <span className="text-[#6531b3] text-sm font-bold">
            {blog.author}
          </span>{" "}
          -{" "}
          {new Date(blog.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          - {blog.category}
        </p>
      </div>

      <div className="my-4">
        <img
          src={
            blog.image
              ? `http://127.0.0.1:8000${blog.image}`
              : "/default-image.jpg"
          }
          alt={blog.title}
          className="w-full h-[500px] rounded-lg"
        />
      </div>

      {/* Content split per paragraf */}
      <motion.div
        className="text-justify"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false }}
      >
        {blog.content.split("\n").map((paragraph, index) => (
          <p key={index} className="whitespace-pre-line mb-3">
            {paragraph}
          </p>
        ))}
      </motion.div>

      {/* References, jika ada */}
      {/* {blog.references && blog.references.length > 0 && (
        <div>
          <h3>References:</h3>
          <ul>
            {blog.references.map((ref, idx) => (
              <li key={idx}>{ref}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
}
