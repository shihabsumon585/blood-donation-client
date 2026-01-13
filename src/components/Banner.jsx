import React from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 text-center 
                        bg-red-100 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-950 
                        transition-colors">

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 
                     text-gray-800 dark:text-gray-100">
        Blood Donation Application
      </h1>

      {/* Subtitle */}
      <p className="max-w-2xl mx-auto mb-10 text-gray-600 dark:text-gray-400">
        A single donation can save multiple lives. Join our community and help
        those in urgent need of blood.
      </p>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 flex-wrap">
        <button
          onClick={() => navigate("/register")}
          className="px-8 py-3 rounded-full font-semibold 
                     bg-red-600 text-white 
                     hover:bg-red-700 
                     dark:bg-red-500 dark:hover:bg-red-600
                     transition"
        >
          Join as a Donor
        </button>

        <button
          onClick={() => navigate("/search")}
          className="px-8 py-3 rounded-full font-semibold 
                     border border-red-600 text-red-600 
                     hover:bg-red-50 
                     dark:border-red-400 dark:text-red-400 
                     dark:hover:bg-red-500/10
                     transition"
        >
          Search Donors
        </button>
      </div>
    </section>
  );
};

export default Banner;
