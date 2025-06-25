import React, { useState, useEffect } from "react";
import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import tr from "date-fns/locale/tr";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  FaChevronLeft,
  FaChevronRight,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
  FaTimes,
} from "react-icons/fa";
import { RxTwitterLogo } from "react-icons/rx";

const locales = { tr };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const platforms = [
  {
    name: "Instagram",
    icon: <FaInstagram size={20} className="text-pink-500" />,
    colorClass: "text-pink-300",
  },
  {
    name: "Twitter",
    icon: <RxTwitterLogo size={20} className="text-blue-400" />,
    colorClass: "text-blue-300",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin size={20} className="text-blue-700" />,
    colorClass: "text-blue-300",
  },
  {
    name: "TikTok",
    icon: <FaTiktok size={20} className="text-black" />,
    colorClass: "text-gray-400",
  },
  {
    name: "YouTube",
    icon: <FaYoutube size={20} className="text-red-600" />,
    colorClass: "text-red-300",
  },
];

export default function CalendarComponent() {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [hoverBtn, setHoverBtn] = useState(null);
  const [hoverView, setHoverView] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]); // Çoklu seçim
  const [error, setError] = useState("");

  const loadEvents = () => {
    const planned = JSON.parse(localStorage.getItem("plannedPosts")) || [];
    const mapped = planned.map((ev) => ({
      title: ev.title,
      start: new Date(ev.date),
      end: new Date(ev.date),
      allDay: true,
      platforms: ev.platforms || [ev.platform] || [], // eski uyumluluk için array
    }));
    setEvents(mapped);
  };

  useEffect(() => {
    loadEvents();

    const handlePlannedPostsUpdated = () => {
      loadEvents();
    };

    window.addEventListener("plannedPostsUpdated", handlePlannedPostsUpdated);
    return () => {
      window.removeEventListener("plannedPostsUpdated", handlePlannedPostsUpdated);
    };
  }, []);

  const openForm = (date) => {
    setSelectedDate(date);
    setNewTitle("");
    setSelectedPlatforms([]);
    setError("");
    setShowForm(true);
  };

  const openFormToday = () => openForm(new Date());

  const handleSavePost = () => {
    if (!newTitle.trim()) {
      setError("Lütfen gönderi başlığı girin.");
      return;
    }
    if (selectedPlatforms.length === 0) {
      setError("Lütfen en az bir platform seçin.");
      return;
    }

    const newPost = {
      title: newTitle.trim(),
      date: selectedDate.toISOString(),
      platforms: selectedPlatforms,
    };

    const currentPosts = JSON.parse(localStorage.getItem("plannedPosts")) || [];
    const updatedPosts = [...currentPosts, newPost];

    localStorage.setItem("plannedPosts", JSON.stringify(updatedPosts));

    setShowForm(false);
    setNewTitle("");
    setSelectedDate(null);
    setSelectedPlatforms([]);
    setError("");

    loadEvents();

    window.dispatchEvent(new Event("plannedPostsUpdated"));
  };

  // Silme fonksiyonu (platformlar çoklu)
  const handleDeleteEvent = (event) => {
    if (
      window.confirm(
        `"${event.title}" başlıklı gönderiyi silmek istediğinize emin misiniz?`
      )
    ) {
      const currentPosts = JSON.parse(localStorage.getItem("plannedPosts")) || [];
      const filteredPosts = currentPosts.filter(
        (p) =>
          !(
            p.title === event.title &&
            new Date(p.date).getTime() === event.start.getTime() &&
            JSON.stringify(p.platforms || [p.platform]) === JSON.stringify(event.platforms)
          )
      );
      localStorage.setItem("plannedPosts", JSON.stringify(filteredPosts));
      loadEvents();
      window.dispatchEvent(new Event("plannedPostsUpdated"));
    }
  };

  function CustomToolbar(toolbar) {
    const goToBack = () => {
      let mDate = new Date(toolbar.date);
      if (toolbar.view === Views.MONTH) mDate.setMonth(mDate.getMonth() - 1);
      else if (toolbar.view === Views.WEEK) mDate.setDate(mDate.getDate() - 7);
      else if (toolbar.view === Views.DAY) mDate.setDate(mDate.getDate() - 1);
      toolbar.onNavigate("prev", mDate);
    };

    const goToNext = () => {
      let mDate = new Date(toolbar.date);
      if (toolbar.view === Views.MONTH) mDate.setMonth(mDate.getMonth() + 1);
      else if (toolbar.view === Views.WEEK) mDate.setDate(mDate.getDate() + 7);
      else if (toolbar.view === Views.DAY) mDate.setDate(mDate.getDate() + 1);
      toolbar.onNavigate("next", mDate);
    };

    const changeView = (newView) => {
      toolbar.onView(newView);
    };

    return (
      <div className="bg-white p-6 space-y-10">
        <div className="flex items-center gap-4 flex-grow justify-center sm:justify-start">
          <button
            aria-label="Previous"
            onClick={goToBack}
            onMouseEnter={() => setHoverBtn("prev")}
            onMouseLeave={() => setHoverBtn(null)}
            className={`${
              hoverBtn === "prev" ? "border-blue-300" : "border-transparent"
            } flex items-center justify-center p-3 border rounded-full text-gray-600 hover:bg-blue-50`}
          >
            <FaChevronLeft />
          </button>

          <div className="text-2xl font-semibold text-gray-800">
            {format(toolbar.date, "d MMMM yyyy", { locale: tr })}
          </div>

          <button
            aria-label="Next"
            onClick={goToNext}
            onMouseEnter={() => setHoverBtn("next")}
            onMouseLeave={() => setHoverBtn(null)}
            className={`${
              hoverBtn === "next" ? "border-blue-300" : "border-transparent"
            } flex items-center justify-center p-3 border rounded-full text-gray-600 hover:bg-blue-50`}
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="flex gap-4">
          {[Views.MONTH, Views.WEEK, Views.DAY].map((v) => (
            <button
              key={v}
              onClick={() => changeView(v)}
              onMouseEnter={() => setHoverView(v)}
              onMouseLeave={() => setHoverView(null)}
              className={`${
                toolbar.view === v
                  ? "bg-blue-100 border-blue-500 text-blue-700 font-semibold"
                  : "text-gray-600"
              } px-6 py-3 rounded-xl transition-all border ${
                hoverView === v ? "bg-blue-50" : ""
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Etkinlik gösterimi platform ikonları, çoklu platform, ikonlar çok açık renk
  const Event = ({ event }) => {
    return (
      <div className="flex items-center justify-between gap-2 text-sm font-semibold">
        <div className="flex items-center gap-1">
          {(event.platforms || []).map((pName) => {
            const platformObj = platforms.find((p) => p.name === pName);
            if (!platformObj) return null;
            return (
              <span
                key={pName}
                className={`flex items-center justify-center w-5 h-5 ${platformObj.colorClass}`}
              >
                {platformObj.icon}
              </span>
            );
          })}
          <span>{event.title}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteEvent(event);
          }}
          aria-label="Etkinliği sil"
          title="Etkinliği sil"
          className="text-gray-300 hover:text-red-500 transition text-lg"
          type="button"
        >
          <FaTimes />
        </button>
      </div>
    );
  };

  // Seçili gün için beyaz arka plan + açık gri border
  const customDayPropGetter = (date) => {
    const isSelected =
      selectedDate &&
      date.getFullYear() === selectedDate.getFullYear() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getDate() === selectedDate.getDate();
    return {
      style: {

        backgroundColor: isSelected ? "#ffffff" : undefined,
        color: isSelected ? "#374151" : undefined, // gray-700
        border: isSelected ? "1.5px solid #e5e7eb" : undefined, // gray-200
        boxShadow: isSelected ? "0 0 5px rgba(0,0,0,0.05)" : undefined,
      },
    };
  };

  // Platform seçim buton toggle fonksiyonu
  const togglePlatform = (name) => {
    if (selectedPlatforms.includes(name)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== name));
    } else {
      setSelectedPlatforms([...selectedPlatforms, name]);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-10 relative">
      <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="w-full text-center sm:text-left">
          <h1 className="text-4xl font-bold text-gray-800">İçerik Takvimi</h1>
          <p className="text-gray-600 mt-2 text-lg">
            Planlanmış gönderileri görüntüleme ve yönetme
          </p>
        </div>
      </header>

      <div className="overflow-hidden rounded-xl shadow-md">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{
            height: "calc(180vh - 220px)",
            borderRadius: "1px",
            border: "1.5px solid #CBD5E1",
            fontSize: "16px",
            userSelect: "none",
          }}
          view={view}
          date={date}
          onNavigate={(newDate) => setDate(newDate)}
          onView={(newView) => setView(newView)}
          culture="tr"
          messages={{
            next: "İleri",
            previous: "Geri",
            today: "Bugün",
            month: "Ay",
            week: "Hafta",
            day: "Gün",
            agenda: "Ajanda",
            date: "Tarih",
            time: "Saat",
            event: "Etkinlik",
            noEventsInRange: "Bu aralıkta etkinlik yok.",
            showMore: (count) => `+${count} daha`,
          }}
          components={{
            toolbar: CustomToolbar,
            event: Event,
          }}
          selectable
          onSelectSlot={({ start }) => openForm(start)}
          dayPropGetter={customDayPropGetter}
        />
      </div>

      {/* Sol alt köşede + butonu */}
      <button
        onClick={openFormToday}
        className="fixed bottom-8 left-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl shadow-lg transition"
        aria-label="Yeni gönderi ekle"
        title="Yeni gönderi ekle"
      >
        +
      </button>

      {/* Modal (arka plan beyaz çok açık gri) */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-8 w-80 max-w-full relative space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Yeni Gönderi Planla</h2>
            <p className="text-gray-600">Tarih: {format(selectedDate, "dd MMMM yyyy", { locale: tr })}</p>
            <input
              type="text"
              placeholder="Gönderi başlığı"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              autoFocus
            />

            <div>
              <p className="mb-2 font-semibold text-gray-700">Platform Seçin:</p>
              <div className="flex gap-3">
                {platforms.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => togglePlatform(p.name)}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition
                      ${
                        selectedPlatforms.includes(p.name)
                          ? "border-blue-600 text-blue-600"
                          : "border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-400"
                      }
                    `}
                    type="button"
                    aria-label={p.name}
                    title={p.name}
                  >
                    {p.icon}
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-red-600 font-semibold">{error}</p>}

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:underline"
              >
                İptal
              </button>
              <button
                onClick={handleSavePost}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
