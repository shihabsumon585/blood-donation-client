import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import logoImg from "../assets/logo.png";
import { Moon, Sun, Menu, X } from "lucide-react";

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user, logOut, theme, setTheme } = useContext(AuthContext);

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/all-request", label: "All Request" },
        { to: "/search", label: "Search" },
        { to: "/about-us", label: "About" },
        { to: "/contact-us", label: "Contact" },
        { to: "/support", label: "Support" },
    ];

    if (user) {
        navLinks.push({ to: "/donate", label: "Donate" });
        navLinks.push({ to: "/privacy-policy", label: "Privacy" });
    }

    const links = navLinks.map((link) => (
        <li key={link.to}>
            <NavLink
                to={link.to}
                className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        isActive
                            ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-white/5"
                            : "text-slate-700 hover:text-red-600 dark:text-slate-200 dark:hover:text-red-300"
                    }`
                }
                onClick={() => setMobileOpen(false)}
            >
                {link.label}
            </NavLink>
        </li>
    ));

    return (
        <div className="sticky top-0 z-50 border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <Link to="/" className="flex items-center gap-3">
                        <img src={logoImg} alt="logo" className="h-12 w-12 rounded-full bg-white p-1 shadow-md" />
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">Blood Pulse</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Donate. Save. Repeat.</p>
                        </div>
                    </Link>
                </div>

                <div className="hidden lg:flex lg:items-center lg:gap-1">
                    <ul className="flex flex-wrap items-center gap-1">{links}</ul>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                        aria-label="Toggle theme"
                    >
                        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                    </button>

                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen((prev) => !prev)}
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-red-500 bg-red-50 text-red-600 shadow-sm transition hover:bg-red-100"
                                aria-label="User menu"
                            >
                                <img src={user?.photoURL || logoImg} alt="avatar" className="h-10 w-10 rounded-full object-cover" />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
                                    <Link
                                        to="/dashbord"
                                        className="block px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logOut();
                                            setDropdownOpen(false);
                                        }}
                                        className="w-full px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-red-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
                        >
                            Login
                        </Link>
                    )}

                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 lg:hidden"
                        onClick={() => setMobileOpen((prev) => !prev)}
                        aria-expanded={mobileOpen}
                        aria-label="Open mobile menu"
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {mobileOpen && (
                <div className="lg:hidden border-t border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950/95 px-4 py-4 shadow-sm">
                    <ul className="grid gap-2">{links}</ul>
                    <div className="mt-4 flex flex-col gap-3">
                        {user ? (
                            <>
                                <Link
                                    to="/dashbord"
                                    className="rounded-full bg-red-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-red-700"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => {
                                        logOut();
                                        setMobileOpen(false);
                                    }}
                                    className="rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="rounded-full bg-red-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-red-700"
                                onClick={() => setMobileOpen(false)}
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
