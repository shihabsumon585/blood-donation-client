import React from "react";
import toast, { Toaster } from "react-hot-toast";

const Support = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Your support request has been submitted successfully!");
    e.target.reset();
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors py-10">
      <title>Support</title>
      <Toaster />

      {/* Section Header */}
      <div className="max-w-3xl mx-auto mb-12 border-l-4 border-red-600 dark:border-red-500 pl-6  ">
        <p className="text-sm font-semibold tracking-widest text-red-600 dark:text-red-400 uppercase mb-2">
          Support
        </p>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          How We Can Help You
        </h2>

        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Our support team is here to answer your questions, provide assistance
          with blood donation requests, and guide you through our platform to
          make lifesaving connections faster.
        </p>
      </div>

      {/* Support Methods Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        {[{
            title: "Call Support",
            desc: "Talk directly to our team for urgent support.",
            value: "+880 1634 567890",
          },
          {
            title: "Email Support",
            desc: "Send us your questions or feedback anytime.",
            value: "support@blooddonation.org",
          },
          {
            title: "Live Chat",
            desc: "Chat instantly with our support representatives.",
            value: "Available 24/7",
          }
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center"
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">{item.desc}</p>
            <p className="font-medium text-red-600 dark:text-red-400">{item.value}</p>
          </div>
        ))}
      </section>

      {/* Contact Form for Support */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Submit a Support Request
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
              Send Request
            </button>
          </div>
        </form>

        {/* Extra Info */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Need Immediate Assistance?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Our team is available 24/7 to respond to urgent blood donation
            queries or platform support. Don’t hesitate to reach out.
          </p>
          <ul className="space-y-3 text-gray-600 dark:text-gray-400">
            <li>✔ Emergency support for blood requests</li>
            <li>✔ Verified donor assistance</li>
            <li>✔ Fast response time guaranteed</li>
          </ul>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 text-center max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Together We Support Life
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Reach out to us anytime to get help, guidance, or join our lifesaving
          network.
        </p>
        <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition">
          Contact Support
        </button>
      </section>
    </div>
  );
};

export default Support;
