import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Health tips
const healthTips = [
  "An apple a day keeps the doctor away.",
  "Drink at least 8 glasses of water a day.",
  "Take the stairs instead of the elevator to improve your health.",
  "Sleep for 7-9 hours every night for optimal health.",
  "Exercise for at least 30 minutes a day to stay fit.",
  "Avoid smoking and limit alcohol consumption.",
  "Eat a balanced diet rich in fruits and vegetables.",
  "Stay active throughout the day to maintain energy levels.",
  "Take breaks during work to stretch and relax your body.",
  "Wash your hands regularly to prevent illness."
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const HealthReminders = () => {
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem("reminders");
    return saved ? JSON.parse(saved) : [];
  });
  const [medicine, setMedicine] = useState("");
  const [time, setTime] = useState("");
  const [recurrence, setRecurrence] = useState("once");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState([]);
  const [currentTip, setCurrentTip] = useState(0);
  const [visits, setVisits] = useState([]);
  const [reason, setReason] = useState("");
  const [doctor, setDoctor] = useState("");
  const [prescribedMeds, setPrescribedMeds] = useState("");
  const [documents, setDocuments] = useState([]);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const toggleDay = (day) => {
    setSelectedDays((prevDays) => {
      if (prevDays.includes(day)) {
        return prevDays.filter((selectedDay) => selectedDay !== day);
      } else {
        return [...prevDays, day];
      }
    });
  };

  const addReminder = () => {
    if (!medicine || !time) {
      setError("Please fill out all fields.");
      return;
    }
    setError(null);

    const newReminder = {
      id: Date.now(),
      medicine,
      time,
      recurrence,
      days: recurrence === "weekly" ? [...selectedDays] : [],
      date: selectedDate.toISOString().split("T")[0],
    };
    setReminders((prev) => [...prev, newReminder]);
    setMedicine("");
    setTime("");
    setRecurrence("once");
    setSelectedDays([]);
    setSuccess("Reminder added successfully!");
  };

  const addVisit = () => {
    if (!reason || !doctor || !prescribedMeds) {
      setError("Please fill out all fields.");
      return;
    }
    setError(null);

    const newVisit = {
      id: Date.now(),
      reason,
      doctor,
      medicines: prescribedMeds.split(",").map((m) => m.trim()),
      date: new Date().toLocaleString(),
    };

    setVisits([newVisit, ...visits]);
    setReason("");
    setDoctor("");
    setPrescribedMeds("");
    setSuccess("Doctor visit recorded successfully!");
  };

  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    const docs = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setDocuments([...documents, ...docs]);
  };

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const currentDay = DAYS[now.getDay()];
      const currentTime = now.toTimeString().slice(0, 5);

      reminders.forEach((reminder) => {
        if (reminder.time === currentTime) {
          if (
            reminder.recurrence === "daily" ||
            reminder.recurrence === "once" ||
            (reminder.recurrence === "weekly" && reminder.days.includes(currentDay))
          ) {
            showNotification(reminder.medicine, reminder.time);
          }
        }
      });
    };

    const interval = setInterval(checkReminders, 60000);
    return () => clearInterval(interval);
  }, [reminders]);

  const showNotification = (medicine, time) => {
    if (Notification.permission === "granted") {
      new Notification("💊 Medicine Reminder", {
        body: `Time to take your medicine: ${medicine} (${time})`,
      });
    }
  };

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  const getRemindersForDate = (date) => {
    return reminders.filter((reminder) => reminder.date === date.toISOString().split("T")[0]);
  };

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % healthTips.length);
  };

  return (
    <div className="p-6 max-w-full mx-auto space-y-12 bg-gray-50 rounded-xl shadow-lg">
      {/* Health Tips Section */}
      <section className="bg-yellow-100 rounded-lg shadow-lg p-6 mb-8 w-full">
        <h2 className="text-2xl font-semibold text-yellow-700">🌟 Health Tip of the Day</h2>
        <p className="text-lg text-gray-700 mt-4">{healthTips[currentTip]}</p>
        <button
          onClick={nextTip}
          className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg shadow-md transition-all"
        >
          Next Tip
        </button>
      </section>

      {/* Error and Success Messages */}
      {error && (
        <div className="text-red-500 p-4 bg-red-100 rounded-lg shadow-md">
          {error}
        </div>
      )}
      {success && (
        <div className="text-green-500 p-4 bg-green-100 rounded-lg shadow-md">
          {success}
        </div>
      )}

      {/* Calendar */}
      <div className="mb-8 w-full">
        <Calendar
          onChange={onDateChange}
          value={selectedDate}
          tileClassName={({ date }) => {
            if (getRemindersForDate(date).length > 0) {
              return "highlighted-date bg-blue-200 text-blue-700";
            }
            return "";
          }}
        />
      </div>

      {/* Reminders for selected date */}
      <div className="mt-6 w-full">
        <h3 className="text-xl font-semibold mb-2">For {selectedDate.toDateString()}</h3>
        {getRemindersForDate(selectedDate).length > 0 && (
          <div className="space-y-4 w-full">
            <h4 className="font-semibold text-blue-600">💊 Medicine Reminders:</h4>
            <ul className="space-y-3">
              {getRemindersForDate(selectedDate).map((reminder) => (
                <li
                  key={reminder.id}
                  className="bg-blue-50 border border-blue-200 p-4 rounded-lg shadow-lg transition-all"
                >
                  <strong>{reminder.medicine}</strong> at {reminder.time} — {reminder.recurrence}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Add Reminder Section */}
      <div className="space-y-6 mt-8 p-6 rounded-xl shadow-lg bg-white w-full">
        <h3 className="text-xl font-semibold text-gray-700">Set a New Reminder</h3>
        <input
          type="text"
          placeholder="Medicine Name"
          value={medicine}
          onChange={(e) => setMedicine(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-xl w-full shadow-md"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-xl w-full shadow-md"
        />
        <select
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-xl w-full shadow-md"
        >
          <option value="once">Once</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly (choose days)</option>
        </select>

        {recurrence === "weekly" && (
          <div className="flex flex-wrap gap-2">
            {DAYS.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedDays.includes(day)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={addReminder}
          className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all"
        >
          Set Reminder
        </button>
      </div>

      {/* Doctor Visit History Section */}
      <section className="bg-white rounded-lg shadow-lg p-6 space-y-6 mt-12 w-full">
        <h2 className="text-2xl font-semibold text-green-600">🩺 Doctor Visit History</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          <input
            type="text"
            placeholder="Reason for visit"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-500 w-full"
          />
          <input
            type="text"
            placeholder="Doctor's name"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-500 w-full"
          />
          <input
            type="text"
            placeholder="Prescribed medicines"
            value={prescribedMeds}
            onChange={(e) => setPrescribedMeds(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-500 w-full"
          />
        </div>
        <button
          onClick={addVisit}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition-all"
        >
          Add Doctor Visit
        </button>
        {visits.length > 0 && (
          <div className="space-y-4 mt-6 w-full">
            <h3 className="text-xl font-semibold">Recent Visits:</h3>
            {visits.map((visit) => (
              <div
                key={visit.id}
                className="bg-green-50 border border-green-200 p-4 rounded-xl shadow-md w-full"
              >
                <h4 className="font-semibold">{visit.reason}</h4>
                <p>Doctor: {visit.doctor}</p>
                <p>Medicines: {visit.medicines.join(", ")}</p>
                <p className="text-sm text-gray-500">Visited on: {visit.date}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Document Upload Section */}
      <section className="mt-12 w-full">
        <h2 className="text-2xl font-semibold text-purple-600">📄 Document Upload</h2>
        <input
          type="file"
          multiple
          onChange={handleDocumentUpload}
          className="border px-4 py-3 rounded-xl w-full mt-4 bg-white"
        />
        {documents.length > 0 && (
          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-semibold">Uploaded Documents:</h3>
            {documents.map((doc, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-lg bg-purple-50 w-full"
              >
                <p>{doc.name}</p>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600"
                >
                  View Document
                </a>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HealthReminders;
