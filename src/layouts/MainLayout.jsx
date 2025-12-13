import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from "../components/Footer"

const MainLayout = () => {
    return (
        <div>
            {/* header */}
            <header  className='w-11/12 mx-auto'>
                <nav>
                    <Navbar></Navbar>
                </nav>
            </header>

            {/* Main body */}
            <main  className='w-11/12 mx-auto'>
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