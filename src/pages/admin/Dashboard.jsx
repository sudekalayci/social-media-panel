import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import {
  MdOutlineArticle,
  MdOutlineSchedule,
  MdOutlinePublish,
  MdPeopleAlt,
} from "react-icons/md";

const Dashboard = () => {
  const [plannedPosts, setPlannedPosts] = useState([]);
  const [publishedPosts, setPublishedPosts] = useState([]);
  const [customerCount, setCustomerCount] = useState(0);

  useEffect(() => {
    const planned = JSON.parse(localStorage.getItem("plannedPosts")) || [];
    const published = JSON.parse(localStorage.getItem("publishedPosts")) || [];
    const customers = JSON.parse(localStorage.getItem("customers")) || [];

    setPlannedPosts(planned);
    setPublishedPosts(published);
    setCustomerCount(customers.length);
  }, []);

  const stats = [
    {
      label: "Toplam Gönderiler",
      value: plannedPosts.length + publishedPosts.length,
      icon: MdOutlineArticle,
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-100",
    },
    {
      label: "Planlanmış",
      value: plannedPosts.length,
      icon: MdOutlineSchedule,
      iconColor: "text-yellow-600",
      iconBg: "bg-yellow-100",
    },
    {
      label: "Yayınlanmış",
      value: publishedPosts.length,
      icon: MdOutlinePublish,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
    },
    {
      label: "Müşteriler",
      value: customerCount,
      icon: MdPeopleAlt,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-10">
      {/* Başlık */}
  <PageHeader
    title="Yönetici Paneli"
    subtitle="Hoş geldiniz, yönetici. Sosyal medyaya genel bakışınız."
  />

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="flex items-center p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <div className={`p-3 rounded-full ${stat.iconBg} mr-4`}>
                <Icon className={`text-2xl ${stat.iconColor}`} />
              </div>
              <div>
                <p className="text-md text-gray-700 font-medium">{stat.label}</p>
                <p className="text-xl font-semibold text-gray-800">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Gönderi Kutuları */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Son Yayınlanan Gönderiler */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Son Yazılar</h3>
          <ul className="space-y-4 text-sm text-gray-700">
            {publishedPosts.length === 0 && <li>Yayınlanmış gönderi yok.</li>}
            {publishedPosts
              .slice(-5)
              .reverse()
              .map((post, i) => (
                <li key={i}>
                  <p className="font-medium">{post.title}</p>
                  <p className="text-xs text-gray-500">{post.date}</p>
                </li>
              ))}
          </ul>
        </div>

        {/* Gelecek Gönderiler */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Gelecek Yazılar</h3>
          <ul className="space-y-4 text-sm text-gray-700">
            {plannedPosts.length === 0 && <li>Planlanmış gönderi yok.</li>}
            {plannedPosts
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .slice(0, 5)
              .map((post, i) => (
                <li key={i}>
                  <p className="font-medium">{post.title}</p>
                  <p className="text-xs text-gray-500">{post.date}</p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
