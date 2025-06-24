import React, { useState, useEffect } from "react";
import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import tr from "date-fns/locale/tr";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const locales = { tr };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarComponent() {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [hoverBtn, setHoverBtn] = useState(null);
  const [hoverView, setHoverView] = useState(null);

  // plannedPosts'u localStorage'dan okuyup events state'ine yükleyen fonksiyon
  const loadEvents = () => {
    const planned = JSON.parse(localStorage.getItem("plannedPosts")) || [];
    const mapped = planned.map((ev) => ({
      title: ev.title,
      start: new Date(ev.date),
      end: new Date(ev.date),
      allDay: true,
    }));
    setEvents(mapped);
  };

  useEffect(() => {
    // İlk yüklemede events'i yükle
    loadEvents();

    // plannedPosts güncellendiğinde dinlemek için event listener
    const handlePlannedPostsUpdated = () => {
      loadEvents();
    };

    window.addEventListener("plannedPostsUpdated", handlePlannedPostsUpdated);

    return () => {
      window.removeEventListener("plannedPostsUpdated", handlePlannedPostsUpdated);
    };
  }, []);

  function CustomToolbar(toolbar) {
    const goToBack = () => {
      let mDate = new Date(toolbar.date);
      if (toolbar.view === Views.MONTH) {
        mDate.setMonth(mDate.getMonth() - 1);
      } else if (toolbar.view === Views.WEEK) {
        mDate.setDate(mDate.getDate() - 7);
      } else if (toolbar.view === Views.DAY) {
        mDate.setDate(mDate.getDate() - 1);
      }
      toolbar.onNavigate("prev", mDate);
    };

    const goToNext = () => {
      let mDate = new Date(toolbar.date);
      if (toolbar.view === Views.MONTH) {
        mDate.setMonth(mDate.getMonth() + 1);
      } else if (toolbar.view === Views.WEEK) {
        mDate.setDate(mDate.getDate() + 7);
      } else if (toolbar.view === Views.DAY) {
        mDate.setDate(mDate.getDate() + 1);
      }
      toolbar.onNavigate("next", mDate);
    };

    const changeView = (newView) => {
      toolbar.onView(newView);
    };

    return (
      <div className="bg-white  p-6 space-y-10">
        {/* Tarih ve gezinme butonları */}
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

        {/* Görünüm değişim butonları */}
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

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-10">
      <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
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
          }}
        />
      </div>
    </div>
  );
}
