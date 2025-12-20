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

    const handleViewDetails = () => {
        
    }

    return (
        <div>
            <h1 className='text-center my-8 text-3xl font-bold'>All Request</h1>
            <div className='grid grid-cols-3 gap-4 mb-6'>
                {
                    pendingRequest.map(request =>
                        <div key={request._id} className=" bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition duration-300 p-5">

                            {/* Header */}
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Recipient: <span className="text-red-600">{request?.recipientName}</span>
                                </h3>
                                <span className="px-3 py-1 text-sm font-bold text-red-600 bg-red-100 rounded-full">
                                    {request?.bloodGroup}
                                </span>
                            </div>

                            {/* Info */}
                            <div className="space-y-1 text-gray-600 text-sm">
                                <p>
                                    <span className="font-medium text-gray-700">Location:</span> {request?.address}
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">Date:</span> {request?.donationDate}
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">Time:</span> {request?.donationTime}
                                </p>
                            </div>

                            {/* Action */}
                            <div className="mt-4">
                                <Link onClick={handleViewDetails} to={`/view-details/${request?._id}`} className=" w-full btn bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition">
                                    View Details
                                </Link>
                            </div>

                        </div>

                    )
                }
            </div>
        </div>
    );
};

export default AllRequest;