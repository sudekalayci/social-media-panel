import React, { useState, useEffect } from "react";
import { FaUserCircle, FaHeart, FaRegComment, FaPaperPlane } from "react-icons/fa";

const steps = ["Müşteri Seç", "Platformları Seç", "İçerik Oluştur", "Planla ve Gönder"];

const CreatePostStep3 = ({ formData, setFormData, onBack, onNext }) => {
  const [platformData, setPlatformData] = useState(
    formData.platformData || {
      instagram: {
        overrideTitle: "",
        overrideContent: "",
        hashtags: "",
        mentions: "",
      },
    }
  );

  useEffect(() => {
    if (formData.platformData) {
      setPlatformData(formData.platformData);
    }
  }, [formData.platformData]);

  const handleChange = (field, value) => {
    setPlatformData((prev) => ({
      ...prev,
      instagram: {
        ...prev.instagram,
        [field]: value,
      },
    }));
  };

  const handleNext = () => {
    setFormData({
      ...formData,
      platformData,
    });
    onNext();
  };

  const { overrideTitle, overrideContent, hashtags, mentions } =
    platformData.instagram || {};
  const title = overrideTitle || formData.title;
  const content = overrideContent || formData.content;
  const finalHashtags = hashtags || formData.hashtags;
  const finalMentions = mentions || formData.mentions;

  return (
    <div>
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
          const step = index + 1;
          const isActive = step === 3;
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  isActive ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"
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

      {/* Instagram Alanları */}
      <div className="border border-gray-200 rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Instagram İçeriği</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Alanları */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Özel Başlık</label>
              <input
                type="text"
                placeholder="Ana başlıktan farklıysa yazın..."
                value={overrideTitle}
                onChange={(e) => handleChange("overrideTitle", e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Özel İçerik</label>
              <textarea
                rows={4}
                maxLength={2200}
                placeholder="Ana içerikten farklıysa yazın..."
                value={overrideContent}
                onChange={(e) => handleChange("overrideContent", e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">İnternet Hashtag'leri</label>
              <input
                type="text"
                placeholder="#hashtag"
                value={hashtags}
                onChange={(e) => handleChange("hashtags", e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Bahs -eder</label>
              <input
                type="text"
                placeholder="@user"
                value={mentions}
                onChange={(e) => handleChange("mentions", e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Canlı Önizleme */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 ml-4">Canlı Önizleme</label>
            <div className="rounded border border-gray-200 shadow-sm max-w-sm mx-auto bg-white">
              <div className="flex items-center gap-2 px-4 py-3">
                <FaUserCircle className="text-2xl text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">your_account</p>
                  <p className="text-xs text-gray-400">Sponsor</p>
                </div>
              </div>
              <div className="w-full h-60 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                Gönderi görseli/video
              </div>
              <div className="px-4 py-3 space-y-2">
                <div className="flex items-center gap-4 text-xl text-gray-700">
                  <FaHeart />
                  <FaRegComment />
                  <FaPaperPlane />
                </div>
                <p className="text-sm text-gray-800">
                  <span className="font-semibold">your_account</span> {title}
                </p>
                <p className="text-sm text-gray-700">{content}</p>
                <p className="text-sm text-blue-500">{finalHashtags}</p>
                <p className="text-sm text-gray-500">{finalMentions}</p>
              </div>
            </div>
          </div>
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
          Sonraki: Planla ve Gönder
        </button>
      </div>
    </div>
  );
};

export default CreatePostStep3;
