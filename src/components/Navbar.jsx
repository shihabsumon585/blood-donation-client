import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import logoImg from "../assets/logo.png";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user, logOut, theme, setTheme } = useContext(AuthContext);

    const links = <>
        {[
            { to: "/", label: "Home" },
            { to: "/all-request", label: "All Request" },
            { to: "/search", label: "Search" },
            { to: "/about-us", label: "About" },
            { to: "/contact-us", label: "Contact" },
            { to: "/support", label: "Support" },
        ].map(link => (
            <li key={link.to}>
                <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                        `px-3 py-2 font-medium transition
                         ${isActive
                            ? "text-red-600 border-b-2 border-red-600"
                            : "hover:text-red-500 dark:hover:text-red-400"}`
                    }
                >
                    {link.label}
                </NavLink>
            </li>
        ))}

        {user && (
            <>
                <li><NavLink 
                className={({ isActive }) =>
                    `px-3 py-2 font-medium transition
                         ${isActive
                        ? "text-red-600 border-b-2 border-red-600"
                        : "hover:text-red-500 dark:hover:text-red-400"}`
                } 
                to="/donate"
                >Donate</NavLink></li>
                <li><NavLink 
                className={({ isActive }) =>
                    `px-3 py-2 font-medium transition
                         ${isActive
                        ? "text-red-600 border-b-2 border-red-600"
                        : "hover:text-red-500 dark:hover:text-red-400"}`
                } 
                to="/privacy-policy"
                >Privacy & Policy</NavLink></li>
            </>
        )}
    </>;

    return (
        <div className="sticky top-0 z-50">
            <div className="navbar bg-base-100 dark:bg-gray-900 dark:text-white shadow-md px-6 lg:px-20">

                {/* Left */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            ☰
                        </div>
                        <ul className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-base-100 dark:bg-gray-800 shadow">
                            {links}
                        </ul>
                    </div>

                    <Link to="/" className="ml-3">
                        <img src={logoImg} alt="logo" className="w-14 rounded-full bg-white p-1" />
                    </Link>
                </div>

                {/* Center */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-1">
                        {links}
                    </ul>
                </div>

                {/* Right */}
                <div className="navbar-end gap-4">

                    {/* Theme Toggle */}
                    <button
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className="p-2 rounded-full 
                                   bg-gray-200 hover:bg-gray-300 
                                   dark:bg-gray-700 dark:hover:bg-gray-600
                                   transition "
                    >
                        {theme === "light"
                            ? <Moon size={20} className="text-gray-800" />
                            : <Sun size={20} className="text-yellow-400" />}
                    </button>

                    {/* Auth */}
                    {user ? (
                        <div className="relative">
                            <img
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                src={user?.photoURL}
                                alt="avatar"
                                className="w-11 h-11 rounded-full cursor-pointer border-2 border-red-500"
                            />

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 rounded-md 
                                                bg-white dark:bg-gray-800 shadow-lg">
                                    <Link
                                        to="/dashbord"
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={logOut}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="px-6 py-2 rounded-full font-semibold
                                       bg-gradient-to-r from-red-600 to-red-500
                                       text-white shadow-md
                                       hover:scale-105 transition"
                        >
                            Login
                        </Link>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Navbar;
