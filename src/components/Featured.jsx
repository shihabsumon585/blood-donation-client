import React from "react";

const features = [
    {
        title: "Quick Donor Search",
        description: "Find donors instantly in your area."
    },
    {
        title: "Verified Donors",
        description: "All donors are verified for safety."
    },
    {
        title: "Successful Campaigns",
        description: "Join campaigns and save lives."
    }
];

const Featured = () => {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">

            {/* Section Header */}
            <div className="max-w-3xl mx-auto mb-12 border-l-4 border-red-600 dark:border-red-500 pl-6">
                <p className="text-sm font-semibold tracking-widest text-red-600 dark:text-red-400 uppercase mb-2">
                    Featured Initiative
                </p>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    Your Blood Can Give Someone a Tomorrow
                </h2>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Millions need blood every year. Your donation can be the difference between
                    life and death.
                </p>
            </div>

            {/* Feature Cards */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="p-6 rounded-xl bg-white dark:bg-gray-800 
                   border border-gray-100 dark:border-gray-700
                   shadow-sm dark:shadow-none
                   hover:shadow-lg dark:hover:shadow-red-500/10
                   transition-all"
                    >
                        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                            {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>

        </section>

    );
};

export default Featured;
