import { NavLink, Outlet } from "react-router";
import {
  FaFlag,
  FaFlagCheckered,
  FaRegListAlt,
  FaRegUser,
  FaUserMd,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";
import { TbFlagPlus } from "react-icons/tb";
import { IoAccessibilitySharp } from "react-icons/io5";
import useRole from "../../../hook/useRole";
import useAuth from "../../../hook/useAuth";

const DashboardLayout = () => {
  const { role } = useRole();
  const { user } = useAuth();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Enhanced Navbar */}
        <nav className="navbar w-full bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="flex items-center justify-between w-full px-4">
            <div className="flex items-center space-x-4">
              <label
                htmlFor="my-drawer-4"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {/* Enhanced Sidebar toggle icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-700 dark:text-gray-300"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </label>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v3H8V5z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{role} Panel</p>
                </div>
              </div>
            </div>

            {/* User Info in Navbar */}
            <div className="flex items-center space-x-3">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.displayName || 'User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {role || 'user'}
                </p>
              </div>
              <img
                className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-gray-600 shadow-md"
                src={user?.photoURL || '/default-avatar.png'}
                alt="Profile"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </nav>

        {/* Page content with enhanced background */}
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 is-drawer-close:w-16 is-drawer-open:w-72 transition-all duration-300">
          
          {/* Enhanced Sidebar Header */}
          <div className="w-full p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 is-drawer-close:justify-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v3H8V5z" />
                </svg>
              </div>
              <div className="is-drawer-close:hidden">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Dashboard</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Contest Management</p>
              </div>
            </div>
          </div>

          {/* Enhanced User Profile Section */}
          {/* <div className="w-full p-4 border-b border-gray-200 dark:border-gray-700 is-drawer-close:hidden">
            <div className="flex items-center space-x-3">
              <img
                className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-600 shadow-md"
                src={user?.photoURL || '/default-avatar.png'}
                alt="Profile"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {user?.displayName || 'User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {role || 'user'} Account
                </p>
              </div>
            </div>
          </div> */}

          {/* Enhanced Sidebar content */}
          <ul className="menu w-full grow p-2 space-y-1">
            {/* Enhanced Home Link */}
            <li>
              <NavLink 
                to="/"
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-3 items-center p-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500 shadow-md'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`
                }
                data-tip="Homepage"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="w-5 h-5 flex-shrink-0"
                >
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="is-drawer-close:hidden font-medium">Homepage</span>
              </NavLink>
            </li>

            {/* User Role Navigation */}
            {role === "user" && (
              <>
                <li className="is-drawer-close:hidden">
                  <div className="px-3 py-2">
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      User Menu
                    </h3>
                  </div>
                </li>
                
                <li>
                  <NavLink 
                    to="/dashboard/beContestCreator"
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-3 items-center p-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500 shadow-md'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                      }`
                    }
                    data-tip="Be Contest Creator"
                  >
                    <FaUserPlus className="w-5 h-5 flex-shrink-0" />
                    <span className="is-drawer-close:hidden font-medium">Be Contest Creator</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink 
                    to="/dashboard/myContest"
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-3 items-center p-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500 shadow-md'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                      }`
                    }
                    data-tip="My Participated Contest"
                  >
                    <FaUserMd className="w-5 h-5 flex-shrink-0" />
                    <span className="is-drawer-close:hidden font-medium">My Participated Contest</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink 
                    to="/dashboard/myWinningContests"
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-3 items-center p-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500 shadow-md'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                      }`
                    }
                    data-tip="My Winning Contests"
                  >
                    <FaFlagCheckered className="w-5 h-5 flex-shrink-0" />
                    <span className="is-drawer-close:hidden font-medium">My Winning Contests</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink 
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-3 items-center p-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500 shadow-md'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                      }`
                    }
                    data-tip="Profile"
                  >
                    <FaRegUser className="w-5 h-5 flex-shrink-0" />
                    <span className="is-drawer-close:hidden font-medium">Profile</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* Admin Role Navigation */}
            {role === "admin" && (
              <>
                <li className="is-drawer-close:hidden">
                  <div className="px-3 py-2">
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Admin Menu
                    </h3>
                  </div>
                </li>

                <li>
                  <NavLink 
                    to="/dashboard/approveCreators"
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-3 items-center p-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500 shadow-md'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                      }`
                    }
                    data-tip="Approve Creators"
                  >
                    <IoAccessibilitySharp className="w-5 h-5 flex-shrink-0" />
                    <span className="is-drawer-close:hidden font-medium">Approve Creators</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink 
                    to="/dashboard/manageUsers"
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-3 items-center p-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500 shadow-md'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                      }`
                    }
                    data-tip="Manage Users"
                  >
                    <FaUsers className="w-5 h-5 flex-shrink-0" />
                    <span className="is-drawer-close:hidden font-medium">Manage Users</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink 
                    to="/dashboard/manageContest"
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-3 items-center p-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500 shadow-md'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                      }`
                    }
                    data-tip="Manage Contest"
                  >
                    <FaRegListAlt className="w-5 h-5 flex-shrink-0" />
                    <span className="is-drawer-close:hidden font-medium">Manage Contest</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* Creator Role Navigation */}
            {role === "creator" && (
              <>
                <li className="is-drawer-close:hidden">
                  <div className="px-3 py-2">
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Creator Menu
                    </h3>
                  </div>
                </li>

                <li>
                  <NavLink 
                    to="/dashboard/addContest"
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-3 items-center p-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500 shadow-md'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                      }`
                    }
                    data-tip="Add Contest"
                  >
                    <TbFlagPlus className="w-5 h-5 flex-shrink-0" />
                    <span className="is-drawer-close:hidden font-medium">Add Contest</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink 
                    to="/dashboard/myContestPage"
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-3 items-center p-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500 shadow-md'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                      }`
                    }
                    data-tip="My Contest Page"
                  >
                    <FaFlag className="w-5 h-5 flex-shrink-0" />
                    <span className="is-drawer-close:hidden font-medium">My Contest Page</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Profile Button Section */}
          <div className="w-full p-4 border-t border-gray-200 dark:border-gray-700">
            <NavLink 
              to="/dashboard/profile"
              className={({ isActive }) =>
                `is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-3 items-center p-3 rounded-xl transition-all duration-200 w-full ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md'
                }`
              }
              data-tip="View Profile"
            >
              <img
                className="w-8 h-8 rounded-full border-2 border-white shadow-sm flex-shrink-0 is-drawer-close:w-6 is-drawer-close:h-6"
                src={user?.photoURL || '/default-avatar.png'}
                alt="Profile"
                referrerPolicy="no-referrer"
              />
              <div className="is-drawer-close:hidden flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">
                  {user?.displayName || 'User'}
                </p>
                <p className="text-xs opacity-75">
                  View Profile
                </p>
              </div>
              <svg 
                className="w-4 h-4 flex-shrink-0 is-drawer-close:hidden" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </NavLink>
          </div>

          {/* Enhanced Sidebar Footer */}
          <div className="w-full p-4 border-t border-gray-200 dark:border-gray-700 is-drawer-close:hidden">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>© 2026 Dashboard</span>
              <span className="capitalize bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                {role} Panel
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
