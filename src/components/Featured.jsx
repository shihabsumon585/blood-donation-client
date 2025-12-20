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
        <section className="py-16 bg-gray-50">
            <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div key={index} className="p-6 bg-white rounded shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Featured;
