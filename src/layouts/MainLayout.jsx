import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from "../components/Footer"

const MainLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            {/* header */}
            <header  className='w-11/12 mx-auto'>
                <nav>
                    <Navbar></Navbar>
                </nav>
            </header>

            {/* Main body */}
            <main  className='w-11/12 mx-auto grow'>
                <Outlet></Outlet>
            </main>

            {/* Footer */}
            <footer  className='w-11/12 mx-auto'>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MainLayout;