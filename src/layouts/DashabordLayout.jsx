import React from 'react';
import { Outlet } from 'react-router';
import DashbordAsidebar from '../components/DashbordAsidebar/DashbordAsidebar';

const DashabordLayout = () => {
    return (
        <div
            className="
                flex min-h-screen
                bg-gray-100 dark:bg-gray-900
                transition-colors duration-300
            "
        >
            {/* Sidebar */}
            <DashbordAsidebar />

            {/* Main Content */}
            <div
                className="
                    ml-64 w-full p-5
                    bg-gray-50 dark:bg-gray-900
                    text-gray-900 dark:text-gray-100
                    transition-colors duration-300
                "
            >
                <Outlet />
            </div>
        </div>
    );
};

export default DashabordLayout;
