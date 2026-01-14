import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import axios from 'axios';
import useAxios from '../../hooks/useAxios/useAxios';
import toast, { Toaster } from 'react-hot-toast';

const MyProfile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const axiosInstance = useAxios();

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [profile, setProfile] = useState(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [district, setDistrict] = useState('');
    const [upazila, setUpazila] = useState('');
    const [photoURL, setPhotoURL] = useState('');

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fetchingProfile, setFetchingProfile] = useState(true);

    /* Load districts & upazilas */
    useEffect(() => {
        axios.get('/districts.json').then(res => setDistricts(res.data));
        axios.get('/upazilas.json').then(res => setUpazilas(res.data));
    }, []);

    /* Load profile */
    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.email) return;
            setFetchingProfile(true);
            try {
                const res = await axiosInstance.get(`/users/${user.email}`);
                setProfile(res.data);

                setName(res.data.name || user.displayName || '');
                setEmail(res.data.email || user.email || '');
                setPhotoURL(res.data.photoURL || user.photoURL || '');
                setDistrict(res.data.district || '');
                setUpazila(res.data.upazila || '');
            } catch {
                setName(user.displayName || '');
                setEmail(user.email || '');
                setPhotoURL(user.photoURL || '');
            } finally {
                setFetchingProfile(false);
            }
        };
        fetchProfile();
    }, [user, axiosInstance]);

    const handleEditToggle = () => setIsEditing(!isEditing);

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (updateUserProfile) {
                await updateUserProfile(name, photoURL);
            }

            const updateData = {
                email,
                name,
                photoURL,
                district,
                upazila,
            };

            const res = await axiosInstance.patch(`/users/update-profile`, updateData);
            setProfile(res.data);
            toast.success('Profile updated successfully!');
            setIsEditing(false);
        } catch {
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    if (fetchingProfile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div>
            <title>My Profile</title>
            <Toaster />

            <div className="min-h-screen flex items-center justify-center py-10 px-4 bg-gray-100 dark:bg-gray-900 transition-colors">
                <div className="
                    w-full max-w-xl
                    bg-white dark:bg-gray-800
                    border border-gray-200 dark:border-gray-700
                    rounded-2xl shadow-xl
                    p-8 md:p-10
                ">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
                            My Profile
                        </h2>
                        <button
                            onClick={handleEditToggle}
                            className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
                        >
                            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                        </button>
                    </div>

                    {/* Avatar */}
                    <div className="flex flex-col items-center mb-10">
                        <div className="
                            relative w-32 h-32 md:w-40 md:h-40
                            rounded-full overflow-hidden
                            border-4 border-blue-500
                            shadow-lg
                        ">
                            <img
                                src={photoURL || 'https://via.placeholder.com/150'}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />

                            {isEditing && (
                                <label className="
                                    absolute inset-0 bg-black/50
                                    flex items-center justify-center
                                    text-white text-sm cursor-pointer
                                    hover:bg-black/60 transition
                                ">
                                    Change Photo
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setPhotoURL(reader.result);
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                </label>
                            )}
                        </div>

                        {isEditing && (
                            <input
                                type="text"
                                placeholder="Or paste photo URL"
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                                className="
                                    mt-4 input input-bordered w-full max-w-xs
                                    text-center
                                    bg-white dark:bg-gray-700
                                    dark:text-gray-100
                                "
                            />
                        )}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSave} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
                                Full Name
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="input input-bordered w-full bg-white dark:bg-gray-700 dark:text-gray-100"
                                    required
                                />
                            ) : (
                                <p className="p-3 rounded-md bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 text-gray-900 dark:text-gray-100">
                                    {name || 'Not provided'}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
                                Email Address
                            </label>
                            <p className="p-3 rounded-md bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 text-gray-900 dark:text-gray-100">
                                {email || 'Not provided'}
                            </p>
                        </div>

                        {/* District */}
                        <div>
                            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
                                District
                            </label>
                            {isEditing ? (
                                <select
                                    value={district}
                                    onChange={(e) => setDistrict(e.target.value)}
                                    className="select select-bordered w-full bg-white dark:bg-gray-700 dark:text-gray-100"
                                >
                                    <option value="">Select your District</option>
                                    {districts.map(dist => (
                                        <option key={dist.id} value={dist.name}>
                                            {dist.name}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p className="p-3 rounded-md bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 text-gray-900 dark:text-gray-100">
                                    {district || 'Not provided'}
                                </p>
                            )}
                        </div>

                        {/* Upazila */}
                        <div>
                            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
                                Upazila
                            </label>
                            {isEditing ? (
                                <select
                                    value={upazila}
                                    onChange={(e) => setUpazila(e.target.value)}
                                    className="select select-bordered w-full bg-white dark:bg-gray-700 dark:text-gray-100"
                                >
                                    <option value="">Select your Upazila</option>
                                    {upazilas.map(upaz => (
                                        <option key={upaz.id} value={upaz.name}>
                                            {upaz.name}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p className="p-3 rounded-md bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 text-gray-900 dark:text-gray-100">
                                    {upazila || 'Not provided'}
                                </p>
                            )}
                        </div>

                        {isEditing && (
                            <div className="pt-6 text-center">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-10 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium transition"
                                >
                                    {loading ? (
                                        <span className="loading loading-spinner"></span>
                                    ) : (
                                        'Save Changes'
                                    )}
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
