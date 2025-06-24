import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const steps = [
  "Müşteri Seç",
  "Platformları Seç",
  "İçerik Oluştur",
  "Planla ve Gönder",
];

const CreatePostStep4 = ({ formData, onBack, onReset }) => {
  const navigate = useNavigate();

  const [scheduledTime, setScheduledTime] = useState(() => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    return now.toISOString().slice(0, 16);
  });

  const [selectedPlatforms] = useState(
    formData.connectedAccounts?.map((acc) => acc.platform) || []
  );

  const handleSave = (type) => {
    const isDraft = type === "draft";
    const isPublish = type === "publish";

    if (!isDraft && (!scheduledTime || selectedPlatforms.length === 0)) {
      alert("Lütfen zaman seçin ve en az bir platform seçin.");
      return;
    }

    const key = isDraft
      ? "draftPosts"
      : isPublish
      ? "publishedPosts"
      : "plannedPosts";

    const existing = JSON.parse(localStorage.getItem(key)) || [];

    const newPost = {
      ...formData,
      selectedPlatforms,
      scheduledTime: isDraft ? null : scheduledTime,
      createdAt: new Date().toISOString(),
      status: isDraft ? "draft" : isPublish ? "published" : "planned",
    };

    localStorage.setItem(key, JSON.stringify([...existing, newPost]));

    alert(
      isDraft
        ? "Taslak başarıyla kaydedildi!"
        : isPublish
        ? "Gönderi yayınlandı!"
        : "Gönderi planlandı!"
    );

    onReset();

    if (!isDraft) {
      navigate("/admin/posts");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm space-y-10">
      {/* Başlık */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Yeni Yazı Oluştur</h1>
        <p className="text-sm text-gray-500 mt-1">
          Birden fazla sosyal medya platformunda içerik oluşturun ve planlayın.
        </p>
      </div>

      {/* Adım göstergesi */}
      <div className="flex justify-between items-center">
        {steps.map((label, index) => {
          const step = index + 1;
          const isActive = step === 4;
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step}
              </div>
              <span
                className={`text-xs mt-1 text-center ${
                  isActive ? "text-indigo-600 font-medium" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Yayın Zamanı */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Yayınlanma Zamanı <span className="text-red-500">*</span>
        </label>
        <input
          type="datetime-local"
          value={scheduledTime}
          onChange={(e) => setScheduledTime(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      {/* Seçili platformların listesi */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">Paylaşılacak Platformlar</p>
        <ul className="list-disc list-inside text-gray-700 text-sm">
          {selectedPlatforms.length > 0 ? (
            selectedPlatforms.map((platform, idx) => <li key={idx}>{platform}</li>)
          ) : (
            <li className="text-red-500">Platform seçilmemiş.</li>
          )}
        </ul>
      </div>

      {/* Butonlar */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 pt-6">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100"
        >
          Geri
        </button>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => handleSave("draft")}
            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Taslak Kaydet
          </button>
          <button
            onClick={() => handleSave("plan")}
            className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Planla
          </button>
          <button
            onClick={() => handleSave("publish")}
            className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Yayınla
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostStep4;
