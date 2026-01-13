import React from "react";

// Sample categories
const categories = [
    {
        title: "A+ Blood Group",
        description: "Find donors with A+ blood group quickly.",
    },
    {
        title: "B+ Blood Group",
        description: "Connect with B+ donors in your area.",
    },
    {
        title: "O- Blood Group",
        description: "Emergency O- donors for urgent needs.",
    },
    {
        title: "AB+ Blood Group",
        description: "Locate AB+ donors easily.",
    },
    {
        title: "Plasma Donors",
        description: "Search for plasma donors for patients in need.",
    },
    {
        title: "Platelet Donors",
        description: "Find platelet donors for critical cases.",
    },
];

const Categories = () => {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">

            {/* Section Header */}
            <div className="max-w-3xl mx-auto mb-12 border-l-4 border-red-600 dark:border-red-500 pl-6">
                <p className="text-sm font-semibold tracking-widest text-red-600 dark:text-red-400 uppercase mb-2">
                    Blood Categories
                </p>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    Find Donors by Blood Type
                </h2>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Browse donors by blood group, plasma, or platelet type and connect
                    with lifesavers in your community.
                </p>
            </div>

            {/* Category Cards */}
            <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="p-6 rounded-xl bg-white dark:bg-gray-800
                       border border-gray-100 dark:border-gray-700
                       shadow-sm dark:shadow-none
                       hover:shadow-lg dark:hover:shadow-red-500/10
                       transition-all"
                    >
                        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                            {category.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {category.description}
                        </p>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default Categories;
