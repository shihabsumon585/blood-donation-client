import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, FileText, Settings, LogOut, Home, Plus, Package } from "lucide-react";
import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

export default function DashbordAsidebar() {

  const { role } = useContext(AuthContext);

  const menuItems = [
    { name: "Dashboard", path: "/dashbord", icon: LayoutDashboard },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Add-Request", path: "/dashbord/create-donation-request", icon: Plus },
    { name: "Manage Product", path: "/dashbord/manage-product", icon: Package },
    { name: "Reports", path: "/admin/reports", icon: FileText },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="h-screen w-64 bg-slate-900 text-white fixed left-0 top-0">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-slate-700">
        <h1 className="text-xl font-bold tracking-wide">{role == "admin" ? "Admin" : role == "volunteer" ? "Volunteer" : "Donar" } Panel</h1>
      </div>

      {/* Menu */}
      <nav className="mt-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <item.icon size={20} />
            <span className="text-sm font-medium">{item.name}</span>
          </NavLink>
        ))}
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
