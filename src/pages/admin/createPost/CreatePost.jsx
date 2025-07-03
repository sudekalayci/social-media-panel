import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreatePostStep1 from "./CreatePostStep1";
import CreatePostStep2 from "./CreatePostStep2";
import CreatePostStep3 from "./CreatePostStep3";
import CreatePostStep4 from "./CreatePostStep4";

const CreatePost = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Başlangıçta localStorage'dan formData yükle, yoksa default ile başla
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("createPostFormData");
    return saved
      ? JSON.parse(saved)
      : {
          connectedAccounts: [],
          selectedClient: "",
          title: "",
          content: "",
          hashtags: "",
          mentions: "",
          media: null,
          platformData: {},
        };
  });

  // formData her değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem("createPostFormData", JSON.stringify(formData));
  }, [formData]);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Form tamamlandığında kaydet (örnek localStorage'da 'posts' dizisine ekle)
  const handleSubmit = () => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(formData);
    localStorage.setItem("posts", JSON.stringify(posts));

    // Form datasını temizle
    localStorage.removeItem("createPostFormData");

    alert("Gönderi başarıyla kaydedildi!");

    // Ana sayfaya veya admin/posts sayfasına yönlendir
    navigate("/admin/posts");
  };

  return (
 <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-10">
      
      {step === 1 && (
        <CreatePostStep1
          formData={formData}
          setFormData={setFormData}
          onNext={nextStep}
        />
      )}
      {step === 2 && (
        <CreatePostStep2
          formData={formData}
          setFormData={setFormData}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {step === 3 && (
        <CreatePostStep3
          formData={formData}
          setFormData={setFormData}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {step === 4 && (
        <CreatePostStep4
          formData={formData}
          setFormData={setFormData}
          onBack={prevStep}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default CreatePost;
