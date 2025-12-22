import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import { Link } from "react-router";
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
    }

    useEffect(() => {
        fetchUsers();
    }, [axiosSecure])

    const handleStatusChange = (email, status) => {
        axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
            .then(res => {
                console.log(res.data);
                fetchUsers();
            })
    }

    const onChangeRole = (_id, updateRole) => {
        const role = updateRole;
        const updateData = { role };
        axiosInstance.patch(`/users/role/${_id}`, updateData)
            .then(res => {
                console.log(res.data);
                fetchUsers();
            })
            .catch(err => {
                console.log(err);
            })
        alert(`clicking ${role} button`);
    }



    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Star size={24} /> All Users
            </h1>

            {/* Filter */}
            <div className="mb-4">
                <button onClick={() => setFilter("all")} className="mr-2 px-3 py-1 bg-gray-200 rounded">All</button>
                <button onClick={() => setFilter("active")} className="mr-2 px-3 py-1 bg-green-200 rounded">Active</button>
                <button onClick={() => setFilter("blocked")} className="px-3 py-1 bg-red-200 rounded">Blocked</button>
            </div>

            {/* Users Table */}
            <table className="w-full table-auto border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">Avatar</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Role</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Actions</th>
                        <th className="p-2 border">Reward</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.id} className="text-center border-t">
                            <td className="p-2 border">
                                <img src={user.mainPhotoUrl || "/default-avatar.png"} alt="avatar" className="w-10 h-10 rounded-full mx-auto" />
                            </td>
                            <td className="p-2 border">{user.email}</td>
                            <td className="p-2 border">{user.name}</td>
                            <td className="p-2 border">{user.role}</td>
                            <td className="p-2 border">{user.status}</td>
                            <td className="py-2 border flex justify-center items-center gap-4">

                                {
                                    user?.status == "active" ?
                                        <button onClick={() => handleStatusChange(user?.email, "blocked")} className="btn btn-error text-white" disabled={user?.role === "admin"}  >Blocked</button>
                                        :
                                        <button onClick={() => handleStatusChange(user?.email, "active")} className="btn btn-success">Active</button>
                                }

                            </td>

                            <td className="px-4 py-3">
                                <div className="flex justify-center gap-2">
                                    {
                                        user?.role !== "admin" && (
                                            user?.role === "donar" ?
                                                (<div className="flex justify-center gap-2">
                                                    <button
                                                        onClick={() => onChangeRole(user?._id, "volunteer")}
                                                        className="px-3 py-1 text-xs rounded bg-blue-600 text-white"
                                                    >Volunteer</button>
                                                    <button
                                                        onClick={() => onChangeRole(user?._id, "admin")}
                                                        className="px-3 py-1 text-xs rounded bg-red-600 text-white"
                                                    >Admin</button>
                                                </div>)
                                                :
                                                (
                                                    <button
                                                        onClick={() => onChangeRole(user?._id, "admin")}
                                                        className="px-3 py-1 text-xs rounded bg-red-600 text-white"
                                                    >Admin</button>
                                                )
                                        )
                                    }
                                </div>

                                {confirmId === user._id && (
                                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                                        <div className="bg-white p-6 rounded-xl w-80">
                                            <h3 className="font-semibold text-lg mb-3">
                                                Confirm Delete
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-4">
                                                Are you sure you want to delete this donation request?
                                            </p>
                                            <div className="flex justify-end gap-3">
                                                <button
                                                    onClick={() => setConfirmId(null)}
                                                    className="px-4 py-2 rounded bg-gray-200"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        handleDelete(user._id);
                                                        setConfirmId(null);
                                                    }}
                                                    className="px-4 py-2 rounded bg-red-600 text-white"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllUsers;