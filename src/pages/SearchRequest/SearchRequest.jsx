import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios/useAxios';

const SearchRequest = () => {

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const axiosInstance = useAxios();

    const [filteringData, setFilteringData] = useState([]);

    useEffect(() => {
        axios.get("/districts.json")
            .then(res => {
                setDistricts(res.data)
            })

        axios.get("/upazilas.json")
            .then(res => {
                setUpazilas(res.data)
            })
    }, [])

    const handleSearch = (e) => {
        e.preventDefault();
        const bloodGroup = e.target.blood_group.value.trim();
        const district = e.target.district.value;
        const upazila = e.target.upazila.value;

        axiosInstance.get(`/search-requests?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`)
            .then(res => {
                setFilteringData(res.data)
            })
    }

    return (
        <div className='py-10 w-full mx-auto'>

            {/* Section Header */}
            <div className="max-w-3xl mx-auto mb-12 border-l-4 border-red-600 dark:border-red-500 pl-6">
                <p className="text-sm font-semibold tracking-widest text-red-600 dark:text-red-400 uppercase mb-2">
                    Search Donors
                </p>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    Find Blood Donors Near You
                </h2>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Search donors by blood group and location to quickly connect with
                    lifesavers when it matters the most.
                </p>
            </div>

            <title>Search</title>

            <div>
                <form onSubmit={handleSearch} className='flex justify-baseline items-center mt-8 gap-4'>

                    {/* Blood Group */}
                    <select
                        name='blood_group'
                        className="select bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
                    >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>

                    {/* District */}
                    <select
                        name='district'
                        className="select bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
                    >
                        <option value="">Select your District</option>
                        {
                            districts.map(district =>
                                <option key={district.id} value={district.name}>
                                    {district.name}
                                </option>
                            )
                        }
                    </select>

                    {/* Upazila */}
                    <select
                        name='upazila'
                        className="select bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
                    >
                        <option value="">Select your Upazila</option>
                        {
                            upazilas.map(upazila =>
                                <option key={upazila.id} value={upazila.name}>
                                    {upazila.name}
                                </option>
                            )
                        }
                    </select>

                    {/* Search Button */}
                    <button
                        type='submit'
                        className="btn btn-primary dark:bg-red-600 dark:hover:bg-red-700 dark:border-none"
                    >
                        Search
                    </button>
                </form>

                <div className="mt-8">
                    {filteringData.length === 0 ? (
                        <p className="text-center text-gray-500 dark:text-gray-400 font-medium animate-pulse mt-30 text-4xl">
                            Search Your Blood
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteringData.map((donor) => (
                                <div
                                    key={donor._id}
                                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-5 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    <h3 className="font-bold text-xl text-red-600 mb-2">{donor.name}</h3>
                                    <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">Blood Group:</span> {donor.bloodGroup}</p>
                                    <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">District:</span> {donor.district}</p>
                                    <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">Upazila:</span> {donor.upazila}</p>
                                    <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">Contact:</span> {donor.requesterEmail}</p>
                                    <button className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
                                        Contact Now
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchRequest;
