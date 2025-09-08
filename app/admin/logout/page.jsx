"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save token to localStorage
        localStorage.setItem("authToken", data.token);
        router.push("/admin/blogs");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError(err.message || "Network error");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">Email</label>
            <input
              className="mt-1 w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </div>

          <div>
            <label className="block text-sm">Password</label>
            <input
              className="mt-1 w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            className="w-full py-2 rounded bg-blue-600 text-white font-medium"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
