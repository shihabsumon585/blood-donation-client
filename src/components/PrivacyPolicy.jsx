import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 transition-colors min-h-screen px-4 py-10">
            <title>Privacy Policy</title>

            {/* Section Header */}
            <div className="max-w-3xl mx-auto mb-12 border-l-4 border-red-600 dark:border-red-500 pl-6 ">
                <p className="text-sm font-semibold tracking-widest text-red-600 dark:text-red-400 uppercase mb-2">
                    Privacy Policy
                </p>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    How We Protect Your Information
                </h2>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Your privacy matters to us. This policy explains how we collect, use,
                    and safeguard your personal information while you use our blood donation
                    platform.
                </p>
            </div>

            {/* Content Sections */}
            <div className="max-w-4xl mx-auto space-y-12 pb-16">

                {/* 1. Information Collection */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                        1. Information We Collect
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        We may collect personal information such as your name, email address,
                        contact number, blood group, and donation history. This helps us connect
                        donors with recipients efficiently.
                    </p>
                </div>

                {/* 2. How We Use Your Info */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                        2. How We Use Your Information
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Your information is used only to facilitate blood donations, notify
                        you about urgent requests, improve our platform, and ensure safety and
                        verification of donors and recipients.
                    </p>
                </div>

                {/* 3. Data Security */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                        3. Data Security
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        We implement strict security measures including encryption and secure
                        storage to protect your data from unauthorized access, disclosure,
                        alteration, or destruction.
                    </p>
                </div>

                {/* 4. Sharing Information */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                        4. Sharing Information
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        We do not sell or share your personal information with third parties
                        except to facilitate blood donation requests or when required by law.
                    </p>
                </div>

                {/* 5. Your Rights */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                        5. Your Rights
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        You have the right to access, update, or request deletion of your personal
                        information. You can also opt out of notifications or promotional emails
                        at any time.
                    </p>
                </div>

                {/* 6. Contact */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                        6. Contact Us
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        If you have any questions or concerns about our privacy practices, please
                        reach out to our support team at{" "}
                        <span className="text-red-600 dark:text-red-400">support@blooddonation.org</span>.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default PrivacyPolicy;
