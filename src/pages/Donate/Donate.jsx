import React, { useContext, useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios/useAxios';
import { AuthContext } from '../../provider/AuthProvider';

const Donate = () => {
    const { user } = useContext(AuthContext);
    const axiosInstance = useAxios();

    const [payments, setPayments] = useState([]);
    console.log(payments);

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
        }
        axiosInstance.post("/create-payment-checkout", formData)
            .then(res => {
                window.location.href = res.data.url;
            })
    }

    useEffect(() => {
        axiosInstance.get("/payments")
            .then(res => {
                setPayments(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [axiosInstance])

    return (
        <div>

            {/* <form onSubmit={handleCheckout} className='flex justify-center items-center mt-10 gap-4'>
                <input name='donateAmount' type="text" placeholder='Type here' className='input' />
                <button className="btn btn-primary" type='submit'>Donate</button>
            </form> */}


            <div className="max-w-6xl mx-auto p-6">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">Support Our Cause</h2>
                    <p className="text-gray-500">Your contribution makes a real difference in the community.</p>
                </div>

                {/* Donation Form Card */}
                <div className="bg-base-200 p-8 rounded-2xl shadow-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-2xl font-semibold">Give Funding</h3>
                        <p className="text-sm opacity-70">Enter the amount you wish to contribute via Stripe.</p>
                    </div>
                    <form onSubmit={handleCheckout} className='flex w-full md:w-auto gap-2'>
                        <input
                            name='donateAmount'
                            type="text"
                            required
                            placeholder='Enter Amount ($)'
                            className='input input-bordered w-full md:w-48'
                        />
                        <button className="btn btn-primary px-8" type='submit text-white'>Donate Now</button>
                    </form>
                </div>

                {/* Funding Table Section */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
                    <div className="p-6 border-b bg-gray-50">
                        <h3 className="text-xl font-bold">Recent Contributions</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            {/* head */}
                            <thead className="bg-gray-100">
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
                                        <tr key={fund._id} className="hover:bg-gray-50 transition-colors">
                                            <th>{index + 1}</th>
                                            <td>
                                                <div className="font-bold">{fund.donarName}</div>
                                                <div className="text-xs opacity-50">{fund.donarEmail}</div>
                                            </td>
                                            <td>
                                                <span className="badge badge-success gap-1 font-semibold py-3 text-white">
                                                    ${fund.amount}
                                                </span>
                                            </td>
                                            <td>
                                                {new Date(fund.paidAt).toLocaleDateString()}
                                            </td>
                                            <td className="text-xs font-mono text-gray-400">
                                                {fund.transactionId}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-10 text-gray-500">
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