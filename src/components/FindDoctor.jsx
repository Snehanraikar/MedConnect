import React, { useState } from 'react';
import Select from 'react-select';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

// Sample doctors' data with availability
const doctorsData = [
  // Whitefield (12 doctors)
  { id: 1, name: 'Dr. Anjali Rao', location: 'Whitefield', specialty: 'Cardiologist', hospital: 'Manipal Hospital', availability: 'available' },
  { id: 2, name: 'Dr. Rohit Sen', location: 'Whitefield', specialty: 'Neurologist', hospital: 'Columbia Asia', availability: 'available_in_time' },
  { id: 3, name: 'Dr. Priya Das', location: 'Whitefield', specialty: 'Orthopedic Surgeon', hospital: 'Fortis', availability: 'available' },
  { id: 4, name: 'Dr. Zaid Khan', location: 'Whitefield', specialty: 'Pediatrician', hospital: 'Rainbow Children’s', availability: 'available_in_time' },
  { id: 5, name: 'Dr. Kavya Iyer', location: 'Whitefield', specialty: 'Oncologist', hospital: 'HCG Hospital', availability: 'available' },
  { id: 6, name: 'Dr. Abhinav Mehta', location: 'Whitefield', specialty: 'Ophthalmologist', hospital: 'Narayana Nethralaya', availability: 'available_in_time' },
  { id: 7, name: 'Dr. Sneha Kapoor', location: 'Whitefield', specialty: 'Dentist', hospital: 'Clove Dental', availability: 'available' },
  { id: 8, name: 'Dr. Tarun Reddy', location: 'Whitefield', specialty: 'Psychiatrist', hospital: 'NIMHANS', availability: 'available_in_time' },
  { id: 9, name: 'Dr. Reema Das', location: 'Whitefield', specialty: 'ENT Specialist', hospital: 'Vikram ENT', availability: 'available' },
  { id: 10, name: 'Dr. Nikhil Jain', location: 'Whitefield', specialty: 'General Physician', hospital: 'Sakra Hospital', availability: 'available_in_time' },
  { id: 11, name: 'Dr. Sheetal Fernandes', location: 'Whitefield', specialty: 'Gynecologist', hospital: 'Cloudnine', availability: 'available' },
  { id: 12, name: 'Dr. Vivek Sharma', location: 'Whitefield', specialty: 'Endocrinologist', hospital: 'Narayana Health', availability: 'available_in_time' },

  // Indiranagar (12 doctors)
  { id: 13, name: 'Dr. Rhea Thomas', location: 'Indiranagar', specialty: 'Cardiologist', hospital: 'Manipal', availability: 'available' },
  { id: 14, name: 'Dr. Saurabh Nair', location: 'Indiranagar', specialty: 'Neurologist', hospital: 'Apollo', availability: 'available_in_time' },
  { id: 15, name: 'Dr. Sheetal Gowda', location: 'Indiranagar', specialty: 'Orthopedic Surgeon', hospital: 'Fortis', availability: 'available' },
  { id: 16, name: 'Dr. Arun Mohan', location: 'Indiranagar', specialty: 'Pediatrician', hospital: 'Motherhood', availability: 'available_in_time' },
  { id: 17, name: 'Dr. Meena Singh', location: 'Indiranagar', specialty: 'Oncologist', hospital: 'HCG', availability: 'available' },
  { id: 18, name: 'Dr. Rajat Verma', location: 'Indiranagar', specialty: 'Ophthalmologist', hospital: 'Vasan Eye Care', availability: 'available_in_time' },
  { id: 19, name: 'Dr. Lavanya Rao', location: 'Indiranagar', specialty: 'Dentist', hospital: '32 Smiles', availability: 'available' },
  { id: 20, name: 'Dr. Usha Prasad', location: 'Indiranagar', specialty: 'Psychiatrist', hospital: 'Cadabams Hospital', availability: 'available_in_time' },
  { id: 21, name: 'Dr. Iqbal Ahmed', location: 'Indiranagar', specialty: 'ENT Specialist', hospital: 'Shanthi ENT', availability: 'available' },
  { id: 22, name: 'Dr. Ravi Chatterjee', location: 'Indiranagar', specialty: 'General Physician', hospital: 'Apollo Clinic', availability: 'available_in_time' },
  { id: 23, name: 'Dr. Kripa Menon', location: 'Indiranagar', specialty: 'Gynecologist', hospital: 'Cloudnine', availability: 'available' },
  { id: 24, name: 'Dr. Akash Singh', location: 'Indiranagar', specialty: 'Endocrinologist', hospital: 'Nova Specialty', availability: 'available_in_time' },

  // Koramangala (12 doctors)
  { id: 25, name: 'Dr. Smita Rao', location: 'Koramangala', specialty: 'Cardiologist', hospital: 'Manipal Hospital', availability: 'available' },
  { id: 26, name: 'Dr. Rajeev Menon', location: 'Koramangala', specialty: 'Neurologist', hospital: 'Apollo', availability: 'available_in_time' },
  { id: 27, name: 'Dr. Harini Gupta', location: 'Koramangala', specialty: 'Orthopedic Surgeon', hospital: 'Sparsh Hospital', availability: 'available' },
  { id: 28, name: 'Dr. Kunal Ahuja', location: 'Koramangala', specialty: 'Pediatrician', hospital: 'Cloudnine', availability: 'available_in_time' },
  { id: 29, name: 'Dr. Geetha Pai', location: 'Koramangala', specialty: 'Oncologist', hospital: 'HCG', availability: 'available' },
  { id: 30, name: 'Dr. Sandeep V', location: 'Koramangala', specialty: 'Ophthalmologist', hospital: 'Narayana Nethralaya', availability: 'available_in_time' },
  { id: 31, name: 'Dr. Shweta Arora', location: 'Koramangala', specialty: 'Dentist', hospital: 'Smilez Dental', availability: 'available' },
  { id: 32, name: 'Dr. Mohammed Ali', location: 'Koramangala', specialty: 'Psychiatrist', hospital: 'NIMHANS', availability: 'available_in_time' },
  { id: 33, name: 'Dr. Neeraj Kulkarni', location: 'Koramangala', specialty: 'ENT Specialist', hospital: 'Vikram ENT', availability: 'available' },
  { id: 34, name: 'Dr. Ashwini Nair', location: 'Koramangala', specialty: 'General Physician', hospital: 'Apollo Clinic', availability: 'available_in_time' },
  { id: 35, name: 'Dr. Swathi Deshmukh', location: 'Koramangala', specialty: 'Gynecologist', hospital: 'Cloudnine', availability: 'available' },
  { id: 36, name: 'Dr. Pavan Shetty', location: 'Koramangala', specialty: 'Endocrinologist', hospital: 'Manipal Hospital', availability: 'available_in_time' },
];
const locations = [...new Set(doctorsData.map(doc => doc.location))].map(loc => ({
  value: loc,
  label: loc
}));

