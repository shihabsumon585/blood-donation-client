import React from "react";
import { FaHeartbeat, FaUserPlus, FaHandsHelping } from "react-icons/fa";

const stats = [
    { icon: <FaUserPlus className="text-red-600 dark:text-red-400 w-10 h-10 mx-auto mb-3" />, title: "Registered Donors", value: 1250 },
    { icon: <FaHeartbeat className="text-red-600 dark:text-red-400 w-10 h-10 mx-auto mb-3" />, title: "Lives Saved", value: 3400 },
    { icon: <FaHandsHelping className="text-red-600 dark:text-red-400 w-10 h-10 mx-auto mb-3" />, title: "Blood Campaigns", value: 32 },
];

const Statistics = () => {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">

            {/* Section Header */}
            <div className="max-w-3xl mx-auto mb-12 border-l-4 border-red-600 dark:border-red-500 pl-6">
                <p className="text-sm font-semibold tracking-widest text-red-600 dark:text-red-400 uppercase mb-2">
                    Statistics
                </p>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    Blood Donation By The Numbers
                </h2>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Check out the impact we’ve made together with our donors and campaigns.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="p-6 rounded-xl bg-white dark:bg-gray-800
                       border border-gray-100 dark:border-gray-700
                       shadow-sm dark:shadow-none
                       hover:shadow-lg dark:hover:shadow-red-500/10
                       transition-all"
                    >
                        {stat.icon}
                        <p className="text-3xl font-bold text-red-600 dark:text-red-400">{stat.value}</p>
                        <p className="mt-2 text-gray-800 dark:text-gray-100 font-medium">{stat.title}</p>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default Statistics;
