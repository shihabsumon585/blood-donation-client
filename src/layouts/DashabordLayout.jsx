import React from 'react';
import { Outlet } from 'react-router';
import DashbordAsidebar from '../components/DashbordAsidebar/DashbordAsidebar';

const DashabordLayout = () => {
    return (
        <div className='flex'>
            <DashbordAsidebar></DashbordAsidebar>
            <div className='ml-64 p-5 w-full'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashabordLayout;