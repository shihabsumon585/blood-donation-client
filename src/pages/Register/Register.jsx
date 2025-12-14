import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import { FaEye } from 'react-icons/fa';
import { AuthContext } from '../../provider/AuthProvider';
import axios from 'axios';



const Register = () => {
    const { createUser, setUser, updateUser, signInWithGoogle } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [show, setShow] = useState(true);
    const navigate = useNavigate();

    const handleCreateUser = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const role = e.target.role.value;
        const photo = e.target.photo;
        const file = photo.files[0];


        const res = await axios.post(`https://api.imgbb.com/1/upload?key=483144411544367618f3fe1757ac61d3`, { image: file },
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

        const mainPhotoUrl = res.data.data.display_url;

        const userData = {
            name,
            email,
            password,
            mainPhotoUrl,
            role
        }

        const hasLowercase = /[a-z]/;
        const hasUppercase = /[A-Z]/;
        if (!hasLowercase.test(password)) {
            return setError("Must have an Lowercase letter in the password")
        }
        if (!hasUppercase.test(password)) {
            return setError("Must have an Uppercase letter in the password")
        }
        if (password.length < 6) {
            return setError("Password must at least 6 character.")
        }
        createUser(email, password)
            .then((result) => {
                updateUser({ displayName: name, photoURL: mainPhotoUrl })
                setUser({ ...result.user, displayName: name, photoURL: mainPhotoUrl });
                navigate("/");
                setError("");
                toast("Register succesfully complete.")

                axios.post("http://localhost:5000/users", userData)
                    .then(res => console.log(res))
                    .catch(err => console.log(err))

            })
            .catch(err => {
                setError(err?.message);
                toast(err?.message);
            })
    }
    const handlLoginWithGoggle = () => {
        signInWithGoogle()
            .then((result) => {
                console.log(result.user);
                navigate("/");
                toast("Login succesfully complete.")
            }).catch((err) => {
                setError(err?.message);
                toast(err?.message);
            });
    }
    const handleShowPasswordToggling = () => {
        setShow(!show);
    }
    return (
        <div className="card-body bg-white flex justify-center items-center w-fit mx-auto mt-4 p-10 rounded-xl">
            <title>SignUp</title>
            <Toaster></Toaster>
            <h1 className='text-2xl font-bold mb-4'>SignUp your account</h1>
            <form onSubmit={handleCreateUser}>
                <fieldset className="fieldset *:w-80">
                    {/* email */}
                    <label className="label">Email</label>
                    <input name='email' type="email" className="input" placeholder="Enter your email address" required />
                    {/* Name */}
                    <label className="label">Your Name</label>
                    <input name='name' type="text" className="input" placeholder="Enter your name" />
                    {/* Photo */}
                    <label className="label">Upoload Your Image</label>
                    <input name='photo' type="file" className="input" />
                    {/* Select a the role */}
                    <label className="label">Role</label>
                    <select name='role' defaultValue="Choose the role" className="select">
                        <option disabled={true}>Choose the role</option>
                        <option value={"manager"}>Manager</option>
                        <option value={"buyer"}>buyer</option>
                    </select>
                    {/* password */}
                    <label className="label">Password</label>
                    <div className='relative'>
                        <input name='password' type={show ? "password" : "text"} className="input" placeholder="Enter your password" required />
                        <FaEye onClick={handleShowPasswordToggling} className='absolute top-4 right-4 w-5'></FaEye>
                    </div>
                    <div>
                        <p className='text-red-500 text-center font-semibold'>{error}</p>
                        {error && <p className='text-red-500 text-center font-semibold'>Try again...</p>}
                    </div>
                    <button type='submit' className="btn bg-accent text-base-100 mt-4">SignUp</button>
                </fieldset>
            </form>
            {/* Google */}
            <button onClick={handlLoginWithGoggle} className="btn bg-white text-black border-[#e5e5e5] w-full">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
            </button>
            <p>Already have An Account ? <Link className='text-secondary' to={"/login"}>Login</Link> here.</p>
        </div>
    );
};

export default Register;