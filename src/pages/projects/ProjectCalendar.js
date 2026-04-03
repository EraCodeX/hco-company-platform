// src/features/EventCalendar/EventCalendar.js
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../features/EventCalendar/EventCalendar.css";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { ArrowLeft } from "lucide-react";
// Funksioni për përkthim të teksteve (title, description)
const translateComment = async (text, targetLang) => {
  try {
    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      body: JSON.stringify({
        q: text,
        source: "auto",
        target: targetLang,
        format: "text"
      }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();
    return data.translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
};

const localizer = momentLocalizer(moment);

const EventCalendar = () => {
  const { t, language } = useLanguage();
  const [events, setEvents] = useState([]);
  const [translatedEvents, setTranslatedEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    description: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE}/api/calendar.php`
        );
        const data = await response.json();
        const formattedEvents = data.map((event) => ({
          title: event.title,
          start: new Date(event.start),
          end: new Date(event.end),
          description: event.description,
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  // Events
  useEffect(() => {
    const translateAll = async () => {
      const promises = events.map(async (e) => {
        const translatedTitle = await translateComment(e.title, language);
        const translatedDescription = await translateComment(e.description, language);
        return { ...e, title: translatedTitle, description: translatedDescription };
      });
      const results = await Promise.all(promises);
      setTranslatedEvents(results);
    };

    if (events.length > 0) translateAll();
  }, [events, language]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventToSave = {
      ...newEvent,
      start: new Date(newEvent.start).toISOString(),
      end: new Date(newEvent.end).toISOString(),
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE}/api/calendar.php`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(eventToSave),
        }
      );
      const result = await response.json();
      if (result.success) {
        setEvents((prev) => [
          ...prev,
          {
            ...newEvent,
            start: new Date(newEvent.start),
            end: new Date(newEvent.end),
          },
        ]);
        setNewEvent({ title: "", start: "", end: "", description: "" });
        setShowForm(false);
      } else {
        alert(t("errorAddingEvent") + ": " + result.message);
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const goToPreviousMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, "months").toDate());
  };

  const goToNextMonth = () => {
    setCurrentDate(moment(currentDate).add(1, "months").toDate());
  };

  const handleNavigate = (newDate) => {
    setCurrentDate(newDate);
  };

  const eventsForCurrentMonth = translatedEvents.filter((event) =>
    moment(event.start).isSame(currentDate, "month")
  );

  return (
    <div className="event-calendar-container">
      <div className="calendar-header">
        <h1>📅 {t("eventCalendar")}</h1>
        <button className="calendar-back-button" onClick={handleBackClick}>
          <ArrowLeft size={28} />
        </button>
      </div>

      <div className="custom-calendar-header">
        <button className="nav-button" onClick={goToPreviousMonth}>
          &laquo; {t("prev")}
        </button>
        <span className="current-month">
          {moment(currentDate).format("MMMM YYYY")}
        </span>
        <button className="nav-button" onClick={goToNextMonth}>
          {t("next")} &raquo;
        </button>
      </div>

      {showForm && (
        <div className="modal">
          <form className="event-form" onSubmit={handleSubmit}>
            <h2>{t("addNewEvent")}</h2>
            <label>
              {t("eventTitle")}
              <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              {t("startTime")}
              <input
                type="datetime-local"
                name="start"
                value={newEvent.start}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              {t("endTime")}
              <input
                type="datetime-local"
                name="end"
                value={newEvent.end}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              {t("description")}
              <textarea
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
              />
            </label>

            <div className="form-buttons">
              <button type="submit">{t("addEvent")}</button>
              <button type="button" onClick={() => setShowForm(false)}>
                {t("cancel")}
              </button>
            </div>
          </form>
        </div>
      )}

      <Calendar
        localizer={localizer}
        events={translatedEvents}
        startAccessor="start"
        endAccessor="end"
        date={currentDate}
        onNavigate={handleNavigate}
        toolbar={false}
        style={{ height: 500, width: "100%" }}
        selectable={false}
        views={["month"]}
        defaultView="month"
      />

      <button className="add-event-button" onClick={() => setShowForm(true)}>
        {t("addEvent")}
      </button>

      <div className="events-for-month">
        <h2>
          {t("eventsIn")} {moment(currentDate).format("MMMM YYYY")}
        </h2>
        {eventsForCurrentMonth.length > 0 ? (
          <ul className="event-list">
            {eventsForCurrentMonth.map((event, index) => (
              <li key={index} className="event-item">
                <div className="event-title">{event.title}</div>
                <div className="event-description">{event.description}</div>
                <div className="event-time">
                  {moment(event.start).format("MMM Do, h:mm A")} -{" "}
                  {moment(event.end).format("MMM Do, h:mm A")}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-events">{t("noEventsMonth")}</p>
        )}
      </div>
    </div>
  );
};

export default EventCalendar;









