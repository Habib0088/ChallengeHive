
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import Loading from "../../Loading/Loading";
import { toast } from "../../Authentication/Registration/Toast/toast";
import { useTheme } from "../../../contexts/ThemeContext";
import ScrollAnimateWrapper from "../../ScrollAnimateWrapper/ScrollAnimateWrapper";

const ManageUsers = () => {
  const { isDark } = useTheme();
  const axiosSecure = useAxiosSecure();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    refetch,
    data: users = [],
    isLoading,
  } = useQuery({
    queryKey: ["manageUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manageUsers");
      return res.data;
    },
  });

  const handleUpdateRole = (user, status) => {
    const userStatus = { role: status };
    console.log(user, status);

    axiosSecure
      .patch(`/userRoleUpdate?email=${user.email}`, userStatus)
      .then((res) => {
        console.log(res.data);
        if (res.data.acknowledged) {
          toast("Changed The Role Successfully");
          refetch();
        }
      });
  };

  if (isLoading) {
    return <Loading />;
  }
  console.log(users);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <div className="p-2 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <ScrollAnimateWrapper animation="fade-in-down" delay={0}>
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Total Users
          </span>{' '}
          <span className="text-lg font-medium text-gray-600 dark:text-gray-400">
            {users.length}
          </span>
        </h1>
      </ScrollAnimateWrapper>

      <ScrollAnimateWrapper animation="fade-in-up" delay={200}>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <td className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">#</td>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {currentUsers.map((user, i) => (
                  <tr 
                    key={i}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      {indexOfFirstItem + i + 1}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden shadow-md ring-2 ring-blue-500/20">
                          <img
                            referrerPolicy="no-referrer"
                            src={user?.photoURL}
                            alt="Avatar"
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        </div>

                        <div>
                          <div className="font-bold text-sm text-gray-900 dark:text-white">
                            {user.displayName}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {user.email}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        user?.role === "admin"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          : user?.role === "creator"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                      }`}>
                        {user?.role}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="relative group">
                        <button className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300">
                          Change Role
                          <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        <div className="absolute top-full left-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                          <div className="py-2">
                            <button
                              onClick={() => handleUpdateRole(user, "admin")}
                              className="w-full px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                            >
                              Admin
                            </button>
                            <button
                              onClick={() => handleUpdateRole(user, "creator")}
                              className="w-full px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                            >
                              Creator
                            </button>
                            <button
                              onClick={() => handleUpdateRole(user, "user")}
                              className="w-full px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200"
                            >
                              User
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ScrollAnimateWrapper>

      <ScrollAnimateWrapper animation="fade-in-up" delay={400}>
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 ${
                currentPage === i + 1 
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" 
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </ScrollAnimateWrapper>
    </div>
  );
};

export default ManageUsers;
