import React, { useContext, useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios/useAxios';
import { AuthContext } from '../../provider/AuthProvider';

const ManageProduct = () => {
    const axiosInstance = useAxios();
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axiosInstance.get(`products/manager/${user?.email}`)
            .then(res => setProducts(res.data))
            .catch(err => {
                console.log(err);
            })
    }, [axiosInstance, user?.email])

    console.log(products);


    return (
        <div className='mx-auto '>
            <div>
                <h1 className='text-3xl text-center font-bold my-4'>Manage Product</h1>
                <div className="overflow-x-auto shadow-2xl">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Job</th>
                                <th>Favorite Color</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row */}
                            {
                                products.map(product => <tr>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={""}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">Hart Hagerty</div>
                                                <div className="text-sm opacity-50">United States</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        Zemlak, Daniel and Leannon
                                        <br />
                                        <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                    </td>
                                    <td>Purple</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">details</button>
                                    </th>
                                </tr>)
                            }
                        </tbody>
                        {/* foot */}
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageProduct;