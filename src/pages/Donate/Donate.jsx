import React, { useContext, useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios/useAxios';
import { AuthContext } from '../../provider/AuthProvider';

const Donate = () => {
    const { user } = useContext(AuthContext);
    const axiosInstance = useAxios();

    const [payments, setPayments] = useState([]);

    const handleCheckout = (e) => {
        e.preventDefault();

        const donateAmount = e.target.donateAmount.value;
        const donarEmail = user?.email;
        const donarName = user?.displayName;

        const formData = {
            name: user?.displayName,
            donateAmount,
            donarEmail,
            donarName
        };

        axiosInstance.post("/create-payment-checkout", formData)
            .then(res => {
                window.location.href = res.data.url;
            });
    };

    useEffect(() => {
        axiosInstance.get("/payments")
            .then(res => {
                setPayments(res.data);
            });
    }, [axiosInstance]);

    return (
        <div>
            <title>Donation</title>

            <div className="max-w-6xl mx-auto py-10">

                {/* Section Header */}
                <div className="max-w-3xl mx-auto mb-12 border-l-4 border-red-600 dark:border-red-500 pl-6">
                    <p className="text-sm font-semibold tracking-widest text-red-600 dark:text-red-400 uppercase mb-2">
                        Donate Blood
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                        Be Someone’s Lifeline Today
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Your single blood donation can save multiple lives. Step forward,
                        register as a donor, and make a real difference today.
                    </p>
                </div>

                {/* Donation Form Card */}
                <div className="bg-base-200 dark:bg-gray-800 p-8 rounded-2xl shadow-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                            Give Funding
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Enter the amount you wish to contribute via Stripe.
                        </p>
                    </div>

                    <form onSubmit={handleCheckout} className='flex w-full md:w-auto gap-2'>
                        <input
                            name='donateAmount'
                            type="text"
                            required
                            placeholder='Enter Amount ($)'
                            className="input input-bordered w-full md:w-48 
                                bg-white dark:bg-gray-900 
                                text-gray-800 dark:text-gray-100 
                                border-gray-300 dark:border-gray-600"
                        />
                        <button
                            className="btn btn-primary px-8 dark:bg-red-600 dark:hover:bg-red-700 dark:border-none"
                            type='submit'
                        >
                            Donate Now
                        </button>
                    </form>
                </div>

                {/* Funding Table Section */}
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                            Recent Contributions
                        </h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                                <tr>
                                    <th className="py-4">#</th>
                                    <th>Donor Name</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Transaction ID</th>
                                </tr>
                            </thead>

                            <tbody>
                                {payments.length > 0 ? (
                                    payments.map((fund, index) => (
                                        <tr
                                            key={fund._id}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                                        >
                                            <th>{index + 1}</th>
                                            <td>
                                                <div className="font-bold">{fund.donarName}</div>
                                                <div className="text-xs opacity-60">{fund.donarEmail}</div>
                                            </td>
                                            <td>
                                                <span className="badge badge-success gap-1 font-semibold py-3 text-white">
                                                    ${fund.amount}
                                                </span>
                                            </td>
                                            <td>
                                                {new Date(fund.paidAt).toLocaleDateString()}
                                            </td>
                                            <td className="text-xs font-mono text-gray-400 dark:text-gray-500">
                                                {fund.transactionId}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-10 text-gray-500 dark:text-gray-400">
                                            No funding records found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Donate;
