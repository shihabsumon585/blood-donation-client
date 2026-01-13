import React from "react";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Your message sent successfully!");
        e.target.reset();
    };
    
    const handleSupport = () => {
        toast.success("Sorry, there are no emergency support sessions at this time.");
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 transition-colors py-10">
            <title>Contact Us</title>
            <Toaster />

            {/* Section Header */}
            <div className="max-w-3xl mx-auto mb-12 border-l-4 border-red-600 dark:border-red-500 pl-6">
                <p className="text-sm font-semibold tracking-widest text-red-600 dark:text-red-400 uppercase mb-2">
                    Contact Us
                </p>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    Get in Touch Our Team
                </h2>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Have questions, feedback, or need urgent help finding blood donors?
                    We’re here to support you every step of the way.
                </p>
            </div>

            {/* Contact Info Section */}
            <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
                {[
                    {
                        title: "Phone Support",
                        desc: "Call us for urgent blood donation assistance.",
                        value: "+880 1634 567890",
                    },
                    {
                        title: "Email Us",
                        desc: "Send us your questions or suggestions.",
                        value: "support@blooddonation.org",
                    },
                    {
                        title: "Office Location",
                        desc: "Visit our office during working hours.",
                        value: "Dhaka, Bangladesh",
                    },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center"
                    >
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                            {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                            {item.desc}
                        </p>
                        <p className="font-medium text-red-600 dark:text-red-400">
                            {item.value}
                        </p>
                    </div>
                ))}
            </section>

            {/* Contact Form */}
            <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700"
                >
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                        Send Us a Message
                    </h2>

                    <div className="space-y-4">
                        <input
                            type="text"
                            required
                            placeholder="Your Name"
                            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600
              bg-transparent text-gray-800 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <input
                            type="email"
                            required
                            placeholder="Your Email"
                            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600
              bg-transparent text-gray-800 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <textarea
                            rows="4"
                            required
                            placeholder="Your Message"
                            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600
              bg-transparent text-gray-800 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-red-500"
                        ></textarea>

                        <button
                            type="submit"
                            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
                        >
                            Send Message
                        </button>
                    </div>
                </form>

                {/* Support Info */}
                <div className="flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                        Need Immediate Help?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        If you are facing a blood emergency, please contact us directly.
                        Our team works closely with donors to respond quickly.
                    </p>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                        <li>✔ 24/7 emergency assistance</li>
                        <li>✔ Verified donor network</li>
                        <li>✔ Fast response time</li>
                    </ul>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 text-center max-w-4xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                    Together We Can Save Lives
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Reach out, stay connected, and help us build a stronger lifesaving
                    community.
                </p>
                <button onClick={handleSupport} className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition">
                    Contact Support
                </button>
            </section>
        </div>
    );
};

export default Contact;
