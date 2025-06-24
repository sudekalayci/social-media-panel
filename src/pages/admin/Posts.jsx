import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";

const Posts = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm max-w-7xl mx-auto">
      {/* Başlık + Buton Alanı */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <PageHeader title="Gönderiler" subtitle="Tüm sosyal medya gönderilerini görüntüleyin ve yönetin." />
        
        <button
          onClick={() => navigate("/admin/create-post")}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full md:w-auto"
        >
          Yeni Gönderi Ekle
        </button>
      </div>

      {/* Gönderi Listesi (örnek içerik) */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <p className="text-gray-500 text-sm">Gönderi listesi burada gösterilecek.</p>
      </div>
    </div>
  );
};

export default Posts;
