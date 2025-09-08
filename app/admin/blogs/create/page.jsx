"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateBlog() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token"); // <-- ambil token dari login
    if (!token) {
      alert("Please login first");
      router.push("/admin/login");
      return;
    }

    const res = await fetch("http://localhost:8000/api/admin/blogs", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content, author, category, image }),
    });

    if (res.ok) {
      router.push("/admin/blogs");
    } else {
      const data = await res.json();
      alert(data.message || "Create failed");
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          className="w-full p-2 border rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          placeholder="Author"
          className="w-full p-2 border rounded"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          placeholder="Category"
          className="w-full p-2 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          placeholder="Image URL"
          className="w-full p-2 border rounded"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded bg-green-600 text-white">
            Create
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
