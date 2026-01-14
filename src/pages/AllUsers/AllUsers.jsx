import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import useAxios from "../../hooks/useAxios/useAxios";

const AllUsers = ({ handleDelete }) => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("all");
    const [confirmId, setConfirmId] = useState(null);
    const axiosSecure = useAxiosSecure();
    const axiosInstance = useAxios();

    const filteredUsers = users.filter(user => {
        if (filter === "all") return true;
        return user.status === filter;
    });

    const fetchUsers = () => {
        axiosSecure.get("/users")
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchUsers();
    }, [axiosSecure]);

    const handleStatusChange = (email, status) => {
        axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
            .then(() => fetchUsers())
            .catch(err => console.log(err));
    };

    const onChangeRole = (_id, updateRole) => {
        axiosInstance.patch(`/users/role/${_id}`, { role: updateRole })
            .then(() => fetchUsers())
            .catch(err => console.log(err));
    };

    return (
        <div className="p-4">
            <title>All Users</title>
            <h1 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100">
                <Star size={24} /> All Users
            </h1>

            {/* Filter Buttons */}
            <div className="mb-4 flex flex-wrap gap-2">
                <button onClick={() => setFilter("all")} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600">All</button>
                <button onClick={() => setFilter("active")} className="px-3 py-1 bg-green-200 dark:bg-green-700 rounded hover:bg-green-300 dark:hover:bg-green-600">Active</button>
                <button onClick={() => setFilter("blocked")} className="px-3 py-1 bg-red-200 dark:bg-red-700 rounded hover:bg-red-300 dark:hover:bg-red-600">Blocked</button>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto rounded-lg shadow border border-gray-200 dark:border-gray-700">
                <table className="w-full table-auto border-collapse text-center">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        <tr>
                            <th className="p-2 border">Avatar</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Role</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Actions</th>
                            <th className="p-2 border">Reward</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredUsers.map(user => (
                            <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                                <td className="p-2 border">
                                    <img src={user?.photoURL} alt="avatar" className="w-10 h-10 rounded-full mx-auto" />
                                </td>
                                <td className="p-2 border">{user.email}</td>
                                <td className="p-2 border">{user.name}</td>
                                <td className="p-2 border">{user.role}</td>
                                <td className="p-2 border capitalize">{user.status}</td>
                                <td className="p-2 border flex justify-center items-center gap-2">
                                    {user?.status === "active" ? (
                                        <button onClick={() => handleStatusChange(user.email, "blocked")} className="btn btn-error text-white" disabled={user.role === "admin"}>Blocked</button>
                                    ) : (
                                        <button onClick={() => handleStatusChange(user.email, "active")} className="btn btn-success text-white">Active</button>
                                    )}
                                </td>
                                <td className="p-2 border">
                                    <div className="flex justify-center gap-2 flex-wrap">
                                        {user.role !== "admin" && (
                                            user.role === "donar" ? (
                                                <>
                                                    <button onClick={() => onChangeRole(user._id, "volunteer")} className="px-3 py-1 text-xs rounded bg-blue-600 text-white">Volunteer</button>
                                                    <button onClick={() => onChangeRole(user._id, "admin")} className="px-3 py-1 text-xs rounded bg-red-600 text-white">Admin</button>
                                                </>
                                            ) : (
                                                <button onClick={() => onChangeRole(user._id, "admin")} className="px-3 py-1 text-xs rounded bg-red-600 text-white">Admin</button>
                                            )
                                        )}
                                    </div>
                                </td>

                                {/* Delete Confirmation Modal */}
                                {confirmId === user._id && (
                                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-80">
                                            <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Confirm Delete</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Are you sure you want to delete this user?</p>
                                            <div className="flex justify-end gap-3">
                                                <button onClick={() => setConfirmId(null)} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700">Cancel</button>
                                                <button onClick={() => { handleDelete(user._id); setConfirmId(null); }} className="px-4 py-2 rounded bg-red-600 text-white">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
