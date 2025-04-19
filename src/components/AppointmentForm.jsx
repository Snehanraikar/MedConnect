import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppointmentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type, doctorName } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    gender: "",
    date: "",
    time: "",
    problem: "",
    history: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted:", {
      ...formData,
      doctorName,
      appointmentType: type,
    });

    toast.success("Appointment successfully submitted!");

    // Redirect after 3 seconds (match with toast duration)
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://content.newsbound.com/public/cwf/cwf_innovation/images/lightbulb2.4bd1ab2431c.gif")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "89vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden", // Prevent scrolling
      }}
    >
      <div className="w-full max-w-2xl p-6 shadow-lg bg-white bg-opacity-90 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {type === "immediate" ? "Immediate Booking" : "Schedule Appointment"}
        </h2>

        {doctorName && (
          <p className="text-center mb-4 text-gray-700 font-medium">
            Booking with: <span className="font-bold">{doctorName}</span>
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Patient Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full h-9 border p-1 rounded-2xl pl-5" // Added pl-2 for padding-left
          />
          <input
            name="age"
            placeholder="Age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full h-9 border p-1 rounded-2xl pl-5" // Added pl-2 for padding-left
          />
          <input
            name="phone"
            placeholder="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full h-9 border p-1 rounded-2xl pl-5" // Added pl-2 for padding-left
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full h-9 border p-1 rounded-2xl pl-5" // Added pl-2 for padding-left
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full h-9 border p-1 rounded-2xl pl-5" // Added pl-2 for padding-left
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full h-9 border p-1 rounded-2xl pl-5" // Added pl-2 for padding-left
          />
          <input
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full h-9 border p-1 rounded-2xl pl-5" // Added pl-2 for padding-left
          />

          <textarea
            name="problem"
            placeholder="Describe your issue"
            value={formData.problem}
            onChange={handleChange}
            required
            className="w-full h-9 border p-1 rounded-2xl pl-5" // Added pl-2 for padding-left
          />
          <textarea
            name="history"
            placeholder="Medication History"
            value={formData.history}
            onChange={handleChange}
            required
            className="w-full h-9 border p-1 rounded-2xl pl-5" // Added pl-2 for padding-left
          />

          <button
            type="submit"
            className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-800"
          >
            Submit
          </button>
        </form>

        {/* Toast container */}
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default AppointmentForm;
