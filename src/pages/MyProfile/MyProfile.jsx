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

    // Fetch districts and upazilas
    useEffect(() => {
        axios.get("/districts.json")
            .then(res => {
                setDistricts(res.data);
            })
            .catch(err => {
                console.log('Error loading districts:', err);
            });

        axios.get("/upazilas.json")
            .then(res => {
                setUpazilas(res.data);
            })
            .catch(err => {
                console.log('Error loading upazilas:', err);
            });
    }, []);

    // Fetch user profile from database
    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.email) return;
            
            setFetchingProfile(true);
            try {
                const res = await axiosInstance.get(`/users/${user.email}`);
                setProfile(res.data);
                
                // Set profile data to state
                setName(res.data.name || user.displayName || '');
                setEmail(res.data.email || user.email || '');
                setPhotoURL(res.data.photoURL || user.photoURL || '');
                setDistrict(res.data.district || '');
                setUpazila(res.data.upazila || '');
            } catch (error) {
                console.log('Error fetching profile:', error);
                // Fallback to user data from AuthContext
                setName(user.displayName || '');
                setEmail(user.email || '');
                setPhotoURL(user.photoURL || '');
            } finally {
                setFetchingProfile(false);
            }
        };

        fetchProfile();
    }, [user, axiosInstance]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Update Firebase Auth profile
            if (updateUserProfile) {
                await updateUserProfile(name, photoURL);
            }

            // Update profile in database
            const updateData = {
                email,
                name: name,
                photoURL: photoURL,
                district: district,
                upazila: upazila,
            };

            const res = await axiosInstance.patch(`/users/update-profile`, updateData);
            
            // Update profile state
            setProfile(res.data);
            
            toast('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            alert('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (fetchingProfile) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div>
            <title>My Profile</title>
            <Toaster></Toaster>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
                <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-12 w-full max-w-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
                        <button
                            onClick={handleEditToggle}
                            className="btn btn-primary btn-sm md:btn-md text-white px-6"
                        >
                            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                        </button>
                    </div>

                    <div className="flex flex-col items-center mb-10">
                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary shadow-lg mb-6">
                            <img
                                src={photoURL || 'https://via.placeholder.com/150'}
                                alt="User Profile"
                                className="w-full h-full object-cover"
                            />
                            {isEditing && (
                                <label htmlFor="photo-upload" className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-sm cursor-pointer hover:bg-opacity-70 transition-all duration-300">
                                    Change Photo
                                    <input
                                        id="photo-upload"
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
                                className="input input-bordered w-full max-w-xs mb-4 text-center"
                            />
                        )}
                    </div>

                    <form onSubmit={handleSave}>
                        <div className="grid grid-cols-1 gap-6">
                            {/* Name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-gray-700">Full Name</span>
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                ) : (
                                    <p className="text-lg font-medium text-gray-900 bg-gray-50 p-3 rounded-md border border-gray-200">
                                        {name || 'Not provided'}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-gray-700">Email Address</span>
                                </label>
                                <p className="text-lg font-medium text-gray-900 bg-gray-50 p-3 rounded-md border border-gray-200">
                                    {email || 'Not provided'}
                                </p>
                            </div>

                            {/* District */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-gray-700">District</span>
                                </label>
                                {isEditing ? (
                                    <select 
                                        name='district' 
                                        value={district}
                                        onChange={(e) => setDistrict(e.target.value)}
                                        className="select select-bordered w-full"
                                    >
                                        <option value="">Select your District</option>
                                        {districts.map(dist => (
                                            <option key={dist.id} value={dist.name}>
                                                {dist.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <p className="text-lg font-medium text-gray-900 bg-gray-50 p-3 rounded-md border border-gray-200">
                                        {district || 'Not provided'}
                                    </p>
                                )}
                            </div>

                            {/* Upazila */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-gray-700">Upazila</span>
                                </label>
                                {isEditing ? (
                                    <select 
                                        name='upazila' 
                                        value={upazila}
                                        onChange={(e) => setUpazila(e.target.value)}
                                        className="select select-bordered w-full"
                                    >
                                        <option value="">Select your Upazila</option>
                                        {upazilas.map(upaz => (
                                            <option key={upaz.id} value={upaz.name}>
                                                {upaz.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <p className="text-lg font-medium text-gray-900 bg-gray-50 p-3 rounded-md border border-gray-200">
                                        {upazila || 'Not provided'}
                                    </p>
                                )}
                            </div>
                        </div>

                        {isEditing && (
                            <div className="mt-8 text-center">
                                <button
                                    type="submit"
                                    className="btn btn-success text-white px-10"
                                    disabled={loading}
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