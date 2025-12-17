
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import Loading from "../../Loading/Loading";
import { toast } from "../../Authentication/Registration/Toast/toast";

const ManageUsers = () => {
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
    <div>
      <h1 className="font-bold text-2xl">
        <span className="text-[#0A4031]">Total Users</span> {users.length}
      </h1>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <td>#</td>
              <th>Name</th>
              <th>Job</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          {currentUsers.map((user, i) => (
            <tbody key={i}>
              <tr>
                <td>{indexOfFirstItem + i + 1}</td>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          referrerPolicy="no-referrer"
                          src={user?.photoURL}
                          alt="Avatar"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="font-bold">{user.displayName}</div>
                    </div>
                  </div>
                </td>

                <td>
                  <div className="text-sm ">{user.email}</div>
                </td>

                <td
                  className={`font-bold text-md capitalize ${
                    user?.role === "admin"
                      ? "text-red-500"
                      : user?.role === "creator"
                      ? "text-blue-500"
                      : "text-black"
                  }`}
                >
                  {user?.role}
                </td>

                <td>
                  <div className="dropdown dropdown-hover">
                    <div tabIndex={0} role="button" className="btn m-1">
                      Change Role
                    </div>
                    <ul
                      tabIndex="-1"
                      className="dropdown-content menu bg-base-100 rounded-box z-1 w-42 p-2 shadow-sm"
                    >
                      <li
                        onClick={() => handleUpdateRole(user, "admin")}
                        className="font-bold"
                      >
                        <a>Admin</a>
                      </li>
                      <li
                        onClick={() => handleUpdateRole(user, "creator")}
                        className="font-bold"
                      >
                        <a>Creator</a>
                      </li>
                      <li
                        onClick={() => handleUpdateRole(user, "user")}
                        className="font-bold"
                      >
                        <a>User</a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>


      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
