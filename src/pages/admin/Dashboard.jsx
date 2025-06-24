import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import {
  MdOutlineArticle,
  MdOutlineSchedule,
  MdOutlinePublish,
  MdPeopleAlt,
} from "react-icons/md";
import { FiArrowUpRight } from "react-icons/fi";

const Dashboard = () => {
  const [plannedPosts, setPlannedPosts] = useState([]);
  const [publishedPosts, setPublishedPosts] = useState([]);
  const [customerCount, setCustomerCount] = useState(0);

  const loadData = () => {
    const planned = JSON.parse(localStorage.getItem("plannedPosts")) || [];
    const published = JSON.parse(localStorage.getItem("publishedPosts")) || [];
    const customers = JSON.parse(localStorage.getItem("customers")) || [];

    setPlannedPosts(planned);
    setPublishedPosts(published);
    setCustomerCount(customers.length);
  };

  useEffect(() => {
    loadData();

    const handleCustomersUpdated = () => {
      loadData();
    };

    window.addEventListener("customersUpdated", handleCustomersUpdated);

    return () => {
      window.removeEventListener("customersUpdated", handleCustomersUpdated);
    };
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
      label: "Planlanmış",
      value: plannedPosts.length,
      change: "+8%",
      icon: MdOutlineSchedule,
      color: { text: "text-yellow-600", bg: "bg-yellow-100" },
    },
    {
      label: "Yayınlanmış",
      value: publishedPosts.length,
      change: "+15%",
      icon: MdOutlinePublish,
      color: { text: "text-green-600", bg: "bg-green-100" },
    },
    {
      label: "Müşteriler",
      value: customerCount,
      change: "+3%",
      icon: MdPeopleAlt,
      color: { text: "text-blue-600", bg: "bg-blue-100" },
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-10">
      <header className="text-left space-y-2">
        <header>
          <h1 className="text-4xl font-bold mb-1">Hoşgeldin Admin !</h1>
          <p className="text-gray-600">Tüm sosyal medya gönderilerinizi yönetin</p>
        </header>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
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

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col h-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Son Gönderiler</h3>
          <ul className="space-y-4 text-sm text-gray-700 flex-1">
            {publishedPosts.length === 0 ? (
              <li className="text-gray-400">Yayınlanmış gönderi yok.</li>
            ) : (
              publishedPosts
                .slice(-5)
                .reverse()
                .map((post, i) => (
                  <li key={i}>
                    <p className="font-medium text-gray-800">{post.title}</p>
                    <p className="text-xs text-gray-500">{post.date}</p>
                  </li>
                ))
            )}
          </ul>
          <div className="text-right mt-6">
            <Link
              to="/admin/posts"
              className="text-sm text-blue-600 hover:underline"
            >
              Tümünü Gör →
            </Link>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col h-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Yaklaşan Gönderiler</h3>
          <ul className="space-y-4 text-sm text-gray-700 flex-1">
            {plannedPosts.length === 0 ? (
              <li className="text-gray-400">Planlanmış gönderi yok.</li>
            ) : (
              plannedPosts
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .slice(0, 5)
                .map((post, i) => (
                  <li key={i}>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800">{post.title}</p>
                        <p className="text-xs text-gray-500">{post.date}</p>
                      </div>
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                        Planlandı
                      </span>
                    </div>
                  </li>
                ))
            )}
          </ul>
          <div className="text-right mt-6">
            <Link
              to="/admin/calendar"
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

export default Dashboard;
