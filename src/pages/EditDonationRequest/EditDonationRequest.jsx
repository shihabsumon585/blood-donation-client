import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxios from '../../hooks/useAxios/useAxios';

const EditDonationRequest = () => {
    const { id } = useParams()
    const axiosInstance = useAxios();
    const [data, setData] = useState([]);

    const fetchingData = useCallback(() => {
        axiosInstance.get(`/view-details/${id}`)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    })
    useEffect(() => {
        fetchingData();
    }, [fetchingData])

    const handleUpdateData = (e) => {
        e.preventDefault();

        

        const updateData = {

        }

        axiosInstance.patch(`/edit-donation/${id}`, updateData)
        .then(res => {
            console.log(res.data);
            fetchingData();
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
            <h1>Edit donation request page.. id: {id}</h1>
        </div>
    );
};

export default EditDonationRequest;