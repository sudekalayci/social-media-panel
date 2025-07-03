import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const platformIcons = {
  Instagram: <span className="text-pink-500 font-bold"></span>,
  LinkedIn: <span className="text-blue-700 font-bold"></span>,
  YouTube: <span className="text-red-600 font-bold"></span>,
  X: <span className="text-black font-bold"></span>,
};

const statuses = ["Tümü", "Taslak", "Planlanan", "Yayınlandı"];

export default function CustomerPosts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  // Filtre state'leri
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tümü");
  const [filterPlatform, setFilterPlatform] = useState("Tümü");

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  

  // Filtreleme işlemi
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchText.toLowerCase()) ||
      post.description.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus = filterStatus === "Tümü" || post.status === filterStatus;

    const matchesPlatform =
      filterPlatform === "Tümü" || post.platforms.includes(filterPlatform);

    return matchesSearch && matchesStatus && matchesPlatform;
  });

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-10">
      <div className="flex justify-between gap-12">
         <h1 className="text-4xl font-bold mb-1">Gönderiler</h1>
        <button
          onClick={() => navigate("/customer/create-post")}
           className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:from-indigo-700 hover:to-purple-700 transition"
          >
            Gönderi Ekle
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


      </div>

      {filteredPosts.length === 0 ? (
        <p className="text-center text-gray-400 mt-20">Gönderi bulunamadı.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-gray-50 rounded-2xl p-5 shadow hover:shadow-lg transition flex flex-col"
            >
              <h2 className="text-xl font-semibold mb-3 truncate">{post.title}</h2>

              {post.photo && (
                <img
                  src={post.photo}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}

              <p className="text-gray-700 flex-grow line-clamp-4 mb-4">{post.description}</p>

              <div className="flex flex-wrap gap-2 mb-3">
                {post.platforms.map((plat) => (
                  <span
                    key={plat}
                    className="text-sm font-medium px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 flex items-center gap-1"
                  >
                    {platformIcons[plat]} {plat}
                  </span>
                ))}
              </div>

              <p className="text-sm text-gray-500">
                Durum: <span className="font-semibold">{post.status}</span>
              </p>

              <p className="text-sm text-gray-500">
                Planlanan:{" "}
                <span className="font-semibold">
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
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
