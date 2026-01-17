import useAuth from "../../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import { Link } from "react-router";
import Loading from "../../Loading/Loading";
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
  console.log(contests);
  
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
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 7a2 2 0 012-2h10a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                My Contests
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Total Contests: {contests.length}
              </p>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 7a2 2 0 012-2h10a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{contests.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                </div>
              </div>
            </div>

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
                    {contests.filter(c => c.status === 'pending').length}
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

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
          {contests.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 7a2 2 0 012-2h10a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                No contests found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You haven't created any contests yet.
              </p>
              <Link to="/dashboard/addContest">
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                  Create Your First Contest
                </button>
              </Link>
            </div>
          ) : (
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
                    <th className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
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
                          {contest.status !== 'Approved' && (
                            <>
                              <Link to={`/dashboard/editContest/${contest._id}`}>
                                <button className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300">
                                  <svg className="w-3 h-3 mr-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                  Edit
                                </button>
                              </Link>
                              <button
                                onClick={() => handleDelete(contest._id)}
                                className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all duration-300"
                              >
                                <svg className="w-3 h-3 mr-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                              </button>
                            </>
                          )}
                          <Link to={`/dashboard/submission/${contest._id}`}>
                            <button className="px-3 py-1.5 bg-purple-500 hover:bg-purple-600 text-white text-xs font-medium rounded-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300">
                              <svg className="w-3 h-3 mr-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              Submissions
                            </button>
                          </Link>
                        </div>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyContestPage;
