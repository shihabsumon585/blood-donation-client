import { NavLink } from "react-router-dom";
import {
  Users,
  Home,
  Plus,
  UserCircle,
  LayoutDashboardIcon,
  Heart,
  HandHeart
} from "lucide-react";
import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const DashbordAsidebar = () => {
  const { role } = useContext(AuthContext);

  const navBase =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium";

  const navInactive =
    "text-slate-400 hover:text-white hover:bg-slate-800 dark:hover:bg-slate-700";

  const navActive =
    "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md";

  return (
    <aside
      className="
        h-screen w-64 fixed left-0 top-0
        bg-slate-900 dark:bg-slate-950
        text-white
        border-r border-slate-800
        flex flex-col
      "
    >
      {/* Logo / Role */}
      <div className="h-16 flex items-center justify-center border-b border-slate-800">
        <h1 className="text-lg font-semibold tracking-wide text-slate-100">
          {role === "admin"
            ? "Admin"
            : role === "volunteer"
              ? "Volunteer"
              : "Donar"}{" "}
          Panel
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 mt-6 px-3 space-y-1">
        {/* Dashboard */}
        <NavLink
          to={"/dashbord"}
          className={({ isActive }) =>
            `${navBase} ${isActive ? navActive : navInactive}`
          }
        >
          <LayoutDashboardIcon size={18} />
          Dashboard
        </NavLink>

        {/* Profile */}
        <NavLink
          to={"/dashbord/profile"}
          className={({ isActive }) =>
            `${navBase} ${isActive ? navActive : navInactive}`
          }
        >
          <UserCircle size={18} />
          My Profile
        </NavLink>

        {/* Donar: My Request */}
        {role === "donar" && (
          <NavLink
            to={"/dashbord/my-donation-requests"}
            className={({ isActive }) =>
              `${navBase} ${isActive ? navActive : navInactive}`
            }
          >
            <Heart size={18} />
            My Request
          </NavLink>
        )}

        {/* Admin: All Users */}
        {role === "admin" && (
          <NavLink
            to={"/dashbord/all-users"}
            className={({ isActive }) =>
              `${navBase} ${isActive ? navActive : navInactive}`
            }
          >
            <Users size={18} />
            All Users
          </NavLink>
        )}

        {/* Donar: Add Request */}
        {role === "donar" && (
          <NavLink
            to={"/dashbord/create-donation-request"}
            className={({ isActive }) =>
              `${navBase} ${isActive ? navActive : navInactive}`
            }
          >
            <Plus size={18} />
            Add Request
          </NavLink>
        )}

        {/* Admin & Volunteer */}
        {(role === "volunteer" || role === "admin") && (
          <NavLink
            to={"/dashbord/all-donation-request"}
            className={({ isActive }) =>
              `${navBase} ${isActive ? navActive : navInactive}`
            }
          >
            <HandHeart size={18} />
            All Donation Request
          </NavLink>
        )}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-800">
        <Link
          to={"/"}
          className="
            flex items-center gap-3 px-4 py-3 rounded-xl
            text-slate-400 hover:text-white
            hover:bg-emerald-600
            transition-all duration-200
            text-sm font-medium
          "
        >
          <Home size={18} />
          Back to Home
        </Link>
      </div>
    </aside>
  );
};

export default DashbordAsidebar;