const FindDoctor = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLocationChange = (selected) => {
    setSelectedLocation(selected);
    setSelectedDoctor(null);
    setLoading(true);

    setTimeout(() => {
      const results = doctorsData.filter(doc => doc.location === selected?.value);
      setFilteredDoctors(results);
      setLoading(false);
    }, 1000);
  };

  const getAvailabilityColor = (availability) => {
    return availability === 'available' ? 'green' : 'yellow';
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-light-blue">
      {/* Parallax Background with the given image */}
      {selectedLocation && (
        <div
          className="absolute inset-0 bg-fixed bg-center bg-cover z-0 transition-opacity duration-500"
          style={{
            backgroundImage: `url('https://blog.withings.com//app/uploads/2019/02/overhead-view-of-a-stethoscope-and-a-heart_t20_xRP1dX.jpg')`,
            opacity: 0.5,
            transform: 'scale(1.1)',
          }}
        />
      )}

      {/* White center content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-20 bg-white shadow-lg rounded-xl mt-10">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-8 drop-shadow-lg">
          Find a Doctor
        </h1>

        {/* Location Selection with Animation */}
        <motion.div
          className="w-full max-w-xs mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Select
            options={locations}
            onChange={handleLocationChange}
            placeholder="Select Location..."
            isClearable
            className="text-left"
            styles={{
              control: (styles) => ({
                ...styles,
                borderColor: '#d1d5db',
                boxShadow: 'none',
                '&:hover': {
                  borderColor: '#3b82f6',
                },
              }),
            }}
          />
        </motion.div>
        
        {loading ? (
          <div className="mt-10 text-blue-600 animate-spin text-3xl">
            <FaSpinner />
          </div>
        ) : (
          <div
            className={`grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center w-full p-6 mt-8 transition-all duration-500 ease-in-out ${selectedLocation ? 'bg-cover bg-center' : ''}`}
            style={{
              backgroundImage: selectedLocation ? `url('https://blog.withings.com//app/uploads/2019/02/overhead-view-of-a-stethoscope-and-a-heart_t20_xRP1dX.jpg')` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoctor(doc)}
                className="bg-white p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <h3 className="text-xl font-semibold text-gray-800">{doc.name}</h3>
                <p className="text-gray-600">{doc.specialty}</p>
                <p className="text-sm text-gray-400 mt-1">{doc.location}</p>

                {/* Availability Indicator */}
                <div className="flex items-center mt-2">
                  <div
                    className={`w-3 h-3 rounded-full mr-2 ${getAvailabilityColor(doc.availability) === 'green' ? 'bg-green-500' : 'bg-yellow-500'}`}
                  ></div>
                  <span className="text-sm text-gray-600">
                    {doc.availability === 'available' ? 'Available Now' : 'Available In Some Time'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Doctor Details Modal */}
      <AnimatePresence>
        {selectedDoctor && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedDoctor(null)}
              >
                ✖
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedDoctor.name}</h2>
              <p className="text-gray-600 mb-1">{selectedDoctor.specialty}</p>
              <p className="text-gray-400 mb-4">{selectedDoctor.hospital}</p>
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
                onClick={() =>
                  navigate("/appointment", { state: { type: "schedule", doctorName: selectedDoctor.name } })
                }
              >
                Schedule My Appointment
              </button>

              <button
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
                onClick={() =>
                  navigate("/appointment", { state: { type: "immediate", doctorName: selectedDoctor.name } })
                }
              >
                Immediate Booking
              </button>
            </div>

              {/* Availability */}
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 rounded-full mr-2 ${getAvailabilityColor(selectedDoctor.availability)}`}
                ></div>
                <span className="text-sm text-gray-600">
                  {selectedDoctor.availability === 'available' ? 'Available Now' : 'Available In Some Time'}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FindDoctor;
