import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from "../components/Footer"

const MainLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            {/* header */}
            <header className='w-12/12 mx-auto sticky top-0 z-50'>
                <nav >
                    <Navbar></Navbar>
                </nav>
            </header>

            {/* Main body */}
            <main className='w-full mx-auto grow bg-slate-50 dark:bg-slate-950 transition-colors'>
                <div className='w-11/12 mx-auto py-6 lg:py-10'>
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
            <footer className='w-12/12 mx-auto'>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MainLayout;