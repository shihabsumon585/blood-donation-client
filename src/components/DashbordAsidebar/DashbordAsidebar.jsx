import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, FileText, Settings, LogOut, Home, Plus, Package, UserCircle, User2, UserX2, User2Icon, Users2, LayoutDashboardIcon, Heart } from "lucide-react";
import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const DashbordAsidebar = () =>  {

  const { role } = useContext(AuthContext);


  return (
    <aside className="h-screen w-64 bg-slate-900 text-white fixed left-0 top-0">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-slate-700">
        <h1 className="text-xl font-bold tracking-wide">{role == "admin" ? "Admin" : role == "volunteer" ? "Volunteer" : "Donar"} Panel</h1>
      </div>

      {/* Menu */}
      <nav className="mt-6 px-4 space-y-2">

        {/* main dashbord */}
        <NavLink
          to={"/dashbord"}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
              ? "bg-blue-600 text-white"
              : "text-slate-300 hover:bg-slate-800 hover:text-white border-b-0 border-white"
            }`
          }
        >
          <LayoutDashboardIcon size={20} />
          <span className="text-sm font-medium">Dashboard</span>
        </NavLink>

        {/* Profile */}
        <NavLink
          to={"/dashbord/profile"}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
              ? "bg-blue-600 text-white"
              : "text-slate-300 hover:bg-slate-800 hover:text-white border-b-0 border-white"
            }`
          }
        >
          <UserCircle size={20} />
          <span className="text-sm font-medium">My Profile</span>
        </NavLink>

        {/* My Donation Request page */}
        {
          role === "donar" && (
            <NavLink
              to={"/dashbord/my-donation-requests"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white border-b-0 border-white"
                }`
              }
            >
              <Heart size={20} />
              <span className="text-sm font-medium">My Donation Request</span>
            </NavLink>
          )
        }

        {/* All users */}
        {
          role == "admin" && (
            <NavLink
              to={"/dashbord/all-users"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white border-b-0 border-white"
                }`
              }
            >
              <Users size={20} />
              <span className="text-sm font-medium">All Users</span>
            </NavLink>
          )
        }

        {/* Add Requests */}
        {
          role == "donar" && (
            <NavLink
              to={"/dashbord/create-donation-request"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white border-b-0 border-white"
                }`
              }
            >
              <Plus size={20} />
              <span className="text-sm font-medium">Add Request</span>
            </NavLink>
          )
        }
      </nav>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 w-full px-4">
        <Link to={"/"} className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-green-600 hover:text-white transition-all">
          <Home size={20} />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
        <button className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-red-600 hover:text-white transition-all">
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
export default DashbordAsidebar;