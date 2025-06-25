// src/pages/admin/Posts.jsx

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import {
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import { MdDelete, MdVisibility, MdEdit, MdClose } from "react-icons/md";

Modal.setAppElement("#root");

const platformIcons = {
  Instagram: <FaInstagram className="text-pink-500 text-xl" />,
  LinkedIn: <FaLinkedin className="text-blue-700 text-xl" />,
  YouTube: <FaYoutube className="text-red-600 text-xl" />,
  X: <FaXTwitter className="text-black text-xl" />,
};

const statuses = ["Tümü", "Taslak", "Planlanan", "Yayınlandı"];

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [modalPost, setModalPost] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tümü");
  const [filterPlatform, setFilterPlatform] = useState("Tümü");
  const [filterCustomer, setFilterCustomer] = useState("Tümü");

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  const deletePost = (id) => {
    if (window.confirm("Bu gönderiyi silmek istediğinize emin misiniz?")) {
      const updated = posts.filter((p) => p.id !== id);
      setPosts(updated);
      localStorage.setItem("posts", JSON.stringify(updated));
      setModalPost(null);
    }
  };

  const addComment = () => {
    if (!commentInput.trim()) return;

    const updatedPost = {
      ...modalPost,
      comments: [
        ...(modalPost.comments || []),
        {
          text: commentInput.trim(),
          date: new Date().toISOString(),
        },
      ],
    };

    const updatedPosts = posts.map((p) =>
      p.id === updatedPost.id ? updatedPost : p
    );
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    setModalPost(updatedPost);
    setCommentInput("");
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchText.toLowerCase()) ||
      post.description.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus = filterStatus === "Tümü" || post.status === filterStatus;

    const matchesPlatform =
      filterPlatform === "Tümü" || post.platforms.includes(filterPlatform);

    const matchesCustomer =
      filterCustomer === "Tümü" || (post.customer && post.customer === filterCustomer);

    return matchesSearch && matchesStatus && matchesPlatform && matchesCustomer;
  });

  const customers = Array.from(new Set(posts.map((p) => p.customer).filter(Boolean)));

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-3xl p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-6">
          <h1 className="text-4xl font-extrabold text-gray-900">Admin Gönderi Paneli</h1>

          <button
            onClick={() => (window.location.href = "/admin/create-post")}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:from-indigo-700 hover:to-purple-700 transition"
          >
            Yazı Oluştur
          </button>
        </div>

        {/* Arama ve filtreler */}
        <div className="flex flex-col sm:flex-row gap-5 mb-8">
          <input
            type="text"
            placeholder="Gönderileri ara..."
            className="flex-1 border border-gray-200 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <select
            className="border border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            className="border border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value)}
          >
            <option value="Tümü">Tüm Platformlar</option>
            {Object.keys(platformIcons).map((plat) => (
              <option key={plat} value={plat}>
                {plat}
              </option>
            ))}
          </select>

          <select
            className="border border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            value={filterCustomer}
            onChange={(e) => setFilterCustomer(e.target.value)}
          >
            <option value="Tümü">Tüm Müşteriler</option>
            {customers.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {filteredPosts.length === 0 ? (
          <p className="text-center text-gray-400 text-lg mt-20">Hiç gönderi bulunamadı.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col"
              >
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
                  <p>
                    Durum: <span className="font-semibold text-gray-800">{post.status}</span>
                  </p>
                  <p>
                    Müşteri: <span className="font-semibold text-gray-800">{post.customer || "-"}</span>
                  </p>
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

                <div className="flex justify-end gap-6 text-2xl text-gray-600">
                  <button
                    onClick={() => setModalPost(post)}
                    title="Gönderiyi Görüntüle"
                    className="hover:text-indigo-700 transition"
                    aria-label={`Gönderi ${post.title} detaylarını görüntüle`}
                  >
                    <MdVisibility />
                  </button>
                  <button
                    onClick={() => deletePost(post.id)}
                    title="Gönderiyi Sil"
                    className="hover:text-red-600 transition"
                    aria-label={`Gönderi ${post.title} sil`}
                  >
                    <MdDelete />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalPost && (
  <Modal
    isOpen={true}
    onRequestClose={() => setModalPost(null)}
    className="relative w-[95%] max-w-4xl max-h-[90vh] mx-auto bg-white p-8 rounded-3xl shadow-2xl outline-none
               animate-fadeIn overflow-auto"
    overlayClassName="fixed inset-0 bg-gray-50 bg-opacity-90 z-50 flex items-center justify-center p-4"
  >
    {/* Başlık ve Kapat */}
    <div className="flex justify-between items-center mb-6">
      <h2
        className="text-3xl font-extrabold text-gray-900 truncate max-w-[80%]"
        title={modalPost.title}
      >
        {modalPost.title}
      </h2>
      <button
        onClick={() => setModalPost(null)}
        aria-label="Kapat"
        className="text-gray-400 hover:text-gray-700 text-4xl font-extrabold transition"
      >
        <MdClose />
      </button>
    </div>

    {/* Fotoğraf */}
    {modalPost.photo && (
      <img
        src={modalPost.photo}
        alt={modalPost.title}
        className="mb-6 w-full h-56 object-cover rounded-2xl shadow-lg"
      />
    )}

    {/* Detaylar grid */}
    <div className="grid grid-cols-2 gap-6 mb-6 text-gray-700 text-sm font-semibold">
      <div className="space-y-2">
        <p>
          <span className="text-gray-900">Planlanan:</span>{" "}
          {modalPost.scheduledTime
            ? new Date(modalPost.scheduledTime).toLocaleString("tr-TR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "-"}
        </p>
        <p>
          <span className="text-gray-900">Müşteri:</span> {modalPost.customer || "-"}
        </p>
      </div>
      <div className="space-y-2">
        <p>
          <span className="text-gray-900">Oluşturan:</span> {modalPost.creator || "Bilinmiyor"}
        </p>
        <p>
          <span className="text-gray-900">Durum:</span> {modalPost.status}
        </p>
      </div>
      <div className="col-span-2 flex flex-wrap gap-3 items-center mt-3">
        <span className="font-semibold text-gray-900 mr-2">Platform:</span>
        {modalPost.platforms.length > 0 ? (
          modalPost.platforms.map((p) => (
            <span
              key={p}
              className={`flex items-center gap-2 px-4 py-1 rounded-full border-2 text-sm font-medium
                ${
                  p === "Instagram"
                    ? "border-pink-500 text-pink-600"
                    : p === "LinkedIn"
                    ? "border-blue-700 text-blue-700"
                    : p === "YouTube"
                    ? "border-red-600 text-red-600"
                    : p === "X"
                    ? "border-black text-black"
                    : "border-gray-300 text-gray-700"
                }
              `}
            >
              {platformIcons[p]}
              {p}
            </span>
          ))
        ) : (
          <span className="text-gray-400 italic">-</span>
        )}
      </div>
    </div>

    {/* İçerik */}
    <div className="mb-8 text-gray-800 text-base leading-relaxed whitespace-pre-wrap max-h-[120px] overflow-auto">
      {modalPost.description}
    </div>

    {/* Yorumlar */}
    <div className="mb-6">
      <h3 className="font-semibold mb-3 text-gray-900 flex items-center gap-2">
        Yorumlar ({modalPost.comments?.length || 0})
        <MdEdit
          className="text-blue-500 cursor-pointer hover:text-blue-700"
          title="Yorumları Düzenle"
        />
      </h3>
      {modalPost.comments?.length > 0 ? (
        <div className="space-y-3 max-h-[160px] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-50">
          {modalPost.comments.map((c, i) => (
            <div
              key={i}
              className="bg-gray-100 px-4 py-3 rounded-lg text-gray-800 text-sm flex flex-col shadow-sm"
            >
              <p>{c.text}</p>
              <span className="block text-xs text-gray-500 mt-1">
                {new Date(c.date).toLocaleString("tr-TR")}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 italic text-sm">Henüz yorum yok.</p>
      )}
    </div>

    {/* Yorum ekleme */}
    <div className="flex gap-4 mb-8">
      <input
        type="text"
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
        placeholder="Yorum ekle..."
        className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      <button
        onClick={addComment}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm hover:bg-blue-700 transition shadow-md"
      >
        Ekle
      </button>
    </div>

    {/* Alt butonlar */}
    <div className="flex justify-end gap-5">
      <button
        onClick={() => alert("Düzenleme fonksiyonu buraya gelecek")}
        className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg text-sm hover:bg-green-700 transition shadow-md"
      >
        <MdEdit />
        Düzenle
      </button>
      <button
        onClick={() => setModalPost(null)}
        className="flex items-center gap-2 bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 transition text-sm"
      >
        <MdClose />
        Kapat
      </button>
    </div>
  </Modal>
)}

    </div>
  );
}
