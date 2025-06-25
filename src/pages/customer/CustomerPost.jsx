import React, { useState } from "react";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { RxTwitterLogo } from "react-icons/rx";
import { v4 as uuidv4 } from "uuid";

const platforms = [
  { name: "Instagram", icon: <FaInstagram className="text-pink-500" />, colorClass: "text-pink-600" },
  { name: "Twitter", icon: <RxTwitterLogo className="text-blue-400" />, colorClass: "text-blue-600" },
  { name: "LinkedIn", icon: <FaLinkedin className="text-blue-700" />, colorClass: "text-blue-800" },
  { name: "TikTok", icon: <FaTiktok className="text-black" />, colorClass: "text-gray-800" },
  { name: "YouTube", icon: <FaYoutube className="text-red-600" />, colorClass: "text-red-700" },
];

export default function CustomerPost() {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");

  const togglePlatform = (name) => {
    setSelectedPlatforms((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Lütfen bir resim dosyası seçin.");
      return;
    }
    setError("");
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      setError("Lütfen başlık girin.");
      return;
    }
    if (!description.trim()) {
      setError("Lütfen açıklama girin.");
      return;
    }
    if (selectedPlatforms.length === 0) {
      setError("Lütfen en az bir platform seçin.");
      return;
    }

    setError("");

    const newPost = {
      id: uuidv4(),
      title,
      description,
      photo,
      platforms: selectedPlatforms,
      date: new Date().toISOString(),
      status: "Yayınlandı",
    };

    const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = [...existingPosts, newPost];
    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    console.log("Admin'e iletilen veri:", newPost);
    alert("Gönderiniz admin'e ve gönderiler sayfasına iletildi!");

    setTitle("");
    setDescription("");
    setPhoto(null);
    setSelectedPlatforms([]);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-10">
      {/* Sol: Form */}
      <div className="flex-1 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Gönderi Oluştur & Platform Seç
        </h1>
        <p className="text-gray-600">
          İçeriğin başlığını, açıklamasını yazın, fotoğraf ekleyin ve paylaşmak
          istediğiniz sosyal medya platformlarını seçin.
        </p>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">Başlık</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Başlık girin"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">Açıklama</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Açıklama girin"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">Fotoğraf Yükle</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="block w-full"
          />
        </div>

        <div>
          <p className="mb-2 font-semibold text-gray-700">Platform Seçin:</p>
          <div className="flex flex-wrap gap-3">
            {platforms.map(({ name, icon, colorClass }) => (
              <button
                key={name}
                type="button"
                onClick={() => togglePlatform(name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition
                  ${
                    selectedPlatforms.includes(name)
                      ? `bg-${colorClass.replace("text-", "")} bg-opacity-20 border-${colorClass.replace("text-", "")} text-${colorClass.replace("text-", "")}`
                      : "border-gray-300 text-gray-600 hover:bg-gray-100"
                  }
                `}
              >
                <span className={`text-xl ${colorClass}`}>{icon}</span> {name}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-red-600 font-semibold">{error}</p>}

        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Gönder
        </button>
      </div>

      {/* Sağ: Önizleme */}
      <div className="flex-1 border border-gray-200 rounded-xl p-6 shadow-sm bg-gray-50">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Önizleme</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-gray-700">{title || "Başlık burada görünecek"}</h3>
          </div>
          <div>
            <p className="text-gray-600 whitespace-pre-wrap">
              {description || "Açıklama burada görünecek"}
            </p>
          </div>
          <div>
            {photo ? (
              <img
                src={photo}
                alt="Gönderi fotoğrafı"
                className="w-full max-h-64 object-contain rounded-md border border-gray-300"
              />
            ) : (
              <div className="w-full h-40 flex items-center justify-center border border-dashed border-gray-300 rounded-md text-gray-400">
                Fotoğraf önizlemesi burada
              </div>
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-1">Seçilen Platformlar:</p>
            {selectedPlatforms.length > 0 ? (
              <ul className="flex flex-wrap gap-3">
                {selectedPlatforms.map((name) => {
                  const platformObj = platforms.find((p) => p.name === name);
                  return (
                    <li
                      key={name}
                      className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-200 text-gray-700"
                    >
                      {platformObj?.icon} <span>{name}</span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-500 italic">Henüz platform seçilmedi</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
