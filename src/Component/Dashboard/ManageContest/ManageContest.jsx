import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import { toast } from "../../Authentication/Registration/Toast/toast";
import Swal from "sweetalert2";
import Loading from "../../Loading/Loading";
import ScrollAnimateWrapper from "../../ScrollAnimateWrapper/ScrollAnimateWrapper";

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
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <ScrollAnimateWrapper animation="fade-in-down" delay={0}>
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 7a2 2 0 012-2h10a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Manage Contests
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Total Contests: {contests.length}
              </p>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {contests.filter(c => c.status === 'Approved').length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Approved</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {contests.filter(c => c.status === 'Pending').length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {contests.filter(c => c.status === 'Rejected').length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Rejected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimateWrapper>

      <ScrollAnimateWrapper animation="fade-in-up" delay={200}>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-center">
              {/* head */}
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">#</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">Photo</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">Type</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">Name</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {contests.map((contest, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <th className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{i + 1}</th>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md ring-2 ring-blue-500/20">
                          <img
                            src={contest.photoURL}
                            alt="Contest"
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        {contest?.contestType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white max-w-xs truncate">
                      {contest.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        contest.status === 'Approved' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : contest.status === 'Rejected'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {contest.status}
                      </span>
                    </td>
                    <th className="px-6 py-4">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleStatusUpdate(contest._id, "Approved")}
                          className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-300"
                        >
                          <svg className="w-3 h-3 mr-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Confirm
                        </button>

                        <button
                          onClick={() => handleStatusUpdate(contest._id, "Rejected")}
                          className="px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-medium rounded-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300"
                        >
                          <svg className="w-3 h-3 mr-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Reject
                        </button>
                        
                        <button
                          onClick={() => handleDelete(contest._id)}
                          className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all duration-300"
                        >
                          <svg className="w-3 h-3 mr-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ScrollAnimateWrapper>
    </div>
  );
};

export default ManageContest;
