"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { motion } from "framer-motion";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
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

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (blogs.length === 0)
    return <p className="text-center mt-10">No blogs found</p>;

  // Ambil kategori unik
  const categories = [
    "All",
    ...new Set(blogs.map((blog) => blog.category || "Uncategorized")),
  ];

  // Filter blog berdasarkan kategori
  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  console.log("Blogs state:", blogs);
  console.log("Filtered blogs:", filteredBlogs);

  return (
    <div>
      <Header />

      <div className="mx-30 my-30">
        {/* Header Section */}
        <motion.div
          className="mt-70 mb-70 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false }}
        >
          <p className="text-3xl font-bold mb-2">
            Inspiration Awaits{" "}
            <span className="text-[#6531b3]">in Every Post</span>
          </p>
          <p className="text-lg text-gray-700">
            Discover stories, ideas, and insights from technology and real-life
            experiences.
          </p>
        </motion.div>
        <hr className="border-t border-[#806D9C] my-15" />

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap gap-3 mb-6 justify-start"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1 rounded-lg border transition ${
                selectedCategory === cat
                  ? "bg-[#806D9C] text-white border-[#806D9C]"
                  : "bg-white text-gray-700 border-[#806D9C] hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Blog List */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false }}
        >
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition"
            >
              <a href={`/blog/${blog.slug}`}>
                {/* Gambar */}
                <div className="w-full h-48 bg-gray-200 relative">
                  <img
                    src={
                      blog.image
                        ? `http://127.0.0.1:8000${blog.image}`
                        : "/default-image.jpg"
                    }
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title */}
                <div className="p-4">
                  <p className="text-base font-semibold text-gray-800">
                    {blog.title}
                  </p>
                  <p className="text-xs text-gray-700 my-2">
                    {blog.content.length > 150
                      ? blog.content.substring(0, 150) + "..."
                      : blog.content}
                  </p>
                  {/* <p className="text-xs text-gray-500 mt-1">
                    {blog.category || "Uncategorized"}
                  </p> */}
                </div>
              </a>
            </div>
          ))}
        </motion.div>
      </div>
      <hr className="border-t border-[#806D9C] my-10 mx-30" />
      <Footer />
    </div>
  );
}
