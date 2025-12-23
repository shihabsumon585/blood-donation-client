import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxios from '../../hooks/useAxios/useAxios';
import axios from 'axios';
// import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';

const EditDonationRequest = () => {

    const navigate = useNavigate();
    const { id } = useParams()
    const axiosInstance = useAxios();
    const [data, setData] = useState([]);

    const { user } = useContext(AuthContext);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    // const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axios.get("/districts.json")
            .then(res => {
                setDistricts(res.data)
            })
            .catch(err => {
                // console.log(err);
            })

        axios.get("/upazilas.json")
            .then(res => {
                setUpazilas(res.data)
            })
            .catch(err => {
                // console.log(err);
            })
    }, [])

    const fetchingData = useCallback(() => {
        axiosInstance.get(`/view-details/${id}`)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                // console.log(err);
            })
    }, [axiosInstance, id])
    useEffect(() => {
        fetchingData();
    }, [fetchingData])

    // console.log(data);

    const handleUpdateData = (e) => {
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

        const updateData = {
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

        axiosInstance.patch(`/edit-donation/${id}`, updateData)
            .then(res => {
                // console.log(res.data);
                fetchingData();
                alert("Update your blood request!")
                navigate("/dashbord");
            })
            .catch(err => {
                // console.log(err);
            })
    }

    return (
        <div>
            <title>Edit Request</title>
            <div className='mt-2 mx-auto flex justify-center'>
                <div className="min-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Update Request
                    </h2>

                    <form onSubmit={handleUpdateData} className="space-y-4">

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
                                defaultValue={data?.recipientName}
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
                                defaultValue={data?.hospitalName}
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
                                defaultValue={data?.address}
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
                                defaultValue={data?.donationDate}
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
                                defaultValue={data?.donationTime}
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
                                defaultValue={data?.message}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn btn-error w-full text-white"
                        >
                            Update Request
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditDonationRequest;