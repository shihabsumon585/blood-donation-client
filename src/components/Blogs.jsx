import React from "react";

const blogs = [
    {
        title: "How Blood Donations Save Lives",
        description: "Learn how your blood donation can make a life-saving impact in emergencies.",
        image: "https://i.ibb.co.com/W4PrtjJJ/download.jpg",
    },
    {
        title: "Tips for First-Time Donors",
        description: "Everything you need to know before donating blood for the first time.",
        image: "https://i.ibb.co.com/5gfNsd9r/download-1.jpg",
    },
    {
        title: "Organizing a Blood Donation Campaign",
        description: "Step-by-step guide to running a successful blood donation event in your community.",
        image: "https://i.ibb.co.com/NnsfC4S7/download-2.jpg",
    },
];

const Blogs = () => {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">

            {/* Section Header */}
            <div className="max-w-3xl mx-auto mb-12 border-l-4 border-red-600 dark:border-red-500 pl-6">
                <p className="text-sm font-semibold tracking-widest text-red-600 dark:text-red-400 uppercase mb-2">
                    Latest Blogs
                </p>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    Read Our Insights & Stories
                </h2>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Stay informed with articles, tips, and stories about blood donation and community impact.
                </p>
            </div>

            {/* Blog Cards */}
            <div className="max-w-6xl mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-8">
                {blogs.map((blog, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-none
                       border border-gray-100 dark:border-gray-700
                       hover:shadow-lg dark:hover:shadow-red-500/10
                       transition-all overflow-hidden"
                    >
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                                {blog.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {blog.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default Blogs;
