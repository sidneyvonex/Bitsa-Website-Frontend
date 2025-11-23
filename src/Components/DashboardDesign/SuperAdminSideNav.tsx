import {
  LayoutDashboard,
  Users,
  Shield,
  CalendarDays,
  FileText,
  Database,
  Activity,
  Settings,
  LogOut,
} from "lucide-react";
import type { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

interface NavLinkProps {
  to?: string;
  icon: ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}

interface SuperAdminSideNavProps {
  isCollapsed: boolean;
  userRole: 'SuperAdmin';
}

export const SuperAdminSideNav = ({ isCollapsed }: SuperAdminSideNavProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const isActive = (path: string) => {
    return (
      location.pathname === path ||
      location.pathname.startsWith(path + "/")
    );
  };

  return (
    <div className="flex flex-col h-full p-4 text-sm text-gray-100 bg-[#093FB4]">
      <div
        className={`text-xl font-bold text-orange-500 mb-6 ${
          isCollapsed ? "text-center" : ""
        }`}
      >
        {!isCollapsed ? "TicKenya" : "TK"}
      </div>

      <nav className="flex-1 space-y-2">
        <NavItem
          to="/superadmin"
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          active={
            isActive("/superadmin") &&
            location.pathname === "/superadmin"
          }
          collapsed={isCollapsed}
        />
        <NavItem
          to="/superadmin/users"
          icon={<Users size={20} />}
          label="User Management"
          active={isActive("/superadmin/users")}
          collapsed={isCollapsed}
        />
        <NavItem
          to="/superadmin/admins"
          icon={<Shield size={20} />}
          label="Admin Management"
          active={isActive("/superadmin/admins")}
          collapsed={isCollapsed}
        />
        <NavItem
          to="/superadmin/events"
          icon={<CalendarDays size={20} />}
          label="Events"
          active={isActive("/superadmin/events")}
          collapsed={isCollapsed}
        />
        <NavItem
          to="/superadmin/content"
          icon={<FileText size={20} />}
          label="Content"
          active={isActive("/superadmin/content")}
          collapsed={isCollapsed}
        />
        <NavItem
          to="/superadmin/database"
          icon={<Database size={20} />}
          label="Database"
          active={isActive("/superadmin/database")}
          collapsed={isCollapsed}
        />
        <NavItem
          to="/superadmin/analytics"
          icon={<Activity size={20} />}
          label="Analytics"
          active={isActive("/superadmin/analytics")}
          collapsed={isCollapsed}
        />
        <NavItem
          to="/superadmin/settings"
          icon={<Settings size={20} />}
          label="System Settings"
          active={isActive("/superadmin/settings")}
          collapsed={isCollapsed}
        />
      </nav>

      {/* LOGOUT BUTTON */}
      <div className="pt-4 border-t border-white/10">
        <NavItem
          icon={<LogOut size={20} />}
          label="Logout"
          collapsed={isCollapsed}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

const NavItem = ({
  to,
  icon,
  label,
  active,
  collapsed,
  onClick,
}: NavLinkProps) => {
  const content = (
    <div
      className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
        active
          ? "bg-white/20 text-white"
          : "hover:bg-white/10 text-gray-200"
      }`}
      onClick={onClick}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  return <button className="w-full text-left">{content}</button>;
};
