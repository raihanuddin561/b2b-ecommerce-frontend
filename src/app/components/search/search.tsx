'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8081/api/products/search?q=${encodeURIComponent(query.trim())}`);
      if (!res.ok) throw new Error("Failed to fetch search results");

      const data = await res.json();
      router.push(`/products?query=${encodeURIComponent(query.trim())}`);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center max-w-xl mx-auto mt-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products, e.g. 'tshirt', 'speaker'"
        className="w-full px-4 py-3 border border-gray-300 rounded-l-xl shadow-sm focus:outline-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-r-xl hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
