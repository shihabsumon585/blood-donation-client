import React from "react";

const services = [
    {
        title: "Emergency Blood Request",
        description:
            "Post urgent blood requests and notify nearby donors instantly.",
    },
    {
        title: "Donor Registration",
        description:
            "Register as a donor and help save lives when someone needs blood.",
    },
    {
        title: "Blood Donation Campaigns",
        description:
            "Participate in organized campaigns and support community health.",
    },
];

const Services = () => {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">

            {/* Section Header (Same as Featured) */}
            <div className="max-w-3xl mx-auto mb-12 border-l-4 border-red-600 dark:border-red-500 pl-6">
                <p className="text-sm font-semibold tracking-widest text-red-600 dark:text-red-400 uppercase mb-2">
                    Our Services
                </p>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    What We Do to Save Lives
                </h2>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    We provide essential services to connect donors with those in need,
                    ensuring fast and safe blood donation.
                </p>
            </div>

            {/* Service Cards */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="p-6 rounded-xl bg-white dark:bg-gray-800
                       border border-gray-100 dark:border-gray-700
                       shadow-sm dark:shadow-none
                       hover:shadow-lg dark:hover:shadow-red-500/10
                       transition-all"
                    >
                        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                            {service.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {service.description}
                        </p>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default Services;
