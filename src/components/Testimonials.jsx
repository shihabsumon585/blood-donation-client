import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
    {
        name: "Md. Shihab Sumon",
        role: "Donor",
        message:
            "Donating blood through this platform was easy and satisfying. I feel proud to save lives!",
    },
    {
        name: "Ayesha Rahman",
        role: "Recipient",
        message:
            "Thanks to the quick donor search, I got the blood I needed in time. Truly life-saving!",
    },
    {
        name: "Habibul Islam",
        role: "Campaign Organizer",
        message:
            "This platform helps us organize campaigns efficiently and reach more donors. Amazing experience.",
    },
];

const Testimonials = () => {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">

            {/* Section Header */}
            <div className="max-w-3xl mx-auto mb-12 border-l-4 border-red-600 dark:border-red-500 pl-6">
                <p className="text-sm font-semibold tracking-widest text-red-600 dark:text-red-400 uppercase mb-2">
                    Testimonials
                </p>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    Hear From Our Donors & Recipients
                </h2>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Real stories from those who have given and received life through blood donation.
                </p>
            </div>

            {/* Testimonial Cards */}
            <div className="max-w-6xl mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        className="p-6 rounded-xl bg-white dark:bg-gray-800
                       border border-gray-100 dark:border-gray-700
                       shadow-sm dark:shadow-none
                       hover:shadow-lg dark:hover:shadow-red-500/10
                       transition-all flex flex-col justify-between"
                    >
                        <FaQuoteLeft className="text-red-600 dark:text-red-400 w-6 h-6 mb-4" />
                        <p className="text-gray-800 dark:text-gray-100 mb-4">{testimonial.message}</p>
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                {testimonial.name}
                            </h4>
                            <p className="text-sm text-red-600 dark:text-red-400">{testimonial.role}</p>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default Testimonials;
