import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../Loading/Loading";
import { useTheme } from "../../../contexts/ThemeContext";
import ScrollAnimateWrapper from "../../ScrollAnimateWrapper/ScrollAnimateWrapper";


const ApproveCreators = () => {
  const { isDark } = useTheme();
  const axiosSecure = useAxiosSecure();

  const {refetch,isLoading,data: creators = [] } = useQuery({
    queryKey: ["approveCreators"],
    queryFn: async () => {
      const res = await axiosSecure.get("https://challengehive-smoky.vercel.app/creators");
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
    <div className="p-6 transition-colors duration-300" style={{ background: 'var(--bg-primary)' }}>
      <ScrollAnimateWrapper animation="fade-in-down" delay={0}>
        <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Total Creators : {creators.length}
        </h1>
      </ScrollAnimateWrapper>
      
      <ScrollAnimateWrapper animation="fade-in-up" delay={200}>
        <div className={`rounded-xl border shadow-lg overflow-hidden transition-all duration-300 ${
          isDark ? 'bg-slate-800/80 border-gray-700/50' : 'bg-white/80 border-gray-200/50'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* head */}
              <thead className={`${isDark ? 'bg-slate-700/50' : 'bg-gray-50/80'}`}>
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>#</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Action</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--border-primary)' }}>
                {creators.map((creator, i) => (
                  <tr 
                    key={creator._id}
                    className={`transition-all duration-300 hover:bg-opacity-50 ${
                      isDark ? 'hover:bg-slate-700/30' : 'hover:bg-gray-50/50'
                    }`}
                  >
                    <th className="px-6 py-4 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {i + 1}
                    </th>
                    <td className="px-6 py-4 text-sm" style={{ color: 'var(--text-primary)' }}>
                      {creator.name}
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {creator.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        creator.status === 'Approved' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : creator.status === 'Rejected'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {creator.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => handleUpdateStatus(creator, "Approved")}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(creator, "Rejected")}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500/50"
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
      </ScrollAnimateWrapper>
    </div>
  );
};

export default ApproveCreators;
