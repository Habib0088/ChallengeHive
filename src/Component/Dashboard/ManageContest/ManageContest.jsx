import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import { Link } from "react-router";
import { toast } from "../../Authentication/Registration/Toast/toast";
import Swal from "sweetalert2";
import Loading from "../../Loading/Loading";

const ManageContest = () => {
  const axiosSecure = useAxiosSecure();
  const {isLoading, refetch, data: contests = [] } = useQuery({
    queryKey: ["manageContest"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manageContest");
      return res.data;
    },
  });
  const handleDelete = (id) => {
    // console.log(id);
    // ==============================

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/deleteContestByAdmin/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            refetch();
          }
        });
        Swal.fire({
          title: "Deleted!",
          text: "Contest has been deleted.",
          icon: "success",
        });
      }
    });
    // ==============================
  };
  const handleStatusUpdate = (id, status) => {
    const data = { id, status };
    axiosSecure.patch("/updateContestStatus", data).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount) {
        toast(`Contest has been ${status}`);
        refetch();
      }
    });
    console.log(id, status);
  };
  if(isLoading){
    return <Loading></Loading>
  }
  return (
    <div>
      <h1>Manage contest {contests.length}</h1>
      <div className="overflow-x-auto">
        <table className="table text-center">
          {/* head */}
          <thead className="">
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Type</th>
              <th>Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={contest.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{contest?.contestType}</div>
                    </div>
                  </div>
                </td>
                <td>{contest.name}</td>
                <td>{contest.status}</td>
                <th>
                  <button
                    onClick={() => handleStatusUpdate(contest._id, "Approved")}
                    className="btn btn-primary text-black"
                  >
                    Confirm
                  </button>

                  <button
                    onClick={() => handleStatusUpdate(contest._id, "Rejected")}
                    className="btn btn-primary text-black ml-2"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleDelete(contest._id)}
                    className="btn btn-primary text-black ml-2"
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageContest;
