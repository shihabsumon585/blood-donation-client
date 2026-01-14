import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import useAxiosSecure from '../hooks/useAxiosSecure/useAxiosSecure';

const DashbordHomeMyRequest = ({ onDelete, onStatusChange }) => {

    const [confirmId, setConfirmId] = useState(null);
    const [myRequests, setMyRequests] = useState([]);
    const [totalRequest, setTotalRequest] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure
            .get(`/my-request?page=${currentPage - 1}&size=${itemsPerPage}`)
            .then(res => {
                setMyRequests(res.data.request);
                setTotalRequest(res.data.totalRequest);
            });
    }, [axiosSecure, currentPage, itemsPerPage]);

    return (
        <div className="mt-8">
            {myRequests.length !== 0 ? (
                <div className="
                    overflow-x-auto rounded-2xl shadow
                    bg-white dark:bg-gray-800
                    border border-gray-200 dark:border-gray-700
                ">
                    <table className="min-w-full text-sm">
                        <thead className="
                            bg-gray-100 dark:bg-gray-700
                            text-gray-700 dark:text-gray-200
                        ">
                            <tr>
                                <th className="px-4 py-3 text-left">Serial</th>
                                <th className="px-4 py-3 text-left">Recipient</th>
                                <th className="px-4 py-3 text-left">Location</th>
                                <th className="px-4 py-3 text-left">Date</th>
                                <th className="px-4 py-3 text-left">Time</th>
                                <th className="px-4 py-3 text-left">Blood</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Donor Info</th>
                                <th className="px-4 py-3 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {myRequests.slice(0, 3).map((d, index) => (
                                <tr
                                    key={d._id}
                                    className="text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition"
                                >
                                    <td className="px-4 py-3 font-medium">
                                        {(currentPage * 10) + (index + 1) - 10}
                                    </td>
                                    <td className="px-4 py-3 font-medium">
                                        {d.recipientName}
                                    </td>
                                    <td className="px-4 py-3">
                                        {d.district}, {d.upazila}
                                    </td>
                                    <td className="px-4 py-3">{d.donationDate}</td>
                                    <td className="px-4 py-3">{d.donationTime}</td>
                                    <td className="px-4 py-3 font-semibold text-red-600">
                                        {d.bloodGroup}
                                    </td>

                                    {/* Status */}
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold
                                                ${d.status === "pending" && "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"}
                                                ${d.status === "inprogress" && "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"}
                                                ${d.status === "done" && "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"}
                                                ${d.status === "canceled" && "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"}
                                            `}
                                        >
                                            {d.status}
                                        </span>

                                        {d.status === "inprogress" && (
                                            <div className="mt-2 flex gap-2">
                                                <button
                                                    onClick={() => onStatusChange(d._id, "done")}
                                                    className="px-3 py-1 text-xs rounded bg-green-600 hover:bg-green-700 text-white"
                                                >
                                                    Done
                                                </button>
                                                <button
                                                    onClick={() => onStatusChange(d._id, "canceled")}
                                                    className="px-3 py-1 text-xs rounded bg-red-600 hover:bg-red-700 text-white"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                    </td>

                                    {/* Donor Info */}
                                    <td className="px-4 py-3">
                                        {d.status === "inprogress" && d.donor ? (
                                            <div className="text-xs">
                                                <p className="font-medium">{d.donor.name}</p>
                                                <p className="text-gray-500 dark:text-gray-400">
                                                    {d.donor.email}
                                                </p>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400">—</span>
                                        )}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-4 py-3">
                                        <div className="flex justify-center gap-2">
                                            <Link
                                                to={`/dashboard/donation/${d._id}`}
                                                className="px-3 py-1 text-xs rounded bg-gray-200 dark:bg-gray-600 dark:text-gray-100 hover:bg-gray-300"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                to={`/dashboard/edit-donation/${d._id}`}
                                                className="px-3 py-1 text-xs rounded bg-blue-600 hover:bg-blue-700 text-white"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => setConfirmId(d._id)}
                                                className="px-3 py-1 text-xs rounded bg-red-600 hover:bg-red-700 text-white"
                                            >
                                                Delete
                                            </button>
                                        </div>

                                        {/* Confirm Modal */}
                                        {confirmId === d._id && (
                                            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                                                <div className="
                                                    bg-white dark:bg-gray-800
                                                    p-6 rounded-xl w-80
                                                    border border-gray-200 dark:border-gray-700
                                                ">
                                                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-3">
                                                        Confirm Delete
                                                    </h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                                        Are you sure you want to delete this donation request?
                                                    </p>
                                                    <div className="flex justify-end gap-3">
                                                        <button
                                                            onClick={() => setConfirmId(null)}
                                                            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-600 dark:text-white"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                onDelete(d._id);
                                                                setConfirmId(null);
                                                            }}
                                                            className="px-4 py-2 rounded bg-red-600 text-white"
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

                    {/* Footer Button */}
                    <div className="p-4 flex justify-center">
                        <Link
                            to={"my-donation-requests"}
                            className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
                        >
                            View All Request
                        </Link>
                    </div>
                </div>
            ) : (
                <h1 className="text-center font-bold text-3xl mt-12 text-gray-700 dark:text-gray-300">
                    You don't have any donation request
                </h1>
            )}
        </div>
    );
};

export default DashbordHomeMyRequest;
