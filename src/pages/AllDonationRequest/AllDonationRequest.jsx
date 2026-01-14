import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import useAxios from '../../hooks/useAxios/useAxios';
import { AuthContext } from '../../provider/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';

const AllDonationRequest = () => {
    const axiosInstance = useAxios();
    const { role } = useContext(AuthContext);

    const [confirmId, setConfirmId] = useState(null);
    const [myRequests, setMyRequests] = useState([]);
    const [totalRequest, setTotalRequest] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const axiosSecure = useAxiosSecure();

    const fetchingData = useCallback(() => {
        axiosSecure.get(`/all-donation-request?page=${currentPage - 1}&size=${itemsPerPage}`)
            .then(res => {
                setMyRequests(res.data.request);
                setTotalRequest(res.data.totalRequest);
            })
            .catch(err => console.log(err));
    }, [axiosSecure, currentPage, itemsPerPage]);

    useEffect(() => {
        fetchingData();
    }, [fetchingData]);

    const numberOfPages = Math.ceil(totalRequest / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()].map(e => e + 1);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    const handleNext = () => {
        if (currentPage < pages.length) setCurrentPage(currentPage + 1);
    };

    const handleStatusChange = (_id, updateStatus) => {
        axiosInstance.patch(`/update-status/${_id}`, { status: updateStatus })
            .then(() => {
                fetchingData();
                toast.success("Status updated successfully!");
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (_id) => {
        axiosInstance.delete(`/requests-delete/${_id}`)
            .then(() => {
                fetchingData();
                toast.success("Deleted successfully!");
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="p-4">
            <Toaster />
            <title>All Donation Requests</title>

            <div className="overflow-x-auto rounded-2xl shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <table className="min-w-full border-collapse text-left text-sm text-gray-700 dark:text-gray-300">
                    <thead className="bg-gray-100 dark:bg-gray-800 font-semibold">
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
                            <tr key={d._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="px-4 py-3 font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                <td className="px-4 py-3 font-medium">{d.recipientName}</td>
                                <td className="px-4 py-3">{d.district}, {d.upazila}</td>
                                <td className="px-4 py-3">{d.donationDate}</td>
                                <td className="px-4 py-3">{d.donationTime}</td>
                                <td className="px-4 py-3 font-semibold text-red-600">{d.bloodGroup}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${d.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                                        d.status === "inprogress" ? "bg-blue-100 text-blue-700" :
                                            d.status === "done" ? "bg-green-100 text-green-700" :
                                                "bg-red-100 text-red-700"
                                        }`}>{d.status}</span>

                                    {d.status === "inprogress" && (
                                        <div className="mt-2 flex gap-2">
                                            <button
                                                onClick={() => handleStatusChange(d._id, "done")}
                                                className="px-2 py-1 text-xs rounded bg-green-600 text-white"
                                            >Done</button>
                                            <button
                                                onClick={() => handleStatusChange(d._id, "canceled")}
                                                className="px-2 py-1 text-xs rounded bg-red-600 text-white"
                                            >Cancel</button>
                                        </div>
                                    )}
                                </td>

                                <td className="px-4 py-3">
                                    {d.status === "inprogress" && d.donarEmail ? (
                                        <div className="text-xs">
                                            <p className="font-medium">{d?.donarName}</p>
                                            <p className="text-gray-500 dark:text-gray-400">{d?.donarEmail}</p>
                                        </div>
                                    ) : (
                                        <span className="text-gray-400">—</span>
                                    )}
                                </td>

                                <td className="px-4 py-3">
                                    <div className="flex justify-center gap-2 flex-wrap">
                                        <Link to={`/view-details/${d._id}`} className="px-3 py-1 text-xs rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">View</Link>
                                        {role !== "volunteer" && (
                                            <>
                                                <Link to={`/dashbord/edit-donation/${d._id}`} className="px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700">Edit</Link>
                                                <button onClick={() => setConfirmId(d._id)} className="px-3 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700">Delete</button>
                                            </>
                                        )}
                                    </div>

                                    {/* Delete Confirmation Modal */}
                                    {confirmId === d._id && (
                                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-80">
                                                <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Confirm Delete</h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Are you sure you want to delete this donation request?</p>
                                                <div className="flex justify-end gap-3">
                                                    <button onClick={() => setConfirmId(null)} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700">Cancel</button>
                                                    <button onClick={() => { handleDelete(d._id); setConfirmId(null); }} className="px-4 py-2 rounded bg-red-600 text-white">Delete</button>
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
                <div className='my-6 flex justify-center items-center gap-4 flex-wrap'>
                    <button onClick={handlePrev} className="btn">Prev</button>
                    {pages.map((page, index) => (
                        <button
                            key={index}
                            className={`btn ${page === currentPage ? "bg-[#435585] text-white" : ""} hover:underline hover:text-blue-500`}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    ))}
                    <button onClick={handleNext} className="btn">Next</button>
                </div>
            </div>
        </div>
    );
};

export default AllDonationRequest;
