// Yeni eklemeler ve güncellemelerle tam dosya:

import React, { useEffect, useState } from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

const platformIcons = {
  Instagram: <FaInstagram className="text-pink-500" />,
  LinkedIn: <FaLinkedin className="text-blue-700" />,
  YouTube: <FaYoutube className="text-red-600" />,
  X: <FaXTwitter className="text-black" />,
};

export default function CustomerPosts() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [filters, setFilters] = useState("all");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(saved);

    // Yorumlar
    const savedComments = JSON.parse(localStorage.getItem("comments")) || {};
    setComments(savedComments);
  }, []);

  const handleCommentSubmit = (postId, text) => {
    if (!text.trim()) return;

    const newComments = {
      ...comments,
      [postId]: [...(comments[postId] || []), text],
    };

    setComments(newComments);
    localStorage.setItem("comments", JSON.stringify(newComments));
  };

  const filteredPosts =
    filters === "all"
      ? posts
      : posts.filter((p) =>
          filters === "published"
            ? p.status === "Yayınlandı"
            : p.status === "Taslak"
        );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Paylaşılan Gönderiler
        </h1>

        {/* Filtre Butonları */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setFilters("all")}
            className={`px-4 py-2 rounded-lg border ${
              filters === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            Tümü
          </button>
          <button
            onClick={() => setFilters("published")}
            className={`px-4 py-2 rounded-lg border ${
              filters === "published"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            Yayınlanan
          </button>
          <button
            onClick={() => setFilters("draft")}
            className={`px-4 py-2 rounded-lg border ${
              filters === "draft"
                ? "bg-yellow-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            Taslaklar
          </button>
        </div>

        {filteredPosts.length === 0 ? (
          <p className="text-center text-gray-500">Gösterilecek gönderi yok.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white border rounded-xl p-4 shadow hover:shadow-lg transition-all"
              >
                {post.photo && (
                  <img
                    src={post.photo}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-md mb-3"
                  />
                )}

                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-2">{post.description}</p>

                <div className="flex flex-wrap gap-2 mb-2">
                  {post.platforms.map((p) => (
                    <span
                      key={p}
                      className="flex items-center gap-1 text-sm bg-gray-100 px-2 py-1 rounded-full"
                    >
                      {platformIcons[p]}
                      {p}
                    </span>
                  ))}
                </div>

                {post.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-1">Durum: {post.status}</p>

                  {/* Yorumlar */}
                  <div className="mt-3">
                    <h3 className="font-semibold text-gray-700 mb-2">Yorumlar</h3>
                    <ul className="text-sm space-y-2 mb-2">
                      {(comments[post.id] || []).map((c, i) => (
                        <li key={i} className="bg-gray-100 p-2 rounded">
                          {c}
                        </li>
                      ))}
                    </ul>

                    <CommentInput postId={post.id} onSubmit={handleCommentSubmit} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Alt bileşen: Yorum giriş alanı
function CommentInput({ postId, onSubmit }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    onSubmit(postId, text);
    setText("");
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Yorum ekle..."
        className="flex-1 border rounded px-3 py-1 text-sm focus:outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <button
        onClick={handleSubmit}
        className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        Gönder
      </button>
    </div>
  );
}
