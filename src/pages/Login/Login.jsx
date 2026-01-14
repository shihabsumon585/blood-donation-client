import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../provider/AuthProvider';

const Login = () => {
    const { userLogin, setUser, signInWithGoogle } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const handleLogIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!/[a-z]/.test(password)) {
            return setError("Password must contain a lowercase letter");
        }
        if (!/[A-Z]/.test(password)) {
            return setError("Password must contain an uppercase letter");
        }
        if (password.length < 6) {
            return setError("Password must be at least 6 characters");
        }

        userLogin(email, password)
            .then((result) => {
                setUser(result.user);
                setError("");
                toast.success("Login successful");
                navigate(location.state || "/");
            })
            .catch(() => {
                setError("Invalid email or password");
                toast.error("Login failed");
            });
    };

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(() => {
                toast.success("Logged in with Google");
                navigate("/");
            })
            .catch(() => {
                toast.error("Google login failed");
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center 
                        bg-gray-100 dark:bg-gray-900 px-4">
            <Toaster />

            <div className="w-full max-w-md bg-white dark:bg-gray-800 
                            rounded-2xl shadow-xl p-8 space-y-6">

                <h1 className="text-3xl font-bold text-center 
                               text-gray-800 dark:text-gray-100">
                    Login to Your Account
                </h1>

                {/* Google Login */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 
                               border border-gray-300 dark:border-gray-600
                               py-3 rounded-full font-semibold
                               bg-white dark:bg-gray-700
                               text-gray-800 dark:text-gray-100
                               hover:bg-gray-100 dark:hover:bg-gray-600
                               transition"
                >
                    <FaGoogle className="text-red-500" />
                    Continue with Google
                </button>

                <div className="flex items-center gap-2">
                    <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
                    <span className="text-sm text-gray-500 dark:text-gray-300">OR</span>
                    <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogIn} className="space-y-4">

                    {/* Email */}
                    <div>
                        <label className="block mb-1 text-sm font-medium 
                                           text-gray-700 dark:text-gray-200">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="w-full px-4 py-3 rounded-lg 
                                       border border-gray-300 dark:border-gray-600
                                       bg-gray-50 dark:bg-gray-700
                                       text-gray-800 dark:text-gray-100
                                       placeholder-gray-400 dark:placeholder-gray-300
                                       focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 text-sm font-medium 
                                           text-gray-700 dark:text-gray-200">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                name="password"
                                type={show ? "text" : "password"}
                                required
                                className="w-full px-4 py-3 rounded-lg 
                                           border border-gray-300 dark:border-gray-600
                                           bg-gray-50 dark:bg-gray-700
                                           text-gray-800 dark:text-gray-100
                                           placeholder-gray-400 dark:placeholder-gray-300
                                           focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShow(!show)}
                                className="absolute right-4 top-4 text-gray-500 dark:text-gray-300"
                            >
                                {show ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className="text-right">
                        <Link
                            to="/forgot-password"
                            className="text-sm text-red-500 hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    {error && (
                        <p className="text-red-500 text-center font-medium">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 rounded-full font-semibold
                                   bg-gradient-to-r from-red-600 to-red-500
                                   text-white hover:scale-105 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-sm text-gray-700 dark:text-gray-200">
                    Don’t have an account?{" "}
                    <Link
                        to="/register"
                        className="text-red-500 font-semibold hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
