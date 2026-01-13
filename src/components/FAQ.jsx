import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
    {
        question: "Who can donate blood?",
        answer:
            "Anyone between 18-65 years of age, healthy, and meeting the required weight criteria can donate blood.",
    },
    {
        question: "How often can I donate blood?",
        answer:
            "You can donate whole blood every 3 months, and platelets every 2 weeks, depending on your health condition.",
    },
    {
        question: "Is blood donation safe?",
        answer:
            "Yes! Blood donation is safe. All equipment is sterile and disposable, ensuring donor safety.",
    },
    {
        question: "How do I find a donor urgently?",
        answer:
            "Use our Quick Donor Search feature to find verified donors near your location instantly.",
    },
];

const FAQItem = ({ faq }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 text-left focus:outline-none"
            >
                <span className="font-semibold text-gray-800 dark:text-gray-100">
                    {faq.question}
                </span>
                {isOpen ? (
                    <FaChevronUp className="text-red-600 dark:text-red-400" />
                ) : (
                    <FaChevronDown className="text-red-600 dark:text-red-400" />
                )}
            </button>
            {isOpen && (
                <div className="p-4 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400">
                    {faq.answer}
                </div>
            )}
        </div>
    );
};

const FAQ = () => {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">

            {/* Section Header */}
            <div className="max-w-3xl mx-auto mb-12 border-l-4 border-red-600 dark:border-red-500 pl-6">
                <p className="text-sm font-semibold tracking-widest text-red-600 dark:text-red-400 uppercase mb-2">
                    FAQ
                </p>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    Frequently Asked Questions
                </h2>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Find answers to common questions about blood donation and using our platform.
                </p>
            </div>

            {/* FAQ Items */}
            <div className="max-w-4xl mx-auto flex flex-col gap-4">
                {faqs.map((faq, index) => (
                    <FAQItem key={index} faq={faq} />
                ))}
            </div>

        </section>
    );
};

export default FAQ;
