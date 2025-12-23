import React, { useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure/useAxiosSecure';
import useAxios from '../hooks/useAxios/useAxios';

const MyRequestTableRow = ({ d, index, fetchingData }) => {


    const axiosInstance = useAxios();

    const [confirmId, setConfirmId] = useState(null);

    const [totalRequest, setTotalRequest] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const axiosSecure = useAxiosSecure();



    const handleStatusChange = (_id, updateStatus) => {

        const status = updateStatus;

        const updateData = { status };

        axiosInstance.patch(`/update-status/${_id}`, updateData)
            .then(res => {
                // console.log(res.data);
                fetchingData();
            })
            .catch(err => {
                // console.log(err);
            })


        alert("clicked inprogress button...")

    }

    return (
        <tr key={d._id} className="text-sm">
            <td className="px-4 py-3 font-medium">{(currentPage * 10) + (index + 1) - 10}</td>
            <td className="px-4 py-3 font-medium">{d.recipientName}</td>
            <td className="px-4 py-3">
                {d.district}, {d.upazila}
            </td>
            <td className="px-4 py-3">{d.donationDate}</td>
            <td className="px-4 py-3">{d.donationTime}</td>
            <td className="px-4 py-3 font-semibold text-red-600">
                {d.bloodGroup}
            </td>
            <td className="px-4 py-3">
                <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${d.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : d.status === "inprogress"
                            ? "bg-blue-100 text-blue-700"
                            : d.status === "done"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                >
                    {d.status}
                </span>


                {d.status === "inprogress" && (
                    <div className="mt-2 flex gap-2">
                        <button
                            onClick={() => handleStatusChange(d._id, "done")}
                            className="px-2 py-1 text-xs rounded bg-green-600 text-white"
                        >
                            Done
                        </button>
                        <button
                            onClick={() => handleStatusChange(d._id, "canceled")}
                            className="px-2 py-1 text-xs rounded bg-red-600 text-white"
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
                        <p className="text-gray-500">{d?.donarEmail}</p>
                    </div>
                ) : (
                    <span className="text-gray-400">—</span>
                )}
                {

                }
            </td>
            <td className="px-4 py-3">
                <div className="flex justify-center gap-2">
                    <Link
                        to={`/dashboard/donation/${d._id}`}
                        className="px-3 py-1 text-xs rounded bg-gray-200"
                    >
                        View
                    </Link>
                    <Link
                        to={`/dashboard/edit-donation/${d._id}`}
                        className="px-3 py-1 text-xs rounded bg-blue-600 text-white"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={() => setConfirmId(d._id)}
                        className="px-3 py-1 text-xs rounded bg-red-600 text-white"
                    >
                        Delete
                    </button>
                </div>

                {confirmId === d._id && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-xl w-80">
                            <h3 className="font-semibold text-lg mb-3">
                                Confirm Delete
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Are you sure you want to delete this donation request?
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setConfirmId(null)}
                                    className="px-4 py-2 rounded bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        // onDelete(d._id);
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
    )

};

export default MyRequestTableRow;