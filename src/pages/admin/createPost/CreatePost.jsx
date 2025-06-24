import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreatePostStep1 from "./CreatePostStep1";
import CreatePostStep2 from "./CreatePostStep2";
import CreatePostStep3 from "./CreatePostStep3";
import CreatePostStep4 from "./CreatePostStep4.jsx";


const CreatePost = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    connectedAccounts: [],
    selectedClient: "",
    title: "",
    content: "",
    hashtags: "",
    mentions: "",
    media: null,
    // diğer adımların verileri...
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Formu kaydet ve /admin/posts sayfasına yönlendir
  const handleSubmit = () => {
    // Burada form verilerini API'ye gönderebilirsin veya local storage'a kaydedebilirsin
    // Örneğin localStorage kullanımı (örnek amaçlı):

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(formData);
    localStorage.setItem("posts", JSON.stringify(posts));

    // Başarılı kayıt sonrası yönlendir
    navigate("/admin/posts");
  };

  return (
<div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-10">
      {/* Adım göstergesi buraya eklenebilir */}
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
