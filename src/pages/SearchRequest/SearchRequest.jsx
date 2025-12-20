import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios/useAxios';

const SearchRequest = () => {

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const axiosInstance = useAxios();

    // after filtering data
    const [filteringData, setFilteringData] = useState([]); // এখান থেকে তুমি ফিল্টার করার পরের ডাটা পাবে। এখন তোমার কাজ হলো এখান থেকে যে ডাটা পাওয়া যাবে সেগুলো ব্যবহার করে নিচে সার্চ অপশনগুলোর নিচে তুমি ফলাফল/ফিল্টারিং ডাটা গুলো কার্ড আকারে দেখাবে। যদি কোনো ডাটা পাওয়া না যায় তাহলে তুমি দেখাবে আপনার তথ্যের সাথে কোনো তথ্য খুজে পাওয়া যায়নি। বুঝতে পেরেছ? এখন আমি তোমাকে আমার পুরো কোড দিবো। তুমি পুরোটা নিয়ে আমাকে শুধু যেখানে নতুন কোড যোগ করতে হবে সেই কোডটুকু দেবে আমি যোগ করে দিবো। আর হ্যা সার্চ করার আগে সেখানে দেখাবে যে “আপনার ব্লাড সার্চ করুন” এমন কিছু একটা দেখাবে। তোমার সুবিধার জন্য আমার রিকুয়ারমেন্টাও তোমাকে আমি দিয়ে দিচ্ছি।

    console.log(filteringData);

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

    const handleSearch = (e) => {
        e.preventDefault();
        const bloodGroup = e.target.blood_group.value.trim();
        const district = e.target.district.value;
        const upazila = e.target.upazila.value;

        console.log(bloodGroup, district, upazila);

        axiosInstance.get(`/search-requests?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`)
            .then(res => {
                setFilteringData(res.data)
            })
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSearch} className='flex justify-baseline items-center mt-8 gap-4'>
                    {/* <label className="label">Blood Group</label> */}
                    <select name='blood_group' defaultValue="Choose the Blood Group" className="select">
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
                    {/* Select a the district */}
                    {/* <label className="label">District</label> */}
                    <select name='district' defaultValue="Choose the District" className="select">
                        <option value="">Select your District</option>
                        {
                            districts.map(district => <option key={district.id} value={district.name}>{district.name}</option>)
                        }
                    </select>
                    {/* Select a the upazila */}
                    {/* <label className="label">Upazila</label> */}
                    <select name='upazila' defaultValue="Choose the Upazila" className="select">
                        <option value="">Select your Upazila</option>
                        {
                            upazilas.map(upazila => <option key={upazila.id} value={upazila.name}>{upazila.name}</option>)
                        }
                    </select>
                    <button onSubmit={""} type='submit' className="btn btn-primary">Search</button>
                </form>


                <div className="mt-8">
                    {filteringData.length === 0 ? (
                        <p className="text-center text-gray-500 font-medium animate-pulse mt-30 text-4xl">
                            Search Your Blood
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteringData.map((donor) => (
                                <div
                                    key={donor._id}
                                    className="bg-white border border-gray-200 rounded-xl shadow-md p-5 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    <h3 className="font-bold text-xl text-red-600 mb-2">{donor.name}</h3>
                                    <p className="text-gray-700"><span className="font-semibold">Blood Group:</span> {donor.bloodGroup}</p>
                                    <p className="text-gray-700"><span className="font-semibold">District:</span> {donor.district}</p>
                                    <p className="text-gray-700"><span className="font-semibold">Upazila:</span> {donor.upazila}</p>
                                    <p className="text-gray-700"><span className="font-semibold">Contact:</span> {donor.requesterEmail}</p>
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