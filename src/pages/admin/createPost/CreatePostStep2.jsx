import React, { useState } from "react";

const steps = [
  "Müşteri Seç",
  "Platformları Seç",
  "İçerik Oluştur",
  "Planla ve Gönder"
];

const CreatePostStep2 = ({ onBack, onNext, formData, setFormData }) => {
  const [localData, setLocalData] = useState({
    title: formData.title || "",
    content: formData.content || "",
    hashtags: formData.hashtags || "",
    mentions: formData.mentions || "",
    media: null,
  });

  const handleChange = (field, value) => {
    setLocalData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleChange("media", file);
  };

  const handleNext = () => {
    if (!localData.title.trim() || !localData.content.trim()) {
      alert("Lütfen zorunlu alanları doldurun.");
      return;
    }
    setFormData({ ...formData, ...localData });
    onNext();
  };

  return (
    <div className="">
      {/* Başlık ve açıklama */}
      <div>
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Yeni Yazı Oluştur</h1>
        <p className="text-sm text-gray-500 mb-4 mt-1">
          Birden fazla sosyal medya platformunda içerik oluşturun ve planlayın.
        </p>
      </div>

      {/* Adım göstergesi */}
      <div className="flex justify-between mb-4 items-center">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === 2;

          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  isActive ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {stepNumber}
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

      {/* Form alanları */}
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Yazı Başlığı <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Yazı başlığını girin..."
            value={localData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            İçerik <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Gönderi içeriğinizi yazın..."
            value={localData.content}
            onChange={(e) => handleChange("content", e.target.value)}
            rows={5}
            className="w-full border border-gray-300 rounded px-3 py-2 resize-y focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            İnternet Hashtag'leri
          </label>
          <input
            type="text"
            placeholder="#example #hashtags"
            value={localData.hashtags}
            onChange={(e) => handleChange("hashtags", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Bahs -eder
          </label>
          <input
            type="text"
            placeholder="@username @mention"
            value={localData.mentions}
            onChange={(e) => handleChange("mentions", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Fotoğraf/Video Yükle
          </label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="w-full"
          />
          {localData.media && (
            <p className="text-sm mt-1 text-gray-600">
              Seçilen dosya: {localData.media.name}
            </p>
          )}
        </div>
      </div>

      {/* Butonlar */}
      <div className="flex justify-between pt-6">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100"
        >
          Geri
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Sonraki: Planlama
        </button>
      </div>
    </div>
  );
};

export default CreatePostStep2;
