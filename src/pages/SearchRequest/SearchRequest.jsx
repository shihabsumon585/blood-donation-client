import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios/useAxios';

const SearchRequest = () => {

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const axiosInstance = useAxios();

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
            console.log(res.data);
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
            </div>
        </div>
    );
};

export default SearchRequest;