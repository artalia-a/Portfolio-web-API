"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function EditBlog() {
  const router = useRouter();
  const pathname = usePathname(); // /admin/blogs/{id}/edit
  const id = pathname.split("/")[3]; // ambil id dari URL
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/admin/blogs/login");
        return;
      }

      try {
        const res = await fetch(`http://localhost:8000/api/admin/blogs/${id}`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401) router.push("/admin/blogs/login");
          throw new Error("Failed to fetch blog data");
        }

        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, router]); // hanya id dan router yang stabil

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/blogs/login");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/api/admin/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: blog.title,
          content: blog.content,
          author: blog.author,
          category: blog.category,
          image: blog.image,
        }),
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.message || "Update failed");
      }

      router.push("/admin/blogs");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!blog) return <div className="p-6">Not found</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <form onSubmit={handleSave} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          value={blog.title}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          required
        />
        <textarea
          className="w-full p-2 border rounded"
          value={blog.content}
          onChange={(e) => setBlog({ ...blog, content: e.target.value })}
          required
        />
        <input
          className="w-full p-2 border rounded"
          value={blog.author}
          onChange={(e) => setBlog({ ...blog, author: e.target.value })}
        />
        <input
          className="w-full p-2 border rounded"
          value={blog.category}
          onChange={(e) => setBlog({ ...blog, category: e.target.value })}
        />
        <input
          className="w-full p-2 border rounded"
          value={blog.image}
          onChange={(e) => setBlog({ ...blog, image: e.target.value })}
        />
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded bg-blue-600 text-white">
            Save
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/blogs")}
            className="px-4 py-2 rounded bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
