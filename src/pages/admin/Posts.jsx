import React, { useState, useEffect } from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import {
  MdEdit,
  MdDelete,
  MdVisibility,
} from "react-icons/md";
import Modal from "react-modal";

Modal.setAppElement("#root");

const clients = [{ id: 1, name: "Müşteri 1" }];
const platforms = ["Instagram", "LinkedIn", "YouTube", "X"];
const statuses = ["Taslak", "Planlandı", "Yayınlandı"];

const samplePosts = [
  {
    id: 1,
    title: "Yeni Yaz Kampanyası",
    description: "Yeni yaz stillerimizi keşfedin! 🌞 Sezon için mükemmel.",
    status: "Planlandı",
    platforms: ["Instagram", "LinkedIn"],
    clientId: 1,
    scheduledTime: "2025-06-25T10:00:00",
  },
  {
    id: 2,
    title: "Ürün Lansman Duyurusu",
    description: "En yeni ürün inovasyonumuzu duyurmaktan heyecanlıyız!",
    status: "Taslak",
    platforms: ["LinkedIn", "X"],
    clientId: 1,
    scheduledTime: "2025-06-20T14:30:00",
  },
];

const icons = {
  Instagram: <FaInstagram className="text-pink-500" />,
  LinkedIn: <FaLinkedin className="text-blue-700" />,
  YouTube: <FaYoutube className="text-red-600" />,
  X: <FaXTwitter className="text-black" />,
};

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPlatform, setFilterPlatform] = useState("");
  const [filterClient, setFilterClient] = useState("");
  const [modalPost, setModalPost] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts([...samplePosts, ...stored]);
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus ? post.status === filterStatus : true;
    const matchPlatform = filterPlatform
      ? post.platforms.includes(filterPlatform)
      : true;
    const matchClient = filterClient
      ? post.clientId === parseInt(filterClient)
      : true;
    return matchSearch && matchStatus && matchPlatform && matchClient;
  });

  const deletePost = (id) => {
    if (window.confirm("Bu gönderiyi silmek istediğinizden emin misiniz?")) {
      const updated = posts.filter((p) => p.id !== id);
      setPosts(updated);
      localStorage.setItem("posts", JSON.stringify(updated));
    }
  };

  return (
     <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-10">
      <header>
        <h1 className="text-4xl font-bold mb-1">Gönderiler</h1>
        <p className="text-gray-600">Tüm sosyal medya gönderilerinizi yönetin</p>
      </header>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          onClick={() => window.location.href = "/gonderi-olustur"}
         className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Gönderi Oluştur
        </button>

        <input
          type="text"
          placeholder="Gönderilerde ara..."
          className="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <select
          className="border border-gray-300 rounded-md px-4 py-2"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Tüm Durumlar</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          className="border border-gray-300 rounded-md px-4 py-2"
          value={filterPlatform}
          onChange={(e) => setFilterPlatform(e.target.value)}
        >
          <option value="">Tüm Platformlar</option>
          {platforms.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <select
          className="border border-gray-300 rounded-md px-4 py-2"
          value={filterClient}
          onChange={(e) => setFilterClient(e.target.value)}
        >
          <option value="">Tüm Müşteriler</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredPosts.length === 0 && (
          <p className="text-gray-500 text-center col-span-full">
            Gönderi bulunamadı.
          </p>
        )}

        {filteredPosts.map((post) => {
          const client = clients.find((c) => c.id === post.clientId);
          return (
            <div
              key={post.id}
              className="border border-gray-300 rounded-lg p-6 shadow-sm hover:shadow-md transition space-y-2"
            >
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-700">{post.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-2">
                <div>
                  <strong>Durum:</strong> {post.status}
                </div>
                <div className="flex items-center gap-2">
                  <strong>Platformlar:</strong>{" "}
                  <div className="flex gap-2">
                    {post.platforms.map((p) => (
                      <span key={p} title={p}>
                        {icons[p]}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <strong>Müşteri:</strong> {client ? client.name : "Bilinmiyor"}
                </div>
                <div>
                  <strong>Planlanan Zaman:</strong>{" "}
                  {new Date(post.scheduledTime).toLocaleString("tr-TR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              <div className="mt-4 flex gap-4 text-xl">
                <button
                  onClick={() => alert("Düzenleme ekranına yönlendir")}
                  title="Düzenle"
                  className="text-indigo-600 hover:text-indigo-800"
                  
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => setModalPost(post)}
                  title="İçeriğe Bak"
                  className="text-gray-700 hover:text-gray-900"
                >
                  <MdVisibility />
                </button>
                <button
                  onClick={() => deletePost(post.id)}
                  title="Sil"
                  className="text-red-600 hover:text-red-800"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Gönderi Detayı */}
      {modalPost && (
        <Modal
          isOpen={true}
          onRequestClose={() => setModalPost(null)}
          contentLabel="Gönderi Detayı"
          className="max-w-lg mx-auto mt-20 bg-white p-6 rounded-lg shadow-lg outline-none"
          overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-start justify-center z-50"
        >
          <h2 className="text-2xl font-bold mb-4">{modalPost.title}</h2>
          <p className="mb-4">{modalPost.description}</p>
          <button
            onClick={() => setModalPost(null)}
            className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
          >
            Kapat
          </button>
        </Modal>
      )}
    </div>
  );
}
