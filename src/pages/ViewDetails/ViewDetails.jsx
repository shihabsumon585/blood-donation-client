import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxios from '../../hooks/useAxios/useAxios';
import { AuthContext } from '../../provider/AuthProvider';

const ViewDetails = () => {

    const { id } = useParams();
    const axiosInstance = useAxios();
    const { user } = useContext(AuthContext);
    const [donar, setDonar] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchData = useCallback(() => {
        axiosInstance.get(`/view-details/${id}`)
            .then(res => setDonar(res.data))
            .catch(err => console.log(err))
    })


    useEffect(() => {
        fetchData();
    }, [fetchData]);
    // console.log(donar);



    const handleStatusChange = (e) => {

        e.preventDefault();

        const email = user?.email;
        const name = user?.displayName;
        const status = "inprogress"

        const updateData = {email, name, status}

        axiosInstance.patch(`/update-status/${donar?._id}`, updateData)
            .then(res => {
                console.log(res.data);
                fetchData();
            })
            .catch(err => {
                console.log(err);
            })


        alert("clicked inprogress button...")

    }



    return (
        <div>
            <div className="max-w-4xl mx-auto p-6">

                {/* Page Title */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Blood Donation Request Details
                </h2>

                {/* Details Card */}
                <div className="bg-white border rounded-xl shadow-md p-6 space-y-4">

                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-red-600">
                            {donar.recipientName}
                        </h3>
                        <span className="px-4 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700">
                            {donar.status}
                        </span>
                    </div>

                    <p className="text-gray-700">
                        <span className="font-medium">Blood Group:</span> {donar.bloodGroup}
                    </p>

                    <p className="text-gray-700">
                        <span className="font-medium">Hospital:</span> {donar.hospitalName}
                    </p>

                    <p className="text-gray-700">
                        <span className="font-medium">Address:</span> {donar.address}, {donar.upazila}, {donar.district}
                    </p>

                    <p className="text-gray-700">
                        <span className="font-medium">Donation Date:</span> {donar.donationDate}
                    </p>

                    <p className="text-gray-700">
                        <span className="font-medium">Donation Time:</span> {donar.donationTime}
                    </p>

                    <p className="text-gray-700">
                        <span className="font-medium">Requester:</span> {donar.requesterName} ({donar.requesterEmail})
                    </p>

                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                        <p className="text-red-700 font-medium">
                            {donar.message}
                        </p>
                    </div>

                    {/* Donate Button */}
                    {donar.status === "pending" && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition"
                        >
                            Donate Blood
                        </button>
                    )}
                </div>

                {/* ================= MODAL ================= */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-200 bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">

                            <h3 className="text-xl font-bold text-gray-800 mb-4">
                                Confirm Donation
                            </h3>

                            <form className="space-y-4">

                                <div>
                                    <label className="block text-sm font-medium text-gray-600">
                                        Donor Name
                                    </label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={user?.displayName}
                                        className="input input-bordered w-full bg-gray-100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600">
                                        Donor Email
                                    </label>
                                    <input
                                        type="email"
                                        readOnly
                                        value={user?.email}
                                        className="input input-bordered w-full bg-gray-100"
                                    />
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="w-1/2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={handleStatusChange}
                                        type="submit"
                                        className="w-1/2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold"
                                    >
                                        Confirm
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default ViewDetails;