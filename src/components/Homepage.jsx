// src/components/HomePage.jsx
import React from 'react';
import qualitiesImage from '../test2.jpg';
import demo2Image from '../demo2.jpg';

const Homepage = () => {
  return (
    <>
        {/* First Section - Image and Text */}
            <section className="h-[76vh] relative flex items-center justify-start">
              {/* Image Container with a slanted edge */}
              <div
                className="absolute left-0"
                style={{
                  width: '98.9vw',  // Set the width to 100% of the viewport width
                  height: '75vh', // Set the height to 50% of the viewport height
                  backgroundImage: `url(${qualitiesImage})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
              />
              
              {/* Text Container on the right */}
              <div className="absolute right-0 mr-[200px] max-w-[800px] px-4 py-2">
                <p className="text-10xl font-bold text-black leading-relaxed text-shadows">
                  Your healthcare companion, 
                  always connected.
                </p>
              </div>
            </section>
      
            {/* Second Section - About Us Section */}
            <section className="flex justify-center py-24 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
              <div className="max-w-[1200px] w-full px-4 text-center">
                <h2 className="text-5xl font-bold mb-8">About Us</h2>
                <p className="text-2xl mb-6">
                  We are committed to transforming the healthcare experience by making it easier, 
                  faster, and more accessible. Our mission is to provide seamless healthcare solutions
                  that connect patients to doctors, support services, and healthcare resources from the
                  comfort of their own homes.
                </p>
                <p className="text-2xl mb-6">
                  Our team is dedicated to improving healthcare outcomes by leveraging technology 
                  and data-driven insights. Whether it's finding a doctor, managing prescriptions, or 
                  seeking support, we're here to assist you in every step of your healthcare journey.
                </p>
              </div>
            </section>
      
            {/* Third Section - Four Squares with Gradient Borders and Hover Effects */}
            <section className="my-5 flex justify-center py-24"
              style={{
                backgroundImage: `url(${demo2Image})`,  // Set the background of the third section
                backgroundSize: 'cover',  // Ensure the image covers the entire section
                backgroundPosition: 'center',  // Center the image in the section
              }}
            >
              {/* Adjusted container width and spacing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 w-full max-w-[1400px]">
                {/* Square 1 */}
                <div className="group relative flex flex-col items-center justify-center bg-white text-black w-72 h-80 rounded-xl shadow-lg p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 hover:border-4 hover:border-blue-500">
                  <div className="bg-white p-4 rounded-full mb-4">
                    <div className="text-4xl text-black">🩺</div>
                  </div>
                  <h3 className="text-xl font-bold text-black group-hover:text-white text-center">24/7 Support</h3>
                  <p className="mt-2 text-center text-sm text-black group-hover:text-white">
                    Always available to assist with your healthcare needs. 
                    Quick and reliable support around the clock.
                  </p>
                </div>
      
                {/* Square 2 */}
                <div className="group relative flex flex-col items-center justify-center bg-white text-black w-72 h-80 rounded-xl shadow-lg p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 hover:border-4 hover:border-blue-500">
                  <div className="bg-white p-4 rounded-full mb-4">
                    <div className="text-4xl text-black">📍</div>
                  </div>
                  <h3 className="text-xl font-bold text-black group-hover:text-white text-center">Find Locations</h3>
                  <p className="mt-2 text-center text-sm text-black group-hover:text-white">
                    Find nearby healthcare facilities and services easily. 
                    Locations at your fingertips.
                  </p>
                </div>
      
                {/* Square 3 */}
                <div className="group relative flex flex-col items-center justify-center bg-white text-black w-72 h-80 rounded-xl shadow-lg p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 hover:border-4 hover:border-blue-500">
                  <div className="bg-white p-4 rounded-full mb-4">
                    <div className="text-4xl text-black">🩺</div>
                  </div>
                  <h3 className="text-xl font-bold text-black group-hover:text-white text-center">Find Doctors</h3>
                  <p className="mt-2 text-center text-sm text-black group-hover:text-white">
                    Search for doctors in your area with specific specialties. 
                    Get recommendations based on your needs.
                  </p>
                </div>
      
                {/* Square 4 */}
                <div className="group relative flex flex-col items-center justify-center bg-white text-black w-72 h-80 rounded-xl shadow-lg p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 hover:border-4 hover:border-blue-500">
                  <div className="bg-white p-4 rounded-full mb-4">
                    <div className="text-4xl text-black">💊</div>
                  </div>
                  <h3 className="text-xl font-bold text-black group-hover:text-white text-center">My Prescriptions</h3>
                  <p className="mt-2 text-center text-sm text-black group-hover:text-white">
                    Manage your prescriptions with ease. Track your medications 
                    and stay updated with refills and schedules.
                  </p>
                </div>
              </div>
            </section>
      
            {/* Fourth Section - Footer Section */}
            <footer className="bg-gray-900 text-white py-8">
              <div className="max-w-[1200px] mx-auto px-4 text-center">
                <div className="mb-6">
                  <h3 className="text-3xl font-bold">MedConnect</h3>
                  <p className="text-lg mt-2">Connecting you with better healthcare solutions</p>
                </div>
      
                <div className="flex justify-center mb-6">
                  {/* Social Media Icons */}
                  <a href="#" className="mx-4 text-xl hover:text-blue-400">
                    <span role="img" aria-label="Faceebok">Facebook</span> {/* Twitter Icon */}
                  </a>
                  <a href="#" className="mx-4 text-xl hover:text-blue-400">
                    <span role="img" aria-label="instagram">instagram</span> {/* Instagram Icon */}
                  </a>
                </div>
      
                <div className="text-sm text-gray-400">
                  <p>© 2025 MedConnect. All rights reserved.</p>
                  <div className="mt-2">
                    <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a> | 
                    <a href="#" className="text-gray-400 hover:text-white"> Terms of Service</a>
                  </div>
                </div>
              </div>
            </footer>
    </>
  );
};

export default Homepage;
