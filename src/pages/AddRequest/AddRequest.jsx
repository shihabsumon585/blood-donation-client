import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router';

const AddRequest = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axios.get("/districts.json")
            .then(res => setDistricts(res.data))
            .catch(err => console.log(err));

        axios.get("/upazilas.json")
            .then(res => setUpazilas(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        const form = e.target;
        const requestData = {
            requesterName: form.requesterName.value,
            requesterEmail: form.requesterEmail.value,
            recipientName: form.recipientName.value,
            district: form.district.value,
            upazila: form.upazila.value,
            hospitalName: form.hospitalName.value,
            address: form.address.value,
            bloodGroup: form.bloodGroup.value,
            donationDate: form.donationDate.value,
            donationTime: form.donationTime.value,
            message: form.message.value
        };

        try {
            await axiosSecure.post("/donar-requests", requestData);
            toast.success("Request submitted successfully!");
            form.reset();
            // navigate("/dashboard/create-donation-request"); // Uncomment if redirect needed
        } catch (err) {
            toast.error("Failed to submit request. Please try again.");
            console.log(err);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-start py-10 px-4 transition-colors">
            <Toaster />
            <title>Add Request</title>

            <div className="w-full max-w-3xl p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
                    Create Blood Donation Request
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Requester Name */}
                    <div>
                        <label className="label text-gray-700 dark:text-gray-200">Requester Name</label>
                        <input
                            name='requesterName'
                            type="text"
                            value={user?.displayName || ""}
                            readOnly
                            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-100 cursor-not-allowed"
                        />
                    </div>

                    {/* Requester Email */}
                    <div>
                        <label className="label text-gray-700 dark:text-gray-200">Requester Email</label>
                        <input
                            name='requesterEmail'
                            type="email"
                            value={user?.email || ""}
                            readOnly
                            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-100 cursor-not-allowed"
                        />
                    </div>

                    {/* Recipient Name */}
                    <div>
                        <label className="label text-gray-700 dark:text-gray-200">Recipient Name</label>
                        <input
                            type="text"
                            name="recipientName"
                            required
                            className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100"
                        />
                    </div>

                    {/* District */}
                    <div>
                        <label className="label text-gray-700 dark:text-gray-200">Recipient District</label>
                        <select
                            name='district'
                            required
                            className="select select-bordered w-full dark:bg-gray-700 dark:text-gray-100"
                        >
                            <option value="">Select your District</option>
                            {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                        </select>
                    </div>

                    {/* Upazila */}
                    <div>
                        <label className="label text-gray-700 dark:text-gray-200">Recipient Upazila</label>
                        <select
                            name='upazila'
                            required
                            className="select select-bordered w-full dark:bg-gray-700 dark:text-gray-100"
                        >
                            <option value="">Select your Upazila</option>
                            {upazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                        </select>
                    </div>

                    {/* Hospital Name */}
                    <div>
                        <label className="label text-gray-700 dark:text-gray-200">Hospital Name</label>
                        <input
                            type="text"
                            name="hospitalName"
                            required
                            placeholder="Dhaka Medical College Hospital"
                            className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100"
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="label text-gray-700 dark:text-gray-200">Full Address</label>
                        <input
                            type="text"
                            name="address"
                            required
                            placeholder="Zahir Raihan Rd, Dhaka"
                            className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100"
                        />
                    </div>

                    {/* Blood Group */}
                    <div>
                        <label className="label text-gray-700 dark:text-gray-200">Blood Group</label>
                        <select
                            name="bloodGroup"
                            required
                            className="select select-bordered w-full dark:bg-gray-700 dark:text-gray-100"
                        >
                            <option value="">Select Blood Group</option>
                            <option>A+</option>
                            <option>A-</option>
                            <option>B+</option>
                            <option>B-</option>
                            <option>AB+</option>
                            <option>AB-</option>
                            <option>O+</option>
                            <option>O-</option>
                        </select>
                    </div>

                    {/* Donation Date */}
                    <div>
                        <label className="label text-gray-700 dark:text-gray-200">Donation Date</label>
                        <input
                            type="date"
                            name="donationDate"
                            required
                            className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100"
                        />
                    </div>

                    {/* Donation Time */}
                    <div>
                        <label className="label text-gray-700 dark:text-gray-200">Donation Time</label>
                        <input
                            type="time"
                            name="donationTime"
                            required
                            className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100"
                        />
                    </div>

                    {/* Request Message */}
                    <div>
                        <label className="label text-gray-700 dark:text-gray-200">Request Message</label>
                        <textarea
                            name="message"
                            required
                            rows="4"
                            className="textarea textarea-bordered w-full dark:bg-gray-700 dark:text-gray-100"
                            placeholder="Explain why blood is needed..."
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn btn-error w-full text-white hover:bg-red-700 transition"
                    >
                        Request Blood
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddRequest;
