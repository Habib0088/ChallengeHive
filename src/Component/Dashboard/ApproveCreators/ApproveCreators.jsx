import React, { use } from "react";
import { Query, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../Loading/Loading";


const ApproveCreators = () => {
  const axiosSecure = useAxiosSecure();

  const {refetch,isLoading,data: creators = [] } = useQuery({
    queryKey: ["approveCreators"],
    queryFn: async () => {
      const res = await axiosSecure.get("http://localhost:3000/creators");
      return res.data;
    },
  });
  console.log(creators);

  const handleUpdateStatus = (creator, status) => {
    const info = {
      email:creator.email,
      id: creator._id,
      status: status,
    };
    // console.log(id, status);
    axiosSecure.patch("/updateCreators", info).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount) {
        refetch()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
if(isLoading){
  return <Loading></Loading>
}
  return (
    <div>
      <h1 className="te-xl font-bold"> Total Creators : {creators.length}</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {creators.map((creator, i) => (
              <tr>
                <th>{i + 1}</th>
                <td>{creator.name}</td>
                <td>{creator.email}</td>
                <td>{creator.status}</td>
                <td>
                  <button
                    onClick={() => handleUpdateStatus(creator, "Approved")}
                    className="btn  bg-primary text-black"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(creator, "Rejected")}
                    className="btn bg-primary text-black ms-2"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveCreators;
