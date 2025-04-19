import React, { useState } from "react";
import { Navbar, Button, Input } from "@material-tailwind/react";
import { FaSearch, FaHistory } from "react-icons/fa"; // Changed to FaHistory
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
const NavBar = () => {
  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "Home") navigate("./");
    if (tab === "24/7 Pharmacy") navigate("./Support247");
    if (tab === "Find Doctors") navigate("./find-doctor");
    if (tab === "Health Reminders") navigate("./health-reminders");

  };

  return (
    <Navbar className="bg-gradient-to-r from-blue-700 to-blue-800 px-6 py-4 shadow-md">
      <div className="flex items-center justify-between w-full">

        {/* Logo */}
        <div className="text-white text-3xl font-semibold tracking-wide cursor-pointer">
          MedConnect
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8">
          {["Home", "24/7 Pharmacy", "Find Doctors", "Health Reminders"].map((tab) => (
            <Button
              key={tab}
              variant="text"
              className={`relative text-white text-lg transition-all duration-200 hover:font-semibold`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
              {/* Underline Effect */}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-white w-full transform transition-all duration-300 ${
                  activeTab === tab ? "scale-x-100" : "scale-x-0"
                }`}
              ></span>
            </Button>
          ))}
        </div>

        {/* Icons & Search */}
        <div className="flex items-center space-x-6">
          {/* Order History Icon */}
         
        <div className="flex items-center space-x-6">
          <Link to="/order-history" className="text-white text-2xl cursor-pointer hover:text-white transition duration-200">
            <FaHistory title="Order History" />
          </Link>
        </div>

          {/* Search Bar */}
          <div className="relative w-72">
            <Input
              type="search"
              placeholder="Search..."
              className="border-none rounded-full py-3 pl-12 pr-4 w-full text-lg text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200 shadow-md"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default NavBar;
