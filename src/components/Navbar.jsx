import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);

    const links = <>
        <li><NavLink>Item 1</NavLink></li>
        <li><NavLink>Item 1</NavLink></li>
        { user && <>
            <li><NavLink>Item 1</NavLink></li>
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
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className='w-11 border-2 border-green-600 rounded-full mr-4 '>
                        <img src={user?.photoURL} alt="" className='w-10 rounded-full' title={user?.displayName}/>
                    </div>
                    <div className='mr-4'>
                        <Link to={"/dashbord"} className="btn btn-outline">Dashabord</Link>
                    </div>
                    {
                        user?.email ? <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                        : <Link to={"/login"} className="btn btn-primary">Login</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;