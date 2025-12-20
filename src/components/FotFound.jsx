import React from 'react';
import { Link } from 'react-router';
import notFoundImg from "../assets/not_found.png"

const NotFound = () => {
    return (
        <div className='flex justify-center items-center flex-col min-h-screen gap-6'>
            <img src={notFoundImg} className='w-xl' alt="" />
            <Link to={"/"} className='btn btn-primary flex items-center justify-center'>Back to Home</Link>
        </div>
    );
};

export default NotFound;