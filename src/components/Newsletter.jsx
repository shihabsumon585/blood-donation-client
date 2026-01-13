import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Newsletter = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;

        toast.success("Subscribed successfully!");
        setEmail("");
    };

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
            <Toaster position="top-center" />

            {/* Section Header */}
            <div className="max-w-3xl mx-auto mb-12 border-l-4 border-red-600 dark:border-red-500 pl-6 text-center">
                <p className="text-sm font-semibold tracking-widest text-red-600 dark:text-red-400 uppercase mb-2">
                    Newsletter
                </p>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    Stay Updated with Blood Donation News
                </h2>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Subscribe to our newsletter and never miss updates on blood donation
                    campaigns, tips, and life-saving stories.
                </p>
            </div>

            {/* Subscription Form */}
            <form
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full sm:flex-1 p-3 rounded border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
                     placeholder-gray-400 dark:placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                />
                <button
                    type="submit"
                    className="px-6 py-3 rounded-full bg-red-600 text-white font-semibold 
                     hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 
                     transition"
                >
                    Subscribe
                </button>
            </form>
        </section>
    );
};

export default Newsletter;
