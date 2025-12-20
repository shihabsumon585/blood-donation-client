import React from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const navigate = useNavigate();

    return (
        <section className="bg-red-100 py-20 text-center">
            <h1 className="text-4xl font-bold mb-6">
                Blood Donation Application
            </h1>
            <div className="space-x-4">
                <button
                    onClick={() => navigate("/register")}
                    className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                    Join as a donor
                </button>
                <button
                    onClick={() => navigate("/search")}
                    className="px-6 py-3 bg-white border border-red-500 text-red-500 rounded hover:bg-red-50 transition"
                >
                    Search Donors
                </button>
            </div>
        </section>
    );
};

export default Banner;
