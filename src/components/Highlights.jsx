import React, { useState, useEffect } from "react";

const highlights = [
    { title: "Donors Registered", count: 1250 },
    { title: "Lives Saved", count: 3400 },
    { title: "Active Campaigns", count: 32 },
];

const Counter = ({ end }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 1500; // animation duration in ms
        const increment = end / (duration / 50);

        const counter = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(counter);
            } else {
                setCount(Math.floor(start));
            }
        }, 50);

        return () => clearInterval(counter);
    }, [end]);

    return <span className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400">{count}</span>;
};

const Highlights = () => {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">

            {/* Section Header */}
            <div className="max-w-3xl mx-auto mb-12 border-l-4 border-red-600 dark:border-red-500 pl-6">
                <p className="text-sm font-semibold tracking-widest text-red-600 dark:text-red-400 uppercase mb-2">
                    Highlights
                </p>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    Our Impact in Numbers
                </h2>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    See how our donors and campaigns have made a difference in the community.
                </p>
            </div>

            {/* Highlight Cards */}
            <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
                {highlights.map((item, index) => (
                    <div
                        key={index}
                        className="p-6 rounded-xl bg-white dark:bg-gray-800
                       border border-gray-100 dark:border-gray-700
                       shadow-sm dark:shadow-none
                       hover:shadow-lg dark:hover:shadow-red-500/10
                       transition-all"
                    >
                        <Counter end={item.count} />
                        <p className="mt-2 text-gray-800 dark:text-gray-100 font-medium">{item.title}</p>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default Highlights;
