import React from "react";
import toast, { Toaster } from "react-hot-toast";

const ContactUs = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Your submission was successful!");
        e.target.reset();
    };

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
            <Toaster position="top-center" />

            {/* Section Header */}
            <div className="max-w-3xl mx-auto mb-12 border-l-4 border-red-600 dark:border-red-500 pl-6">
                <p className="text-sm font-semibold tracking-widest text-red-600 dark:text-red-400 uppercase mb-2">
                    Contact
                </p>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    Get in Touch With Us
                </h2>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Have a question, emergency request, or want to become a donor?
                    Reach out to us anytime—we’re here to help save lives.
                </p>
            </div>


            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 px-4">

                {/* Contact Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white dark:bg-gray-800 
                     p-8 rounded-xl shadow-sm 
                     border border-gray-100 dark:border-gray-700
                     flex flex-col gap-4"
                >
                    <input
                        required
                        type="text"
                        placeholder="Your Name"
                        className="p-3 rounded 
                       border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-900
                       text-gray-800 dark:text-gray-100
                       placeholder-gray-400 dark:placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-red-500"
                    />

                    <input
                        required
                        type="email"
                        placeholder="Your Email"
                        className="p-3 rounded 
                       border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-900
                       text-gray-800 dark:text-gray-100
                       placeholder-gray-400 dark:placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-red-500"
                    />

                    <textarea
                        required
                        rows="4"
                        placeholder="Your Message"
                        className="p-3 rounded 
                       border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-900
                       text-gray-800 dark:text-gray-100
                       placeholder-gray-400 dark:placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-red-500"
                    />

                    <button
                        type="submit"
                        className="mt-2 px-6 py-3 rounded-full font-semibold
                       bg-red-600 text-white
                       hover:bg-red-700
                       dark:bg-red-500 dark:hover:bg-red-600
                       transition"
                    >
                        Send Message
                    </button>
                </form>

                {/* Contact Info */}
                <div className="flex flex-col justify-center text-center 
                        bg-red-50 dark:bg-gray-800
                        p-8 rounded-xl
                        border border-red-100 dark:border-gray-700">
                    <h3 className="text-xl font-semibold mb-2 
                         text-gray-800 dark:text-gray-100">
                        Contact Number
                    </h3>
                    <p className="text-lg font-medium text-red-600 dark:text-red-400">
                        +880 1634 567890
                    </p>

                    <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
                        Available 24/7 for emergency blood requests.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default ContactUs;
