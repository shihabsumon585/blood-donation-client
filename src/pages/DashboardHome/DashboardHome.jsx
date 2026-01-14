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
        if (!user?.email) return;

        axiosInstance.get(`/users/${user.email}`)
            .then(res => {
                setLogiUser(res.data);
                setRole(res.data.role);
            })
            .catch(err => {
                console.log(err);
            });
    }, [axiosInstance, user?.email]);

    console.log(role)

    return (
        <div
            className="
                min-h-screen
                bg-gray-50 dark:bg-gray-900
                text-gray-900 dark:text-gray-100
                transition-colors duration-300
                px-2 sm:px-4 md:px-6
                py-4
            "
        >
            <title>Dashboard</title>

            {/* Welcome Banner */}
            <WelcomeBanner />

            {/* Last 3 donation request (Donor) */}
            {role === "donar" && (
                <div className="mt-6">
                    <DashbordHomeMyRequest />
                </div>
            )}

            {/* Admin / Volunteer Cards */}
            {(role === "admin" || role === "volunteer") && (
                <div className="mt-6">
                    <Card3 />
                </div>
            )}
        </div>
    );
};

export default DashboardHome;
