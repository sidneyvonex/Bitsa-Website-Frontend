import {
  LayoutDashboard,
  CalendarDays,
  LogOut,
  Mail,
  Newspaper,
  CreditCard,
  Users,
  MapPin,
  BarChart3,
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

interface AdminSideNavProps {
  isCollapsed: boolean;
  userRole: 'Admin';
}

export const AdminSideNav = ({ isCollapsed }: AdminSideNavProps) => {
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
          to="/admindashboard"
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          active={
            isActive("/admindashboard") &&
            location.pathname === "/admindashboard"
          }
          collapsed={isCollapsed}
        />
        <NavItem
          to="/admindashboard/bookings"
          icon={<CalendarDays size={20} />}
          label="All Bookings"
          active={isActive("/admindashboard/bookings")}
          collapsed={isCollapsed}
        />
        <NavItem
          to="/admindashboard/events"
          icon={<Newspaper size={20} />}
          label="All Events"
          active={isActive("/admindashboard/events")}
          collapsed={isCollapsed}
        />
        <NavItem
          to="/admindashboard/venues"
          icon={<MapPin size={20} />}
          label="All Venues"
          active={isActive("/admindashboard/venues")}
          collapsed={isCollapsed}
        />
        <NavItem
          to="/admindashboard/payments"
          icon={<CreditCard size={20} />}
          label="Payments"
          active={isActive("/admindashboard/payments")}
          collapsed={isCollapsed}
        />
        <NavItem
          to="/admindashboard/support"
          icon={<Mail size={20} />}
          label="Support Tickets"
          active={isActive("/admindashboard/support")}
          collapsed={isCollapsed}
        />
        <NavItem
          to="/admindashboard/users"
          icon={<Users size={20} />}
          label="All Users"
          active={isActive("/admindashboard/users")}
          collapsed={isCollapsed}
        />
        <NavItem
          to="/admindashboard/reports"
          icon={<BarChart3 size={20} />}
          label="Sales Reports"
          active={isActive("/admindashboard/reports")}
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
