import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import Loading from "../../../Component/Loading/Loading";
import "./WinnerAdvertisement.css";

const WinnerAdvertisement = () => {
  const axiosSecure = useAxiosSecure();
  const { isLoading, data: winner } = useQuery({
    queryKey: ["winnerAdvertisement"],
    queryFn: async () => {
      const res = await axiosSecure.get("/winnerAdvertisement");
      return res.data;
    },
  });
  
  if (isLoading) {
    return <Loading></Loading>;
  }
  
  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-16 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-blue-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-32 left-40 w-20 h-20 border border-purple-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 border border-pink-400 rounded-full animate-pulse"></div>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-float"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-float"></div>
          <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-pink-400 rounded-full animate-float-delayed"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Different Style */}
        <div className="text-center mb-12 animate-slide-down">
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-4 tracking-tight">
              CHAMPION
            </h1>
            <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/20 to-red-500/20 blur-xl rounded-full"></div>
          </div>
          <p className="text-xl text-gray-300 font-light tracking-wide">Latest Contest Winner</p>
          <div className="flex justify-center mt-4 space-x-1">
            <div className="w-8 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="w-4 h-1 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-8 h-1 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>

        {/* Winner Showcase - Horizontal Card Style */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden animate-scale-in">
            <div className="flex flex-col lg:flex-row">
              {/* Winner Image Section */}
              <div className="lg:w-2/5 relative group">
                <div className="aspect-square lg:aspect-auto lg:h-full relative overflow-hidden">
                  <img
                    src={winner?.[0]?.participants?.[0]?.participantPhoto}
                    alt="Winner"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Floating Trophy */}
                  <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-gentle">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>

                  {/* Prize Amount Overlay */}
                  <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-sm rounded-2xl px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      <span className="text-2xl font-bold text-green-400">${winner?.[0]?.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Winner Details Section */}
              <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                <div className="space-y-6">
                  {/* Contest Info */}
                  <div className="space-y-2">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white capitalize leading-tight">
                      {winner?.[0]?.name}
                    </h2>
                    <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                      {winner?.[0]?.contestType}
                    </div>
                  </div>

                  {/* Winner Personal Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 hover:border-yellow-500/50 transition-colors duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Winner</p>
                          <p className="text-white font-semibold">{winner?.[0]?.participants?.[0]?.participantName}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 hover:border-blue-500/50 transition-colors duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Contact</p>
                          <p className="text-white font-semibold text-sm">{winner?.[0]?.participants?.[0]?.participantEmail}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contest Description */}
                  <div className="bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-xl p-6 border-l-4 border-yellow-400">
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {winner?.[0]?.description}
                    </p>
                  </div>

                  {/* Achievement Badge */}
                  <div className="flex items-center justify-center lg:justify-start">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow duration-300 animate-glow">
                      🏆 CONTEST CHAMPION
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Motivational Section - Different Style */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 lg:p-12 shadow-2xl">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="relative">
                <h2 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-4">
                  PUSH YOUR BOUNDARIES
                </h2>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
              </div>
              
              <div className="relative">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                <p className="text-gray-300 text-lg leading-relaxed pl-6 font-light">
                  Participation is the first step toward growth and success. It builds
                  confidence and encourages learning through experience. By
                  participating, we challenge our limits and discover our strengths.
                  Every effort, win or loss, becomes a valuable lesson. Participation
                  fosters teamwork, creativity, and resilience. It turns opportunities
                  into achievements and ideas into action. True inspiration begins when
                  we choose to take part
                </p>
              </div>

              {/* Call to Action */}
              <div className="flex justify-center pt-4">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-400 font-medium tracking-wide">BE THE NEXT CHAMPION</span>
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerAdvertisement;
