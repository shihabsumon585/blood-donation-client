import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../../provider/AuthProvider';
import axios from 'axios';

const Register = () => {
    const { createUser, setUser, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [show, setShow] = useState(false);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    useEffect(() => {
        axios.get("/districts.json").then(res => setDistricts(res.data));
        axios.get("/upazilas.json").then(res => setUpazilas(res.data));
    }, []);

    const inputStyle = `
        w-full px-4 py-3 rounded-lg
        bg-gray-50 dark:bg-gray-700
        text-gray-900 dark:text-gray-100
        border border-gray-300 dark:border-gray-600
        placeholder-gray-400 dark:placeholder-gray-300
        focus:outline-none focus:ring-2 focus:ring-red-500
        transition
    `;

    const handleCreateUser = async (e) => {
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirm_password.value;
        const blood_group = form.blood_group.value;
        const district = form.district.value;
        const upazila = form.upazila.value;
        const file = form.photo.files[0];

        if (!/[a-z]/.test(password)) return setError("Password must contain a lowercase letter");
        if (!/[A-Z]/.test(password)) return setError("Password must contain an uppercase letter");
        if (password.length < 6) return setError("Password must be at least 6 characters");
        if (password !== confirmPassword) return setError("Password does not match");

        try {
            const imgRes = await axios.post(
                `https://api.imgbb.com/1/upload?key=483144411544367618f3fe1757ac61d3`,
                { image: file },
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            const photoURL = imgRes.data.data.display_url;

            const result = await createUser(email, password);
            await updateUser({ displayName: name, photoURL });
            setUser({ ...result.user, displayName: name, photoURL });

            await axios.post("http://localhost:5000/users", {
                name,
                email,
                blood_group,
                district,
                upazila,
                photoURL
            });

            toast.success("Registration successful");
            setError("");
            navigate("/");

        } catch (err) {
            setError("Registration failed. Try again.");
            toast.error("Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center 
                        bg-gray-100 dark:bg-gray-900 px-4 py-8">
            <Toaster />

            <div className="w-full max-w-lg bg-white dark:bg-gray-800 
                            rounded-2xl shadow-xl p-8">

                <h1 className="text-3xl font-bold text-center mb-6 
                               text-gray-800 dark:text-gray-100">
                    Create Your Account
                </h1>

                <form onSubmit={handleCreateUser} className="space-y-4">

                    <input name="email" type="email" placeholder="Email address" required className={inputStyle} />

                    <input name="name" type="text" placeholder="Full name" required className={inputStyle} />

                    <input name="photo" type="file" required
                        className={`file-input file-input-bordered w-full 
                                   dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100`} />

                    <select name="blood_group" required className={inputStyle}>
                        <option value="">Select Blood Group</option>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg =>
                            <option key={bg} value={bg}>{bg}</option>
                        )}
                    </select>

                    <select name="district" required className={inputStyle}>
                        <option value="">Select District</option>
                        {districts.map(d => (
                            <option key={d.id} value={d.name}>{d.name}</option>
                        ))}
                    </select>

                    <select name="upazila" required className={inputStyle}>
                        <option value="">Select Upazila</option>
                        {upazilas.map(u => (
                            <option key={u.id} value={u.name}>{u.name}</option>
                        ))}
                    </select>

                    <div className="relative">
                        <input
                            name="password"
                            type={show ? "text" : "password"}
                            placeholder="Password"
                            required
                            className={inputStyle}
                        />
                        <button
                            type="button"
                            onClick={() => setShow(!show)}
                            className="absolute right-4 top-4 text-gray-500 dark:text-gray-300"
                        >
                            {show ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <input
                        name="confirm_password"
                        type={show ? "text" : "password"}
                        placeholder="Confirm password"
                        required
                        className={inputStyle}
                    />

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
                        Sign Up
                    </button>
                </form>

                <p className="text-center mt-4 text-sm text-gray-700 dark:text-gray-300">
                    Already have an account?{" "}
                    <Link to="/login" className="text-red-500 font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
