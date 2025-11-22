import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, X, ChevronDown } from "lucide-react";

export default function Topbar() {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  // Derive current path from react-router so Topbar can highlight active links
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (p: string) => {
    if (p === "/") return currentPath === "/";
    return (
      currentPath === p ||
      currentPath.startsWith(p + "/") ||
      currentPath.startsWith(p)
    );
  };

  // Apply theme changes to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Toggle theme
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    const next = !isMobileMenuOpen;
    setIsMobileMenuOpen(next);
    if (!next) {
      // closing menu -> collapse expanded sections
      setExpandedSection(null);
    }
  };

  // Toggle section in mobile menu
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center space-x-3 cursor-pointer hover:opacity-90 transition-opacity shrink-0"
          >
            <img
              src={new URL("../assets/bitsa-logo.png", import.meta.url).href}
              alt="BITSA Logo"
              className="h-12 lg:h-14 w-auto object-contain"
            />
            <div className="hidden xl:block">
              <div className="text-xs font-bold text-[#1e3a8a] uppercase tracking-tight leading-tight">
                <div>Bachelor of Information</div>
                <div>Technology Students</div>
                <div>Association (BITSA)</div>
              </div>
            </div>
            <div className="hidden lg:block xl:hidden">
              <div className="text-base font-bold text-[#1e3a8a] uppercase tracking-tight">
                BITSA
              </div>
            </div>
          </Link>

          {/* Navigation Links - Hidden on smaller screens, shown from lg onwards */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <Link
              to="/"
              className={`relative text-sm xl:text-base font-semibold py-2 whitespace-nowrap ${
                isActive("/") ? "text-[#f59e0b]" : "text-gray-800"
              }`}
            >
              Home
              {isActive("/") && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#f59e0b]"></span>
              )}
            </Link>

            {/* About Us Dropdown */}
            <div className="relative group">
              <button
                className={`relative text-sm xl:text-base font-medium py-2 transition-colors flex items-center gap-1 whitespace-nowrap ${
                  isActive("/about") ? "text-[#f59e0b]" : "text-gray-800"
                }`}
              >
                About Us
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                {isActive("/about") && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#f59e0b]"></span>
                )}
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <a
                  href="/about#about-section"
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#f59e0b] rounded-t-lg"
                >
                  About BITSA
                </a>

                <a
                  href="/about#mission-section"
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#f59e0b]"
                >
                  Mission & Vision
                </a>


                <a
                  href="/about#constitution-section"
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#f59e0b] rounded-b-lg"
                >
                  Constitution
                </a>
                <Link
                  to="/about/leadership"
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#f59e0b]"
                >
                  Our Leaders
                </Link>
              </div>
            </div>

            {/* Events Dropdown */}
            <div className="relative group">
              <button
                className={`relative text-sm xl:text-base font-medium py-2 transition-colors flex items-center gap-1 whitespace-nowrap ${
                  isActive("/events") ? "text-[#f59e0b]" : "text-gray-800"
                }`}
              >
                Events
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                {isActive("/events") && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#f59e0b]"></span>
                )}
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <a
                  href="/events"
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#f59e0b] rounded-t-lg"
                >
                  Upcoming Events
                </a>
                <a
                  href="/events"
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#f59e0b]"
                >
                  Past Events
                </a>
                <a
                  href="/events/calendar-view"
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#f59e0b] rounded-b-lg"
                >
                  Calendar View
                </a>
              </div>
            </div>

            <Link
              to="/blogs"
              className={`relative text-sm xl:text-base font-medium py-2 transition-colors group whitespace-nowrap ${
                isActive("/blogs") ? "text-[#f59e0b]" : "text-gray-800"
              }`}
            >
              Blogs
              {isActive("/blogs") && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#f59e0b]"></span>
              )}
            </Link>

            {/* Resources Dropdown */}
            <div className="relative group">
              <button
                className={`relative text-sm xl:text-base font-medium py-2 transition-colors flex items-center gap-1 whitespace-nowrap ${
                  isActive("/gallery") || isActive("/projects")
                    ? "text-[#f59e0b]"
                    : "text-gray-800"
                }`}
              >
                Resources
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                {(isActive("/gallery") || isActive("/projects")) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#f59e0b]"></span>
                )}
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <a
                  href="/gallery"
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#f59e0b] rounded-t-lg"
                >
                  Gallery
                </a>
                <a
                  href="/marketplace"
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#f59e0b]"
                >
                  Marketplace
                </a>
                <a
                  href="/projects"
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#f59e0b] rounded-b-lg"
                >
                  Projects
                </a>
              </div>
            </div>

            <Link
              to="/communities"
              className={`relative text-sm xl:text-base font-medium py-2 transition-colors group whitespace-nowrap ${
                isActive("/communities") ? "text-[#f59e0b]" : "text-gray-800"
              }`}
            >
              Communities
              {isActive("/communities") && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#f59e0b]"></span>
              )}
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 xl:space-x-4">
            {/* Sign In Button - Hidden on medium, shown on xl */}
            <a
              href="/signin"
              className="hidden xl:inline-block text-blue-600 font-semibold px-4 py-2 rounded-full border-2 border-blue-600 hover:bg-blue-50 transition-all text-sm whitespace-nowrap"
            >
              Sign In
            </a>

            {/* Sign Up Button - Hidden on medium, shown on xl */}
            <a
              href="/signup"
              className="hidden xl:inline-block bg-blue-600 text-white font-semibold px-4 py-2 rounded-full hover:bg-blue-700 transition-all shadow-md hover:shadow-lg text-sm whitespace-nowrap"
            >
              Sign Up
            </a>

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors shrink-0"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-gray-700" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            {/* Mobile Menu Button - Shows at lg and below */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-6 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
              {/* Home Link */}
              <Link
                to="/"
                className="block text-[#f59e0b] font-semibold py-2 border-l-4 border-[#f59e0b] pl-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* About Us Section */}
              <div>
                <button
                  onClick={() => toggleSection("about")}
                  className="flex items-center justify-between w-full text-gray-800 font-medium py-2 hover:text-[#f59e0b] transition-colors"
                >
                  <span>About Us</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      expandedSection === "about" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedSection === "about" && (
                  <div className="mt-2 space-y-2 pl-4 border-l-2 border-gray-200">
                    <Link
                      to="/about"
                      className="block py-2 text-gray-700 hover:text-[#f59e0b] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      About BITSA
                    </Link>
                    <Link
                      to="/mission"
                      className="block py-2 text-gray-700 hover:text-[#f59e0b] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Mission & Vision
                    </Link>
                    <Link
                      to="/constitution"
                      className="block py-2 text-gray-700 hover:text-[#f59e0b] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Constitution
                    </Link>
                    <Link
                      to="/leadership"
                      className="block py-2 text-gray-700 hover:text-[#f59e0b] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Our Leaders
                    </Link>
                  </div>
                )}
              </div>

              {/* Events Section */}
              <div>
                <button
                  onClick={() => toggleSection("events")}
                  className="flex items-center justify-between w-full text-gray-800 font-medium py-2 hover:text-[#f59e0b] transition-colors"
                >
                  <span>Events</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      expandedSection === "events" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedSection === "events" && (
                  <div className="mt-2 space-y-2 pl-4 border-l-2 border-gray-200">
                    <Link
                      to="/events/upcoming"
                      className="block py-2 text-gray-700 hover:text-[#f59e0b] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Upcoming Events
                    </Link>
                    <Link
                      to="/events/past"
                      className="block py-2 text-gray-700 hover:text-[#f59e0b] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Past Events
                    </Link>
                    <Link
                      to="/events/calendar-view"
                      className="block py-2 text-gray-700 hover:text-[#f59e0b] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Calendar View
                    </Link>
                  </div>
                )}
              </div>

              {/* Blogs Link */}
              <Link
                to="/blogs"
                className="block text-gray-800 font-medium py-2 hover:text-[#f59e0b] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blogs
              </Link>

              {/* Resources Section */}
              <div>
                <button
                  onClick={() => toggleSection("resources")}
                  className="flex items-center justify-between w-full text-gray-800 font-medium py-2 hover:text-[#f59e0b] transition-colors"
                >
                  <span>Resources</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      expandedSection === "resources" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedSection === "resources" && (
                  <div className="mt-2 space-y-2 pl-4 border-l-2 border-gray-200">
                    <Link
                      to="/gallery"
                      className="block py-2 text-gray-700 hover:text-[#f59e0b] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Gallery
                    </Link>
                    <Link
                      to="/marketplace"
                      className="block py-2 text-gray-700 hover:text-[#f59e0b] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Marketplace
                    </Link>
                    <Link
                      to="/projects"
                      className="block py-2 text-gray-700 hover:text-[#f59e0b] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Projects
                    </Link>
                  </div>
                )}
              </div>

              {/* Communities Link */}
              <Link
                to="/communities"
                className="block text-gray-800 font-medium py-2 hover:text-[#f59e0b] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Communities
              </Link>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4"></div>

              {/* Auth Buttons */}
              <div className="space-y-3">
                <Link
                  to="/signin"
                  className="block w-full text-center text-blue-600 font-semibold px-6 py-3 rounded-full border-2 border-blue-600 hover:bg-blue-50 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-center bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
