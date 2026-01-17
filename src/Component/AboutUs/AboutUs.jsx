import ScrollAnimateWrapper from "../ScrollAnimateWrapper/ScrollAnimateWrapper";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigate } from "react-router";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../Context/AuthContext/AuthContext";
import { toast } from "../Authentication/Registration/Toast/toast";

const AboutUs = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to mission section
  const scrollToMission = () => {
    const missionSection = document.getElementById('mission-section');
    if (missionSection) {
      missionSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      toast("Scrolling to mission section...", "info");
    } else {
      toast("Mission section not found", "error");
    }
  };

  // Handle join community button
  const handleJoinCommunity = () => {
    if (user) {
      toast("Redirecting to contests page...", "info");
      navigate('/allContests');
    } else {
      toast("Join our community to participate in contests!", "info");
      navigate('/registration');
    }
  };

  // Handle explore contests button
  const handleExploreContests = () => {
    toast("Exploring available contests...", "info");
    navigate('/allContests');
  };

  // Handle contact us button
  const handleContactUs = () => {
    try {
      const phoneNumber = "8801620673080";
      const message = encodeURIComponent("Hi! I'm interested in learning more about ChallengeHive. Can you help me?");
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
      window.open(whatsappUrl, '_blank');
      toast("Opening WhatsApp chat...", "success");
    } catch (error) {
      toast("Unable to open WhatsApp. Please contact us directly.", "error");
    }
  };

  // Scroll to top functionality
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    toast("Scrolling to top...", "info");
  };

  const teamMembers = [
    {
      id: 1,
      name: "Habib Sarker",
      role: "Founder & Lead Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Passionate about creating platforms that empower creativity and innovation. With years of experience in full-stack development.",
      linkedin: "https://www.linkedin.com/in/habib-sarker-dev/",
      skills: ["React", "Node.js", "MongoDB", "UI/UX"]
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Contest Manager",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Expert in organizing and managing competitive events. Ensures fair play and transparent processes for all participants.",
      linkedin: "#",
      skills: ["Event Management", "Strategy", "Analytics", "Communication"]
    },
    {
      id: 3,
      name: "Mike Chen",
      role: "Technical Lead",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Specializes in building scalable systems and ensuring platform security. Committed to delivering exceptional user experiences.",
      linkedin: "#",
      skills: ["System Architecture", "Security", "DevOps", "Performance"]
    }
  ];

  const values = [
    {
      id: 1,
      title: "Transparency",
      description: "We believe in complete transparency in our contest processes, winner selection, and reward distribution.",
      icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Innovation",
      description: "We continuously innovate to provide cutting-edge features and the best possible contest experience.",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Community",
      description: "Building a supportive community where participants can learn, grow, and achieve their goals together.",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from platform development to customer support.",
      icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const stats = [
    { id: 1, number: "10,000+", label: "Active Participants", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
    { id: 2, number: "500+", label: "Contests Hosted", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 7a2 2 0 012-2h10a2 2 0 012 2v2M7 7h10" },
    { id: 3, number: "$100K+", label: "Prizes Distributed", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" },
    { id: 4, number: "99%", label: "Satisfaction Rate", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" }
  ];

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ background: 'var(--bg-primary)' }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20" style={{ background: 'var(--bg-secondary)' }}>
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl ${
            isDark ? 'bg-gradient-to-br from-blue-400/10 to-purple-400/10' : 'bg-gradient-to-br from-blue-400/20 to-purple-400/20'
          }`}></div>
          <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl ${
            isDark ? 'bg-gradient-to-br from-purple-400/10 to-pink-400/10' : 'bg-gradient-to-br from-purple-400/20 to-pink-400/20'
          }`}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimateWrapper animation="fade-in-down" delay={0}>
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-8 shadow-lg shadow-blue-500/25">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                About{' '}
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  ChallengeHive
                </span>
              </h1>
              <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Empowering creativity and innovation through diverse contest categories. 
                We connect talented individuals with exciting opportunities to showcase their skills and win amazing rewards.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-8 rounded-full"></div>
            </div>
          </ScrollAnimateWrapper>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-20" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <ScrollAnimateWrapper key={stat.id} animation="scale-in" delay={index * 100}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
                    </svg>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {stat.label}
                  </div>
                </div>
              </ScrollAnimateWrapper>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div id="mission-section" className="relative py-20" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimateWrapper animation="slide-in-left" delay={0}>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                  Our Mission
                </h2>
                <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                  We are an online contest management platform designed to connect participants with exciting contests and real rewards. Our goal is to make competitions fair, transparent, and accessible to everyone.
                </p>
                <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
                  Our mission is to provide a secure and engaging platform where users can showcase their skills, participate confidently, and win genuine prizes. We believe in fostering creativity, innovation, and healthy competition.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={handleJoinCommunity}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                    aria-label={user ? 'Explore available contests' : 'Join our community to participate'}
                  >
                    {user ? 'Explore Contests' : 'Join Our Community'}
                  </button>
                  <button 
                    onClick={scrollToMission}
                    className={`border-2 font-semibold px-8 py-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50 ${
                      isDark 
                        ? 'border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-400' 
                        : 'border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                    }`}
                    aria-label="Learn more about our mission"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </ScrollAnimateWrapper>

            <ScrollAnimateWrapper animation="slide-in-right" delay={200}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                  alt="Team collaboration"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-blue-500/20 to-transparent"></div>
              </div>
            </ScrollAnimateWrapper>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="relative py-20" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimateWrapper animation="fade-in-up" delay={0}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                Our Core Values
              </h2>
              <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                The principles that guide everything we do and shape our platform's culture
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-6 rounded-full"></div>
            </div>
          </ScrollAnimateWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <ScrollAnimateWrapper key={value.id} animation="bounce-in-up" delay={index * 150}>
                <div className={`group relative backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border text-center ${
                  isDark 
                    ? 'bg-slate-800/80 border-gray-700/50 hover:border-blue-500/50' 
                    : 'bg-white/80 border-gray-200/50 hover:border-blue-300/50'
                }`}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mx-auto mb-6`}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={value.icon} />
                    </svg>
                  </div>
                  <h3 className={`text-xl font-bold mb-4 group-hover:text-blue-600 transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    {value.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {value.description}
                  </p>
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
                </div>
              </ScrollAnimateWrapper>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="relative py-20" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimateWrapper animation="fade-in-up" delay={0}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                Meet Our Team
              </h2>
              <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                Passionate individuals dedicated to creating the best contest experience for our community
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-6 rounded-full"></div>
            </div>
          </ScrollAnimateWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <ScrollAnimateWrapper key={member.id} animation="fade-in-up" delay={index * 150}>
                <div className={`group relative backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border text-center ${
                  isDark 
                    ? 'bg-slate-800/80 border-gray-700/50 hover:border-blue-500/50' 
                    : 'bg-white/80 border-gray-200/50 hover:border-blue-300/50'
                }`}>
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover shadow-lg group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        // First fallback: Try a different Unsplash image
                        if (!e.target.dataset.fallback) {
                          e.target.dataset.fallback = "1";
                          const fallbackImages = [
                            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                            "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                          ];
                          e.target.src = fallbackImages[member.id - 1] || fallbackImages[0];
                        } else if (e.target.dataset.fallback === "1") {
                          // Second fallback: Use UI Avatars service
                          e.target.dataset.fallback = "2";
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=96&background=3b82f6&color=ffffff&bold=true`;
                        } else {
                          // Final fallback: Use a simple colored circle with initials
                          e.target.style.display = 'none';
                          const fallbackDiv = document.createElement('div');
                          fallbackDiv.className = 'w-24 h-24 rounded-full mx-auto bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300';
                          fallbackDiv.textContent = member.name.split(' ').map(n => n[0]).join('');
                          e.target.parentNode.insertBefore(fallbackDiv, e.target);
                        }
                      }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    {member.name}
                  </h3>
                  
                  <p className="text-blue-600 font-semibold mb-4">
                    {member.role}
                  </p>
                  
                  <p className={`text-sm leading-relaxed mb-6 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {member.bio}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-6 justify-center">
                    {member.skills.map((skill) => (
                      <span 
                        key={skill}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isDark 
                            ? 'bg-blue-500/20 text-blue-300' 
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* LinkedIn Link */}
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-110 shadow-lg"
                    title={`Connect with ${member.name} on LinkedIn`}
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>

                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </ScrollAnimateWrapper>
            ))}
          </div>
        </div>
      </div>

      {/* What Makes Us Different Section */}
      <div className="relative py-20" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimateWrapper animation="fade-in-up" delay={0}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                What Makes Us Different
              </h2>
              <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                Discover the unique features and benefits that set ChallengeHive apart from other contest platforms
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-6 rounded-full"></div>
            </div>
          </ScrollAnimateWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Fair & Transparent Winner Selection",
                description: "Our advanced algorithms ensure completely fair and transparent winner selection processes. Every participant has an equal opportunity to win.",
                icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              },
              {
                title: "Easy Contest Participation",
                description: "Simple, intuitive interface makes it easy for anyone to participate in contests. No complex procedures or confusing steps.",
                icon: "M13 10V3L4 14h7v7l9-11h-7z"
              },
              {
                title: "Secure Payment System",
                description: "Industry-standard security measures protect all transactions. Your financial information is always safe and secure with us.",
                icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              },
              {
                title: "Real Winners, Real Rewards",
                description: "We guarantee genuine prizes and timely reward distribution. Our track record speaks for itself with thousands of satisfied winners.",
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              }
            ].map((feature, index) => (
              <ScrollAnimateWrapper key={index} animation="slide-in-up" delay={index * 150}>
                <div className={`group relative backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border ${
                  isDark 
                    ? 'bg-slate-800/80 border-gray-700/50 hover:border-blue-500/50' 
                    : 'bg-white/80 border-gray-200/50 hover:border-blue-300/50'
                }`}>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon} />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300 ${
                        isDark ? 'text-white' : 'text-gray-800'
                      }`}>
                        {feature.title}
                      </h3>
                      <p className={`leading-relaxed ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </ScrollAnimateWrapper>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <ScrollAnimateWrapper animation="fade-in-up" delay={0}>
        <div className="relative py-20" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className={`backdrop-blur-sm rounded-3xl p-12 shadow-2xl border ${
              isDark 
                ? 'bg-slate-800/80 border-gray-700/50' 
                : 'bg-white/80 border-gray-200/50'
            }`}>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-8 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                Ready to Start Your Journey?
              </h3>
              <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
                Join thousands of participants who have already discovered their potential through our contests. 
                Your next big win could be just one click away!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleExploreContests}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                  aria-label="Explore all available contests"
                >
                  <span className="flex items-center space-x-2">
                    <span>Explore Contests</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
                <button 
                  onClick={handleContactUs}
                  className={`border-2 font-semibold px-8 py-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50 ${
                    isDark 
                      ? 'border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-400' 
                      : 'border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                  }`}
                  aria-label="Contact us via WhatsApp"
                >
                  <span className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                    </svg>
                    <span>Contact Us</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimateWrapper>

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 focus:outline-none focus:ring-4 focus:ring-blue-500/50 animate-bounce-in ${
            isDark ? 'shadow-blue-500/25' : 'shadow-blue-500/20'
          }`}
          title="Scroll to top"
          aria-label="Scroll to top of page"
        >
          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default AboutUs;
