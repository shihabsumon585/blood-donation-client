import React, { useCallback, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import useAxios from '../../hooks/useAxios/useAxios';

const MyRequest = () => {
    const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure();

    const [confirmId, setConfirmId] = useState(null);
    const [myRequests, setMyRequests] = useState([]);
    const [totalRequest, setTotalRequest] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchingData = useCallback(() => {
        axiosSecure.get(`/my-request?page=${currentPage - 1}&size=${itemsPerPage}`)
            .then(res => {
                setMyRequests(res.data.request);
                setTotalRequest(res.data.totalRequest);
            });
    }, [axiosSecure, currentPage, itemsPerPage]);

    useEffect(() => {
        fetchingData();
    }, [fetchingData]);

    const numberOfPages = Math.ceil(totalRequest / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()].map(e => e + 1);

    const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const handleNext = () => currentPage < pages.length && setCurrentPage(currentPage + 1);

    const handleStatusChange = (_id, updateStatus) => {
        axiosInstance.patch(`/update-status/${_id}`, { status: updateStatus })
            .then(() => fetchingData());
    };

    const handleDelete = (_id) => {
        axiosInstance.delete(`/requests-delete/${_id}`)
            .then(() => fetchingData());
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors p-4">
            <title>My Request</title>

            <div className="overflow-x-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow">
                <table className="min-w-full border-collapse">
                    <thead className="bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                        <tr>
                            <th className="px-4 py-3">Serial</th>
                            <th className="px-4 py-3">Recipient</th>
                            <th className="px-4 py-3">Location</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Time</th>
                            <th className="px-4 py-3">Blood</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Donor Info</th>
                            <th className="px-4 py-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {myRequests.map((d, index) => (
                            <tr key={d._id} className="text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <td className="px-4 py-3 font-medium">{(currentPage * 10) + (index + 1) - 10}</td>
                                <td className="px-4 py-3 font-medium">{d.recipientName}</td>
                                <td className="px-4 py-3">{d.district}, {d.upazila}</td>
                                <td className="px-4 py-3">{d.donationDate}</td>
                                <td className="px-4 py-3">{d.donationTime}</td>
                                <td className="px-4 py-3 font-semibold text-red-600">{d.bloodGroup}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-semibold ${d.status === "pending"
                                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-600 dark:text-yellow-100"
                                                : d.status === "inprogress"
                                                    ? "bg-blue-100 text-blue-700 dark:bg-blue-600 dark:text-blue-100"
                                                    : d.status === "done"
                                                        ? "bg-green-100 text-green-700 dark:bg-green-600 dark:text-green-100"
                                                        : "bg-red-100 text-red-700 dark:bg-red-600 dark:text-red-100"
                                            }`}
                                    >
                                        {d.status}
                                    </span>

                                    {d.status === "inprogress" && (
                                        <div className="mt-2 flex gap-2">
                                            <button
                                                onClick={() => handleStatusChange(d._id, "done")}
                                                className="px-2 py-1 text-xs rounded bg-green-600 text-white hover:bg-green-700 transition"
                                            >
                                                Done
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(d._id, "canceled")}
                                                className="px-2 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700 transition"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </td>

                                <td className="px-4 py-3">
                                    {d.status === "inprogress" && d.donarEmail ? (
                                        <div className="text-xs">
                                            <p className="font-medium">{d?.donarName}</p>
                                            <p className="text-gray-500 dark:text-gray-300">{d?.donarEmail}</p>
                                        </div>
                                    ) : (
                                        <span className="text-gray-400 dark:text-gray-500">—</span>
                                    )}
                                </td>

                                <td className="px-4 py-3">
                                    <div className="flex justify-center gap-2">
                                        <Link
                                            to={`/view-details/${d._id}`}
                                            className="px-3 py-1 text-xs rounded bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            to={`/dashbord/edit-donation/${d._id}`}
                                            className="px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => setConfirmId(d._id)}
                                            className="px-3 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700 transition"
                                        >
                                            Delete
                                        </button>
                                    </div>

                                    {confirmId === d._id && (
                                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-80 shadow-lg">
                                                <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">
                                                    Confirm Delete
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                                    Are you sure you want to delete this donation request?
                                                </p>
                                                <div className="flex justify-end gap-3">
                                                    <button
                                                        onClick={() => setConfirmId(null)}
                                                        className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            handleDelete(d._id);
                                                            setConfirmId(null);
                                                        }}
                                                        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="my-6 flex justify-center items-center gap-2 flex-wrap">
                    <button onClick={handlePrev} className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition">Prev</button>
                    {pages.map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded transition ${page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button onClick={handleNext} className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition">Next</button>
                </div>
            </div>
        </div>
    );
};

export default MyRequest;
