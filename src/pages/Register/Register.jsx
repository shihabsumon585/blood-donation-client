import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import { FaEye } from 'react-icons/fa';
import { AuthContext } from '../../provider/AuthProvider';
import axios from 'axios';



const Register = () => {
    const { createUser, setUser, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [show, setShow] = useState(true);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    useEffect(() => {
        axios.get("/districts.json")
            .then(res => {
                setDistricts(res.data)
            })
            .catch(err => {
                // console.log(err);
            })

        axios.get("/upazilas.json")
            .then(res => {
                setUpazilas(res.data)
            })
            .catch(err => {
                // console.log(err);
            })
    }, [])

    const handleCreateUser = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirm_password = e.target.confirm_password.value;
        const blood_group = e.target.blood_group.value;
        const district = e.target.district.value;
        const upazila = e.target.upazila.value;
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
            blood_group,
            upazila,
            district

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

        if (password !== confirm_password) {
            return alert("Password is not matching!. Try again...");
        }
        // console.log(userData);

        createUser(email, password)
            .then((result) => {
                updateUser({ displayName: name, photoURL: mainPhotoUrl })
                setUser({ ...result.user, displayName: name, photoURL: mainPhotoUrl });
                navigate("/");
                setError("");
                toast("Register succesfully complete.")

                axios.post("https://blood-donation-iota-lake.vercel.app/users", userData)
                    .then(res => console.log(res))
                    .catch(err => console.log(err))

            })
            .catch(err => {
                setError(err?.message);
                toast(err?.message);
            })
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
                    {/* Select a the blood group */}
                    <label className="label">Blood Group</label>
                    <select name='blood_group' defaultValue="Choose the Blood Group" className="select">
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                    {/* Select a the district */}
                    <label className="label">District</label>
                    <select name='district' defaultValue="Choose the District" className="select">
                        <option value="">Select your District</option>
                        {
                            districts.map(district => <option key={district.id} value={district.name}>{district.name}</option>)
                        }
                    </select>
                    {/* Select a the upazila */}
                    <label className="label">Upazila</label>
                    <select name='upazila' defaultValue="Choose the Upazila" className="select">
                        <option value="">Select your Upazila</option>
                        {
                            upazilas.map(upazila => <option key={upazila.id} value={upazila.name}>{upazila.name}</option>)
                        }
                    </select>
                    {/* password */}
                    <label className="label">Password</label>
                    <div className='relative'>
                        <input name='password' type={show ? "password" : "text"} className="input" placeholder="Enter your password" required />
                        <FaEye onClick={handleShowPasswordToggling} className='absolute top-4 right-4 w-5'></FaEye>
                    </div>
                    {/* confirm password */}
                    <label className="label">Confirm Password</label>
                    <div className='relative'>
                        <input name='confirm_password' type={show ? "password" : "text"} className="input" placeholder="Enter your password" required />
                        <FaEye onClick={handleShowPasswordToggling} className='absolute top-4 right-4 w-5'></FaEye>
                    </div>
                    <div>
                        <p className='text-red-500 text-center font-semibold'>{error}</p>
                        {error && <p className='text-red-500 text-center font-semibold'>Try again...</p>}
                    </div>
                    <button type='submit' className="btn bg-accent text-base-100 mt-4">SignUp</button>
                </fieldset>
            </form>
            <p>Already have An Account ? <Link className='text-secondary' to={"/login"}>Login</Link> here.</p>
        </div>
    );
};

export default Register;