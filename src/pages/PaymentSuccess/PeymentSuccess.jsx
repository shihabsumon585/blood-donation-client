import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useAxios from '../../hooks/useAxios/useAxios';

const PeymentSuccess = () => {
    const [ searchParams ] = useSearchParams();
    const sessionId = searchParams.get("session_id");

    const axiosInstance = useAxios();

    useEffect(() => {
        axiosInstance.post(`/success-peyment?session_id=${sessionId}`)
        .then(res => {
            console.log(res.data);
        })
    }, [axiosInstance, sessionId])

    return (
        <div>
            
        </div>
    );
};

export default PeymentSuccess;