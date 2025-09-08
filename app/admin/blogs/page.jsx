"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BlogsList() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTitle, setSearchTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch semua blogs
  async function fetchBlogs() {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/admin/login");
        return;
      }

      const res = await fetch("http://localhost:8000/api/admin/blogs", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) router.push("/admin/login");
        throw new Error("Failed to fetch blogs");
      }

      const data = await res.json();
      setBlogs(data);

      // Ambil kategori unik dari blogs
      const uniqueCategories = ["All", ...new Set(data.map((b) => b.category))];
      setCategories(uniqueCategories);

      setFilteredBlogs(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filter berdasarkan kategori dan search title
  useEffect(() => {
    let temp = blogs;

    if (selectedCategory !== "All") {
      temp = temp.filter((b) => b.category === selectedCategory);
    }

    if (searchTitle.trim() !== "") {
      temp = temp.filter((b) =>
        b.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }

    setFilteredBlogs(temp);
  }, [selectedCategory, searchTitle, blogs]);

  // Delete blog
  async function handleDelete(id) {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!confirm("Delete this blog?")) return;

    const res = await fetch(`http://localhost:8000/api/admin/blogs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setBlogs(blogs.filter((b) => b.id !== id));
    } else {
      alert("Delete failed");
    }
  }

  return (
    <div className="mx-30 mt-15">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blogs List</h1>
        <div className="space-x-2">
          <Link
            href="/admin/blogs/create"
            className="px-4 py-2 rounded-lg bg-[#16610E] text-white hover:text-[#16610E] hover:bg-white hover:border border-[#16610E]"
          >
            New Blog
          </Link>
          <Link
            href="/admin/logout"
            className="px-4 py-2 rounded-lg bg-[#E62727] text-white hover:text-[#E62727] hover:bg-white hover:border border-[#E62727]"
          >
            Logout
          </Link>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="mb-6 flex gap-2 items-center">
        <div>
          <label className="mr-2 font-semibold">Filter by category:</label>
          <select
            className="border p-1 rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <input
            type="text"
            placeholder="Search by title..."
            className="border p-1 rounded"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-gray-500">No blogs found.</div>
      ) : (
        <div className="space-y-4">
          {filteredBlogs.map((b) => (
            <div
              key={b.id}
              className="p-6 border rounded-lg flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">{b.title}</div>
                <div className="text-sm text-gray-500">
                  {b.author} — {new Date(b.created_at).toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">
                  Category: {b.category}
                </div>
              </div>

              <div className="space-x-2">
                <Link
                  href={`/admin/blogs/${b.id}/edit`}
                  className="px-3 py-1 rounded-lg bg-[#1B56FD] text-white hover:text-[#1B56FD] hover:bg-white hover:border border-[#1B56FD]"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(b.id)}
                  className="px-3 py-1 rounded-lg bg-[#E62727] text-white hover:text-[#E62727] hover:bg-white hover:border border-[#E62727]"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
