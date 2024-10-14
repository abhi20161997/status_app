import React, { ReactNode, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Organization } from "../types/index";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

  useEffect(() => {
    const cachedOrg = localStorage.getItem("selectedOrg");
    if (cachedOrg) {
      setSelectedOrg(JSON.parse(cachedOrg));
    }
  }, []);

  // Handle user logout
  const handleLogout = () => {
    logout();
    navigate("/login");
    localStorage.clear();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to determine if a tab is active
  const isActiveTab = (path: string) => {
    return location.pathname === path;
  };

  // Function to get tab classes
  const getTabClasses = (path: string) => {
    return `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
      isActiveTab(path)
        ? "border-indigo-500 text-gray-900"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
    }`;
  };

  // Function to get the organization-specific path
  const getOrgPath = (path: string) => {
    return selectedOrg ? `/${selectedOrg.id}${path}` : path;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <img
                  className="h-12 w-auto"
                  src="/plivo_logo.jpeg"
                  alt="Logo"
                />
                <span className="ml-2 text-xl font-semibold">
                  Plivo Status Page
                </span>
              </Link>
              <div className="ml-6 flex space-x-8">
                <Link to="/" className={getTabClasses("/")}>
                  Home
                </Link>
                {selectedOrg && (
                  <>
                    <Link
                      to={getOrgPath("/services")}
                      className={getTabClasses(getOrgPath("/services"))}
                    >
                      Services
                    </Link>
                    <Link
                      to={getOrgPath("/incidents")}
                      className={getTabClasses(getOrgPath("/incidents"))}
                    >
                      Incidents
                    </Link>
                    <Link
                      to={getOrgPath("/maintenances")}
                      className={getTabClasses(getOrgPath("/maintenances"))}
                    >
                      Maintenances
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="ml-auto relative">
              {user && (
                <div>
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    <span>{user.username}</span>
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-48 bg-white shadow-lg rounded-md">
                      <div className="py-1">
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>

      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Status Page. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
