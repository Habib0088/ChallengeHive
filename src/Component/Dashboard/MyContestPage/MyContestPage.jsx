import React from "react";
import useAuth from "../../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import { Link } from "react-router";
import Loading from "../../Loading/Loading";
import { toast } from "../../Authentication/Registration/Toast/toast";
import Swal from "sweetalert2";

const MyContestPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    refetch,
    isLoading,
    data: contests = [],
  } = useQuery({
    queryKey: ["myContest"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myContest?email=${user.email}`);
      return res.data;
    },
  });
  const handleDelete = (id) => {
    console.log(id);
    // Delete start
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axiosSecure
            .delete(`/contestDelete/${id}`)
            .then((res) => {
              if (res.data.deletedCount) {
                refetch();
                
              }
              console.log(res.data);
            })
            .catch((err) => console.log(err));
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });

    // Delete End
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h1>My Contest : {contests.length}</h1>
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
                  <Link to={`/dashboard/editContest/${contest._id}`}>
                    <button className="btn btn-primary text-black">Edit</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(contest._id)}
                    className="btn btn-primary text-black ml-2"
                  >
                    Delete
                  </button>
                  <button className="btn btn-primary text-black ml-2">
                    Submission
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

export default MyContestPage;
