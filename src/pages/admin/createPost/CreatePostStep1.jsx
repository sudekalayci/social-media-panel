import { useEffect, useState } from "react";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

const platformIcons = {
  Instagram: <FaInstagram className="text-pink-500 text-xl" />,
  Twitter: <FaTwitter className="text-blue-400 text-xl" />,
  LinkedIn: <FaLinkedin className="text-blue-700 text-xl" />,
  "TikTok": <FaTiktok className="text-black text-xl" />,
  "YouTube": <FaYoutube className="text-red-600 text-xl" />,
};

const platforms = [
  "Instagram",
  "LinkedIn",
  "Twitter",
  "TikTok",
  "YouTube",
];

const steps = [
  "Müşteri Seç",
  "Platformları Seç",
  "İçerik Oluştur",
  "Planla ve Gönder",
];

const CreatePostStep1 = ({ onNext }) => {
  const [selectedClient, setSelectedClient] = useState("");
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [formState, setFormState] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("connectedAccounts"));
    if (saved) setConnectedAccounts(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("connectedAccounts", JSON.stringify(connectedAccounts));
  }, [connectedAccounts]);

  const handleInputChange = (platform, field, value) => {
    setFormState((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: value,
      },
    }));
  };

  const handleConnect = (platform) => {
    const data = formState[platform];
    if (!data?.username || !data?.link) {
      alert("Kullanıcı adı ve hesap linki zorunludur.");
      return;
    }

    setConnectedAccounts((prev) => [
      ...prev,
      {
        platform,
        username: data.username,
        link: data.link,
      },
    ]);

    setFormState((prev) => ({ ...prev, [platform]: {} }));
  };

  const handleDisconnect = (platform) => {
    setConnectedAccounts((prev) =>
      prev.filter((acc) => acc.platform !== platform)
    );
  };

  const isConnected = (platform) =>
    connectedAccounts.some((acc) => acc.platform === platform);

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl space-y-8 ">
      {/* Başlık */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Yeni Yazı Oluştur</h1>
        <p className="text-sm text-gray-500 mt-1">
          Birden fazla sosyal medya platformunda içerik oluşturun ve planlayın.
        </p>
      </div>

      {/* Adım Göstergesi */}
      <div className="flex justify-between items-center">
        {steps.map((label, index) => {
          const current = index === 0;
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center flex-1"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  current
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`text-xs mt-1 ${
                  current ? "text-indigo-600 font-medium" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Müşteri Seçimi */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Müşteri *
        </label>
        <select
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring focus:ring-indigo-200"
        >
          <option value="">Müşteri seçin</option>
          <option value="Müşteri 1">Müşteri 1</option>
        </select>
      </div>

      {/* Sosyal Medya Hesapları */}
      <div>
        <h3 className="text-md font-semibold text-gray-800 mb-4">
          Sosyal Medya Hesaplarını Bağlayın
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {platforms.map((platform) => {
            const connected = isConnected(platform);
            const inputs = formState[platform] || {};
            const icon = platformIcons[platform];
            const connectedAccount = connectedAccounts.find(
              (acc) => acc.platform === platform
            );

            return (
              <div
                key={platform}
                className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-medium text-gray-700">
                    {icon}
                    <span>{platform}</span>
                  </div>
                  {connected && (
                    <button
                      onClick={() => handleDisconnect(platform)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Ayır
                    </button>
                  )}
                </div>

                {connected ? (
                  <div className="text-sm">
                    <p className="text-green-600 font-semibold">Bağlandı</p>
                    <p className="text-gray-600 text-xs mt-1 break-all">
                      @{connectedAccount.username}
                    </p>
                    <a
                      href={connectedAccount.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-xs underline break-all"
                    >
                      {connectedAccount.link}
                    </a>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Kullanıcı adı"
                      value={inputs.username || ""}
                      onChange={(e) =>
                        handleInputChange(platform, "username", e.target.value)
                      }
                      className="border border-gray-300 rounded px-3 py-1 w-full"
                    />
                    <input
                      type="text"
                      placeholder="Hesap linki"
                      value={inputs.link || ""}
                      onChange={(e) =>
                        handleInputChange(platform, "link", e.target.value)
                      }
                      className="border border-gray-300 rounded px-3 py-1 w-full"
                    />
                    <button
                      onClick={() => handleConnect(platform)}
                      className="bg-blue-600 text-white w-full py-1.5 rounded hover:bg-blue-700 text-sm"
                    >
                      Hesabı Bağla
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sonraki Butonu */}
      <div className="pt-6 text-right">
        <button
          disabled={connectedAccounts.length === 0 || !selectedClient}
          onClick={() => onNext(connectedAccounts, selectedClient)}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          Sonraki: Platformları Seçin ({connectedAccounts.length} bağlı)
        </button>
      </div>
    </div>
  );
};

export default CreatePostStep1;
