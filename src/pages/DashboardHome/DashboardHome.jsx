import React, { useContext, useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios/useAxios';
import { AuthContext } from '../../provider/AuthProvider';
import WelcomeBanner from '../../components/WelcomeBanner';
import DashbordHomeMyRequest from '../../components/DashbordHomeMyRequest';
import Card3 from '../../components/Card3';

const DashboardHome = () => {

    const axiosInstance = useAxios();
    const { user } = useContext(AuthContext);
    const [loginUser, setLogiUser] = useState([]);
    const [role, setRole] = useState("");




    useEffect(() => {
        axiosInstance.get(`/users/${user?.email}`)
            .then(res => {
                setLogiUser(res.data);
                setRole(res.data.role)
            })
            .catch(err => {
                console.log(err);
            })
    }, [axiosInstance, user?.email])




    return (
        <div>
            <title>Dashboard</title>
            {/* Welcome Banner */}
            <WelcomeBanner></WelcomeBanner>

            {/* last 3 donation request */}
            {
                role === "donar" && (
                    <DashbordHomeMyRequest></DashbordHomeMyRequest>
                )
            }


            {
                (role === "admin" || role === "volunteer") && (
                    <Card3></Card3>
                )
            }





        </div>
    );
};

export default DashboardHome;