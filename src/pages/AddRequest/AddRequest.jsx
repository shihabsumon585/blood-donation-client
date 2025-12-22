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
            .then(res => {
                setDistricts(res.data)
            })
            .catch(err => {
                console.log(err);
            })

        axios.get("/upazilas.json")
            .then(res => {
                setUpazilas(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const handleSubmit = async e => {
        e.preventDefault();

        const form = e.target;
        const message = form.message.value;
        const donationTime = form.donationTime.value;
        const donationDate = form.donationDate.value;
        const bloodGroup = form.bloodGroup.value;
        const address = form.address.value;
        const hospitalName = form.hospitalName.value;
        const district = form.district.value;
        const upazila = form.upazila.value;
        const recipientName = form.recipientName.value;
        const requesterEmail = form.requesterEmail.value;
        const requesterName = form.requesterName.value;

        const donarData = {
            message,
            donationTime,
            donationDate,
            bloodGroup,
            address,
            hospitalName,
            district,
            upazila,
            recipientName,
            requesterEmail,
            requesterName
        };

        axiosSecure.post("/donar-requests", donarData)
            .then(res => {
                toast("Accept your request successfully...");
                e.target.reset();
                // setTimeout(() => {
                //     navigate("dashbord/create-donation-request");
                // }, 1500);
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='mt-2 mx-auto flex justify-center'>
            <Toaster></Toaster>
            <title>Add Request</title>
            <div className="min-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Create Blood Donation Request
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Requester Name */}
                    <div>
                        <label className="label">Requester Name</label>
                        <input
                            name='requesterName'
                            type="text"
                            value={user?.displayName}
                            readOnly
                            className="input input-bordered w-full bg-gray-100"
                        />
                    </div>

                    {/* Requester Email */}
                    <div>
                        <label className="label">Requester Email</label>
                        <input
                            name='requesterEmail'
                            type="email"
                            value={user?.email || ""}
                            readOnly
                            className="input input-bordered w-full bg-gray-100"
                        />
                    </div>

                    {/* Recipient Name */}
                    <div>
                        <label className="label">Recipient Name</label>
                        <input
                            type="text"
                            name="recipientName"
                            required
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Select a the district */}
                    <label className="label">Recipient District</label>
                    <select name='district' defaultValue="Choose the District" className="select w-full">
                        <option value="">Select your District</option>
                        {
                            districts.map(district => <option key={district.id} value={district.name}>{district.name}</option>)
                        }
                    </select>

                    {/* Select a the upazila */}
                    <label className="label">Recipient Upazila</label>
                    <select name='upazila' defaultValue="Choose the Upazila" className="select w-full">
                        <option value="">Select your Upazila</option>
                        {
                            upazilas.map(upazila => <option key={upazila.id} value={upazila.name}>{upazila.name}</option>)
                        }
                    </select>

                    {/* Hospital Name */}
                    <div>
                        <label className="label">Hospital Name</label>
                        <input
                            type="text"
                            name="hospitalName"
                            required
                            placeholder="Dhaka Medical College Hospital"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Full Address */}
                    <div>
                        <label className="label">Full Address</label>
                        <input
                            type="text"
                            name="address"
                            required
                            placeholder="Zahir Raihan Rd, Dhaka"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Blood Group */}
                    <div>
                        <label className="label">Blood Group</label>
                        <select
                            name="bloodGroup"
                            required
                            className="select select-bordered w-full"
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
                        <label className="label">Donation Date</label>
                        <input
                            type="date"
                            name="donationDate"
                            required
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Donation Time */}
                    <div>
                        <label className="label">Donation Time</label>
                        <input
                            type="time"
                            name="donationTime"
                            required
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Request Message */}
                    <div>
                        <label className="label">Request Message</label>
                        <textarea
                            name="message"
                            required
                            rows="4"
                            className="textarea textarea-bordered w-full"
                            placeholder="Explain why blood is needed..."
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn btn-error w-full text-white"
                    >
                        Request Blood
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddRequest;