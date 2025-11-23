import { Bell, LogOut, Menu, Settings } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { useGetCurrentUserQuery } from "../../features/api/userApi";

interface TopbarProps {
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
}

export const Topbar = ({ toggleSidebar, toggleMobileSidebar }: TopbarProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch logged-in user from backend
  const { data, isLoading } = useGetCurrentUserQuery();

  const user = data?.data || null;

  const profileImage = user?.profilePicture;

  const getInitials = () => {
    if (!user) return "U";

    const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
    if (!fullName) return "U";

    return fullName
      .split(" ")
      .map((n) => n.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="w-full bg-white px-6 py-4 flex items-center justify-between border-b border-gray-200 shadow-sm z-10 sticky top-0">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="hidden lg:block">
          <Menu className="w-6 h-6 text-gray-600" />
        </button>

        <button onClick={toggleMobileSidebar} className="block lg:hidden">
          <Menu className="w-6 h-6 text-gray-600" />
        </button>

        <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button className="btn btn-ghost border-0 btn-circle">
          <Bell className="w-5 h-5 text-gray-500" />
        </button>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className={`btn btn-ghost btn-circle avatar border-0 ${
              !profileImage ? "bg-[#ED3500]" : ""
            } ${isLoading ? "loading" : ""}`}
          >
            <div className="w-10 rounded-full overflow-hidden flex items-center justify-center text-white font-bold">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                getInitials()
              )}
            </div>
          </div>

          {/* Dropdown Menu */}
          {!isLoading && (
            <ul className="dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link to="/profile">
                  <Settings size={16} /> Profile Settings
                </Link>
              </li>

              <li>
                <button onClick={handleLogout}>
                  <LogOut size={16} /> Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};
