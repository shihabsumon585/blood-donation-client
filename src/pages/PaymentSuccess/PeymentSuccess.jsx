import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxios from '../../hooks/useAxios/useAxios';
import { CheckCircle, ArrowLeft } from 'lucide-react';

const PeymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");

    const axiosInstance = useAxios();

    useEffect(() => {
        axiosInstance.post(`/success-peyment?session_id=${sessionId}`)
            .then(res => {
                // console.log(res.data);
            })
    }, [axiosInstance, sessionId])

    return (
        <div>
            <title>Payment Success</title>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="bg-green-100 p-4 rounded-full">
                            <CheckCircle className="w-16 h-16 text-green-600" />
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Payment was successfull!
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Thank you for your donation. Your payment has been successfully completed and added to the database.
                    </p>

                    {sessionId && (
                        <div className="bg-gray-100 p-3 rounded-lg mb-8">
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Session ID</p>
                            <p className="text-sm font-mono text-gray-700 break-all">{sessionId}</p>
                        </div>
                    )}

                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-200"
                    >
                        <ArrowLeft size={18} />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PeymentSuccess;