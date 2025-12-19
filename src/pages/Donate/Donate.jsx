import React, { useContext } from 'react';
import useAxios from '../../hooks/useAxios/useAxios';
import { AuthContext } from '../../provider/AuthProvider';

const Donate = () => {
    const { user } = useContext(AuthContext);
    const axiosInstance = useAxios();

    const handleCheckout = (e) => {
        e.preventDefault();

        const donateAmount = e.target.donateAmount.value;
        const donarEmail = user?.email;
        const donarName = user?.displayName;
        const formData = {
            donateAmount,
            donarEmail,
            donarName
        }
        axiosInstance.post("/create-payment-checkout", formData)
        .then(res => {
            console.log(res.data);
        })

    }
    return (
        <div>

            <form onSubmit={handleCheckout} className='flex justify-center items-center min-h-screen gap-4'>
                <input name='donateAmount' type="text" placeholder='Type here' className='input' />
                <button className="btn btn-primary" type='submit'>Donate</button>
            </form>
            
        </div>
    );
};

export default Donate;