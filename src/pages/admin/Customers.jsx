import React, { useState, useEffect, useRef } from "react";
import { FaInstagram, FaLinkedin, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

const socialIcons = {
  instagram: <FaInstagram className="text-pink-600" />,
  linkedin: <FaLinkedin className="text-blue-700" />,
  facebook: <FaFacebook className="text-blue-800" />,
  twitter: <FaTwitter className="text-sky-500" />,
  youtube: <FaYoutube className="text-red-600" />,
};

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    description: "",
    socials: [],
  });

  const modalRef = useRef();

  // LocalStorage'dan güvenli veri çekme
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("customers"));
      if (saved && Array.isArray(saved)) setCustomers(saved);
    } catch {
      setCustomers([]);
    }
  }, []);

  // customers state değişince localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
  }, [customers]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Müşteri adı boş olamaz!");
      return;
    }

    const exists = customers.find((c) => c.name.toLowerCase() === formData.name.trim().toLowerCase());

    if (exists) {
      // Güncelle
      setCustomers(
        customers.map((c) =>
          c.name.toLowerCase() === formData.name.trim().toLowerCase() ? { ...formData, name: formData.name.trim() } : c
        )
      );
    } else {
      // Yeni ekle
      setCustomers([...customers, { ...formData, name: formData.name.trim() }]);
    }

    setFormVisible(false);
    setFormData({ name: "", website: "", description: "", socials: [] });

    window.dispatchEvent(new Event("customersUpdated"));
  };

  const handleDelete = (name) => {
    if (window.confirm("Bu müşteriyi silmek istediğinize emin misiniz?")) {
      setCustomers(customers.filter((c) => c.name !== name));
      window.dispatchEvent(new Event("customersUpdated"));
    }
  };

  const toggleSocial = (platform) => {
    setFormData((prev) => ({
      ...prev,
      socials: prev.socials.includes(platform)
        ? prev.socials.filter((s) => s !== platform)
        : [...prev.socials, platform],
    }));
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setFormVisible(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 font-sans">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Müşteri Yönetimi</h1>
        <button
          onClick={() => {
            setFormData({ name: "", website: "", description: "", socials: [] });
            setFormVisible(true);
          }}
         className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          + Müşteri Ekle
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Müşteri Adı *</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Web Sitesi</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Açıklama</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Bağlı Sosyal Hesaplar</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {customers.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-400 italic">
                  Henüz müşteri yok.
                </td>
              </tr>
            ) : (
              customers.map((customer, i) => (
                <tr
                  key={i}
                  className="hover:bg-indigo-50 transition cursor-pointer"
                  onDoubleClick={() => {
                    setFormData(customer);
                    setFormVisible(true);
                  }}
                >
                  <td className="px-6 py-4 whitespace-normal max-w-xs font-semibold">{customer.name}</td>
                  <td className="px-6 py-4 text-indigo-600 hover:underline">
                    {customer.website ? (
                      <a href={customer.website} target="_blank" rel="noreferrer">
                        {customer.website}
                      </a>
                    ) : (
                      <span className="text-gray-400 italic">Web sitesi yok</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{customer.description || "-"}</td>
                  <td className="px-6 py-4 flex gap-3 text-xl">
                    {customer.socials.map((s) => (
                      <span key={s} title={s} aria-label={s} className="text-gray-700 hover:text-indigo-600 transition">
                        {socialIcons[s]}
                      </span>
                    ))}
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      onClick={() => {
                        setFormData(customer);
                        setFormVisible(true);
                      }}
                      className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md shadow transition"
                    >
                      Güncelle
                    </button>
                    <button
                      onClick={() => handleDelete(customer.name)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow transition"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {formVisible && (
        <div
          onClick={handleOutsideClick}
          className="fixed inset-0 bg-gray-100 bg-opacity-70 flex items-center justify-center z-50"
        >
          <form
            ref={modalRef}
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Müşteri Bilgileri</h2>

            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-1">
                Müşteri Adı *
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="ABC Ajansı"
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-semibold mb-1">
                Web Sitesi
              </label>
              <input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                placeholder="https://abcajansi.com"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold mb-1">
                Açıklama
              </label>
              <textarea
                id="description"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Dijital pazarlama ajansı"
                className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <p className="font-semibold mb-2">Bağlı Sosyal Hesaplar</p>
              <div className="flex gap-3 flex-wrap">
                {Object.keys(socialIcons).map((platform) => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => toggleSocial(platform)}
                    className={`p-3 rounded-full border transition ${
                      formData.socials.includes(platform)
                        ? "bg-indigo-100 border-indigo-600"
                        : "border-gray-300 hover:border-indigo-400"
                    }`}
                    aria-label={platform}
                  >
                    {socialIcons[platform]}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setFormVisible(false)}
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
              >
                İptal
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Kaydet
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Customers;
