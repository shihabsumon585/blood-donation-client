import React from "react";
import toast, { Toaster } from "react-hot-toast";

const ContactUs = () => {
    const handleSubmit = (e) => {
        e.preventDefault();

        toast("Your submission was successful.")

        // alert("Your submission was successful.")

        e.target.reset();
    }
    return (
        <section className="py-16 bg-red-50">
            <Toaster></Toaster>
            <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
            <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-8">
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
                    <input required type="text" placeholder="Your Name" className="p-3 border rounded" />
                    <input required type="email" placeholder="Your Email" className="p-3 border rounded" />
                    <textarea required placeholder="Your Message" className="p-3 border rounded" rows="4" />
                    <button type="submit" className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition">
                        Send Message
                    </button>
                </form>
                <div className="flex-1 flex flex-col justify-center text-center">
                    <h3 className="text-xl font-semibold mb-2">Contact Number</h3>
                    <p className="text-lg">+880 1634 567890</p>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
