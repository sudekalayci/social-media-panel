import React, { useEffect, useState } from "react";
import {
  MdOutlineArticle,
  MdOutlinePublish,
  MdOutlineSchedule,
} from "react-icons/md";
import { FiArrowUpRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Customer = () => {
  const [plannedPosts, setPlannedPosts] = useState([]);
  const [publishedPosts, setPublishedPosts] = useState([]);
  const navigate = useNavigate();

  const isValidDate = (date) => {
    const d = new Date(date);
    return d instanceof Date && !isNaN(d);
  };

  const loadData = () => {
    try {
      const plannedRaw = JSON.parse(localStorage.getItem("plannedPosts")) || [];
      const publishedRaw = JSON.parse(localStorage.getItem("publishedPosts")) || [];

      // Geçerli tarihli postları filtrele
      const planned = plannedRaw.filter((post) => post.title && isValidDate(post.date));
      const published = publishedRaw.filter((post) => post.title && isValidDate(post.date));

      setPlannedPosts(planned);
      setPublishedPosts(published);
    } catch (error) {
      console.error("LocalStorage verisi okunamadı:", error);
      setPlannedPosts([]);
      setPublishedPosts([]);
    }
  };

  useEffect(() => {
    loadData();
    const handlePostsUpdated = () => loadData();
    window.addEventListener("postsUpdated", handlePostsUpdated);
    return () => window.removeEventListener("postsUpdated", handlePostsUpdated);
  }, []);

  const stats = [
    {
      label: "Toplam Gönderiler",
      value: plannedPosts.length + publishedPosts.length,
      change: "+12%",
      icon: MdOutlineArticle,
      color: { text: "text-indigo-600", bg: "bg-indigo-100" },
    },
    {
      label: "Yayınlanmış",
      value: publishedPosts.length,
      change: "+10%",
      icon: MdOutlinePublish,
      color: { text: "text-green-600", bg: "bg-green-100" },
    },
    {
      label: "Planlanmış",
      value: plannedPosts.length,
      change: "+6%",
      icon: MdOutlineSchedule,
      color: { text: "text-yellow-600", bg: "bg-yellow-100" },
    },
  ];

  return (
     <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-10">
      <header className="text-left space-y-2">
          <h1 className="text-4xl font-bold mb-1">Panel</h1>
          <p className="text-gray-600">Tüm sosyal medya gönderilerinizi yönetin</p>
      </header>
      {/* İstatistikler */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition"
            >
              <div className={`p-3 rounded-full ${stat.color.bg}`}>
                <Icon className={`text-2xl ${stat.color.text}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <h2 className="text-2xl font-semibold text-gray-800">{stat.value}</h2>
                <p className={`text-xs mt-1 flex items-center ${stat.color.text}`}>
                  <FiArrowUpRight className="mr-1" /> {stat.change} geçen aya göre
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Gönderi Listeleri */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Yayınlanmış */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col h-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Yayınlanmış Gönderiler</h3>
          <ul className="space-y-4 text-sm text-gray-700 flex-1 overflow-auto max-h-64">
            {publishedPosts.length === 0 ? (
              <li className="text-gray-400">Yayınlanmış gönderi yok.</li>
            ) : (
              [...publishedPosts]
                .slice(-5)
                .reverse()
                .map((post, i) => (
                  <li key={i} className="mb-2">
                    <p className="font-medium text-gray-800">{post.title}</p>
                    <p className="text-xs text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
                  </li>
                ))
            )}
          </ul>
          <button
            onClick={() => navigate("/all-posts")}
            className="mt-4 text-sm text-indigo-600 hover:underline self-end"
          >
            Tümünü Gör →
          </button>
        </div>

        {/* Planlanmış Gönderiler */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col h-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Planlanmış Gönderiler</h3>
          <ul className="space-y-4 text-sm text-gray-700 flex-1 overflow-auto max-h-64">
            {plannedPosts.length === 0 ? (
              <li className="text-gray-400">Planlanmış gönderi yok.</li>
            ) : (
              [...plannedPosts]
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .slice(0, 5)
                .map((post, i) => (
                  <li key={i}>
                    <p className="font-medium text-gray-800">{post.title}</p>
                    <p className="text-xs text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
                  </li>
                ))
            )}
          </ul>
          <div className="text-right mt-4">
            <Link
              to="/customer/calendar"
              className="text-sm text-blue-600 hover:underline"
            >
              Takvimi Gör →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Customer;
