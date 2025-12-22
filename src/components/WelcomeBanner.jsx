import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';


const WelcomeBanner = () => {

    const {user} = useContext(AuthContext);

    
    const hours = new Date().getHours();
    const welcomeText = hours < 12 ? "Good Morning" : hours < 18 ? "Good Afternoon" : "Good Evening";

    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 shadow-lg mb-8">
            
            <div className="absolute top-[-20%] right-[-10%] h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute bottom-[-20%] left-[-5%] h-48 w-48 rounded-full bg-blue-400/20 blur-2xl"></div>

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                
                <div className="text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
                        {welcomeText}, <span className="text-blue-100">{user?.displayName || 'User'}!</span> 
                    </h1>
                    <p className="text-blue-100 text-lg max-w-md">
                        Welcome back to your dashboard. Here's what's happening with your projects and fundings today.
                    </p>

                    <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
                        <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-white text-sm border border-white/30">
                            📅 {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                        
                    </div>
                </div>

                
                <div className="hidden lg:block">
                    <div className="p-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 text-center">
                        <div className="avatar mb-2">
                            <div className="w-20 rounded-full ring ring-white/50 ring-offset-base-100 ring-offset-2">
                                <img src={user?.photoURL || "https://i.ibb.co/bF9P30j/user.png"} alt="User" />
                            </div>
                        </div>
                        <h3 className="text-white font-semibold">{user?.email}</h3>
                        <p className="text-blue-200 text-xs">Member ID: #{user?.uid?.slice(-6).toUpperCase()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeBanner;