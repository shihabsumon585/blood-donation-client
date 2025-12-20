import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import "./Navbar.css"
import logoImg from "../assets/logo.png"
import { ChevronDown } from "lucide-react";

const Navbar = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext);

    const links = <>
        <li><NavLink to={"/"}>Home</NavLink></li>
        <li><NavLink to={"/all-request"}>All Request</NavLink></li>
        <li><NavLink to={"/search"}>Search</NavLink></li>
        {user && <>
            <li><NavLink to={"/donate"}>Donate</NavLink></li>
            {/* <li><NavLink to={""}></NavLink></li> */}
        </>}
    </>

    const handleLogout = () => {
        logOut();
    }

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Link to={"/"}> <img src={logoImg} alt="" className='w-16 ml-4' /> </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">



                    {user ? (
                        <>
                            {/* User Avatar & Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center space-x-2 focus:outline-none"
                                >
                                    <img
                                        src={user?.photoURL}
                                        alt="user avatar"
                                        className="w-12 h-12 object-cover mr-4  rounded-full"
                                    />
                                    {/* <ChevronDown className="w-4 h-4" /> */}
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-20">
                                        <Link
                                            to={"/dashbord"}
                                            className="block px-4 py-2 hover:bg-gray-200"
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={() => handleLogout()}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-200"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <a href="/login" className=" btn btn-success">
                            Login
                        </a>
                    )}


                    {/* {
                        user && <div className='w-11 border-2 border-green-600 rounded-full mr-4 '>
                            <img src={user?.photoURL} alt="" className='w-10 rounded-full' title={user?.displayName} />
                        </div>
                    }
                    <div className='mr-4'>
                        <Link to={"/dashbord"} className="btn btn-outline">Dashabord</Link>
                    </div>
                    {
                        user?.email ? <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                            : <Link to={"/login"} className="btn btn-primary">Login</Link>
                    } */}
                </div>
            </div>
        </div>
    );
};

export default Navbar;