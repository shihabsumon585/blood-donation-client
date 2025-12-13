import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import { FaEye } from 'react-icons/fa';
import { AuthContext } from '../../provider/AuthProvider';


const Login = () => {
    const { userLogin, setUser, signInWithGoogle } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [show, setShow] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const hasLowercase = /[a-z]/;
    const hasUppercase = /[A-Z]/;

    if (!hasLowercase.test(password)) {
        return setError("Must have a Lowercase letter in the password");
    }
    if (!hasUppercase.test(password)) {
        return setError("Must have an Uppercase letter in the password");
    }
    if (password.length < 6) {
        return setError("Password must be at least 6 characters.");
    }

    userLogin(email, password)
        .then((result) => {
            setUser(result.user);
            navigate(`${location.state ? location.state : "/"}`);

            setError("");

            toast.success("Login successfully complete");

            localStorage.removeItem("email");
        })
        .catch((err) => {
            setError(err?.message);

            toast.error(err?.message); 

            localStorage.removeItem("email");
        });
};
    const handlLoginWithGoggle = () => {
        signInWithGoogle()
            .then((result) => {
                console.log(result.user);
                toast("Login succesfully complete");
                navigate("/");
            }).catch((err) => {
                console.log(err);
                setError(err?.message)
                toast(err?.message);
            });
    }
    const handleOnchange = (e) => {
        const email = e.target.value;
        localStorage.setItem("email", email);
    }
    const handleShowPasswordToggling = () => {
        setShow(!show);
    }
    return (
        <div className="card-body bg-white flex justify-center items-center w-fit mx-auto mt-10 p-10 rounded-xl">
            <title>Login</title>
            <Toaster></Toaster>
            <h1 className='text-2xl font-bold mb-6'>Login your account</h1>
            <form onSubmit={handleLogIn}>
                <fieldset className="fieldset *:w-80">
                    {/* email */}
                    <label className="label">Email</label>
                    <input onChange={handleOnchange} name='email' type="email" className="input" placeholder="Enter your email address" required />
                    {/* password */}
                    <label className="label">Password</label>
                    <div className='relative'>
                        <input name='password' type={show ? "password" : "text"} className="input" placeholder="Enter your password" required />
                        <FaEye onClick={handleShowPasswordToggling} className='absolute top-4 right-4 w-5'></FaEye>
                    </div>

                    <div><Link to={"/forgot-password"} className="link link-hover">Forgot password?</Link></div>

                    <div>
                        <p className='text-red-500 text-center font-semibold'>{error}</p>
                        {error && <p className='text-red-500 text-center font-semibold'>Try again...</p>}
                    </div>

                    <button type='submit' className="btn bg-accent text-base-100 mt-4">Login</button>
                </fieldset>
            </form>

            {/* Google */}
            <button onClick={handlLoginWithGoggle} className="btn bg-white text-black border-[#e5e5e5] w-full">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
            </button>

            <p>Dont’t have an account ? <Link className='text-secondary' to={"/register"}>Register</Link> here</p>
        </div>
    );
};

export default Login;