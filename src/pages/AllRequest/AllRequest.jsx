import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios/useAxios';
import { Link } from 'react-router';

const AllRequest = () => {

    const axiosInstance = useAxios();
    const [pendingRequest, setPendingRequest] = useState([]);

    useEffect(() => {
        axiosInstance.get("requests/pending")
            .then(res => {
                setPendingRequest(res.data);
            })
    }, [axiosInstance])

    return (
        <div className="bg-gray-50 dark:bg-gray-900 transition-colors py-10">
            <title>All Request</title>

            {/* Section Header */}
            <div className="max-w-3xl mx-auto mb-12 border-l-4 border-red-600 dark:border-red-500 pl-6 ">
                <p className="text-sm font-semibold tracking-widest text-red-600 dark:text-red-400 uppercase mb-2">
                    Blood Requests
                </p>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    Urgent Blood Donation Requests
                </h2>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    View all active blood requests and help save lives by responding to
                    emergency and scheduled donation needs.
                </p>
            </div>

            {/* Cards */}
            <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12 px-4">

                {pendingRequest.map(request =>
                    <div
                        key={request._id}
                        className="
                        bg-white dark:bg-gray-800
                        border border-gray-200 dark:border-gray-700
                        rounded-xl
                        shadow-sm dark:shadow-none
                        hover:shadow-lg dark:hover:shadow-red-500/10
                        transition-all
                        p-5"
                    >

                        {/* Header */}
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                Recipient:{" "}
                                <span className="text-red-600 dark:text-red-400">
                                    {request?.recipientName}
                                </span>
                            </h3>

                            <span className="px-3 py-1 text-sm font-bold 
                                text-red-600 dark:text-red-400
                                bg-red-100 dark:bg-red-500/10
                                rounded-full">
                                {request?.bloodGroup}
                            </span>
                        </div>

                        {/* Info */}
                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            <p>
                                <span className="font-medium text-gray-700 dark:text-gray-300">
                                    Location:
                                </span>{" "}
                                {request?.address}
                            </p>
                            <p>
                                <span className="font-medium text-gray-700 dark:text-gray-300">
                                    Date:
                                </span>{" "}
                                {request?.donationDate}
                            </p>
                            <p>
                                <span className="font-medium text-gray-700 dark:text-gray-300">
                                    Time:
                                </span>{" "}
                                {request?.donationTime}
                            </p>
                        </div>

                        {/* Action */}
                        <div className="mt-4">
                            <Link
                                to={`/view-details/${request?._id}`}
                                className="
                                w-full inline-block text-center
                                bg-red-600 dark:bg-red-500
                                hover:bg-red-700 dark:hover:bg-red-600
                                text-white
                                py-2 rounded-lg
                                font-medium
                                transition"
                            >
                                View Details
                            </Link>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default AllRequest;
