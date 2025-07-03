// src/components/PostCard.jsx

import React from "react";
import { MdDelete, MdVisibility } from "react-icons/md";
import {
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

const platformIcons = {
  Instagram: <FaInstagram className="text-pink-500 text-xl" />,
  LinkedIn: <FaLinkedin className="text-blue-700 text-xl" />,
  YouTube: <FaYoutube className="text-red-600 text-xl" />,
  X: <FaXTwitter className="text-black text-xl" />,
};

export default function PostCard({ post, onView, onDelete, showActions = true }) {
  return (
    <article className="bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 truncate">{post.title}</h2>

      {post.photo && (
        <img
          src={post.photo}
          alt={post.title}
          className="w-full h-48 object-cover rounded-2xl mb-5"
        />
      )}

      <p className="text-gray-700 mb-5 line-clamp-4 flex-grow">{post.description}</p>

      <div className="flex flex-wrap gap-3 mb-5">
        {post.platforms.map((p) => (
          <span
            key={p}
            className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm font-medium"
          >
            {platformIcons[p]}
            {p}
          </span>
        ))}
      </div>

      <div className="text-sm text-gray-500 space-y-1 mb-4">
        <p>Durum: <span className="font-semibold text-gray-800">{post.status}</span></p>
        <p>Müşteri: <span className="font-semibold text-gray-800">{post.customer || "-"}</span></p>
        <p>
          Planlanan:{" "}
          <span className="font-semibold text-gray-800">
            {post.scheduledTime
              ? new Date(post.scheduledTime).toLocaleString("tr-TR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "-"}
          </span>
        </p>
      </div>

      {showActions && (
        <div className="flex justify-end gap-6 text-2xl text-gray-600">
          <button
            onClick={() => onView && onView(post)}
            title="Gönderiyi Görüntüle"
            className="hover:text-indigo-700 transition"
          >
            <MdVisibility />
          </button>
          <button
            onClick={() => onDelete && onDelete(post.id)}
            title="Gönderiyi Sil"
            className="hover:text-red-600 transition"
          >
            <MdDelete />
          </button>
        </div>
      )}
    </article>
  );
}
