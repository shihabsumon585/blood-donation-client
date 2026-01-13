import React from "react";
import { Link } from "react-router";

const About = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors py-10">
      <title>About Us</title>

      {/* Hero Section */}
      {/* Section Header */}
      <div className="max-w-3xl mx-auto mb-12 border-l-4 border-red-600 dark:border-red-500 pl-6 ">
        <p className="text-sm font-semibold tracking-widest text-red-600 dark:text-red-400 uppercase mb-2">
          About Our Mission
        </p>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Saving Lives Through Blood Donation
        </h2>

        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          We are a community-driven blood donation platform dedicated to
          connecting donors with those in urgent need. Our goal is to make
          blood donation faster, safer, and more accessible for everyone.
        </p>
      </div>



      {/* Who We Are */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Who We Are
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            We are a passionate team of developers, volunteers, and social
            activists who believe that no one should lose their life due to a
            lack of blood.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            By combining technology with humanity, we aim to bridge the gap
            between blood donors and patients in real-time.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
            What Makes Us Different
          </h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>✔ Fast donor search system</li>
            <li>✔ Verified donor profiles</li>
            <li>✔ Emergency-based blood requests</li>
            <li>✔ Community-first approach</li>
          </ul>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Our Mission
          </h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            To create a reliable and transparent blood donation ecosystem where
            donors and recipients can connect instantly during emergencies and
            planned donations.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Our Vision
          </h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            A future where blood shortages are eliminated and every patient has
            timely access to lifesaving blood.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">
          How Our Platform Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "Register",
              desc: "Create an account as a donor or recipient."
            },
            {
              step: "Search",
              desc: "Find blood donors based on group and location."
            },
            {
              step: "Donate",
              desc: "Connect and save lives through donation."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center"
            >
              <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-3">
                {item.step}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* Call to Action */}
      <section className="py-20 text-center max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Become a Lifesaver Today
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Whether you donate blood or help someone find a donor, your action
          can change lives forever.
        </p>
        <Link to={"/login"} className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition">
          Join Our Community
        </Link>
      </section>
    </div>
  );
};

export default About;
