import { useState } from "react";
import ScrollAnimateWrapper from "../ScrollAnimateWrapper/ScrollAnimateWrapper";
import { useTheme } from "../../contexts/ThemeContext";

const Blog = () => {
  const { isDark } = useTheme();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showArticleModal, setShowArticleModal] = useState(false);

  // Smooth scroll to articles section
  const scrollToArticles = () => {
    const articlesSection = document.getElementById('articles-section');
    if (articlesSection) {
      articlesSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Handle newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
      setEmail("");
      // Simulate API call
      setTimeout(() => {
        alert(`Thank you for subscribing with ${email}! You'll receive our latest contest tips and updates.`);
        setIsSubscribed(false);
      }, 1000);
    } else {
      alert('Please enter a valid email address.');
    }
  };

  // Handle article reading
  const handleReadArticle = (article) => {
    setSelectedArticle(article);
    setShowArticleModal(true);
  };

  // Close article modal
  const closeArticleModal = () => {
    setShowArticleModal(false);
    setSelectedArticle(null);
  };

  // Handle tip click
  const handleTipClick = (tip) => {
    alert(`Tip ${tip.id}: ${tip.text}\n\nThis tip will help you improve your contest performance. Would you like to learn more about contest strategies?`);
  };

  const blogPosts = [
    {
      id: 1,
      title: "Mastering Contest Strategy: A Complete Guide",
      excerpt: "Learn the essential strategies that separate winners from participants. Discover time management techniques, problem-solving approaches, and mental preparation methods.",
      category: "Strategy",
      readTime: "8 min read",
      date: "Jan 15, 2025",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      tags: ["Strategy", "Tips", "Winning"]
    },
    {
      id: 2,
      title: "The Psychology of Competition: Mental Preparation",
      excerpt: "Understand the mental aspects of competitive programming and contests. Learn how to manage pressure, maintain focus, and develop a winning mindset.",
      category: "Psychology",
      readTime: "6 min read",
      date: "Jan 12, 2025",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80",
      tags: ["Psychology", "Mindset", "Focus"]
    },
    {
      id: 3,
      title: "Building Your Contest Portfolio: Showcase Your Skills",
      excerpt: "Create an impressive portfolio that highlights your contest achievements. Learn how to document your journey and attract potential opportunities.",
      category: "Career",
      readTime: "10 min read",
      date: "Jan 10, 2025",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80",
      tags: ["Portfolio", "Career", "Skills"]
    },
    {
      id: 4,
      title: "Advanced Problem-Solving Techniques",
      excerpt: "Dive deep into advanced algorithms and data structures. Master the techniques used by top contestants in competitive programming.",
      category: "Technical",
      readTime: "12 min read",
      date: "Jan 8, 2025",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
      tags: ["Algorithms", "Programming", "Advanced"]
    },
    {
      id: 5,
      title: "Community Building: Learning from Others",
      excerpt: "Discover the power of community in contest preparation. Learn how to collaborate, share knowledge, and grow together with fellow contestants.",
      category: "Community",
      readTime: "7 min read",
      date: "Jan 5, 2025",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: ["Community", "Collaboration", "Learning"]
    },
    {
      id: 6,
      title: "From Beginner to Expert: Your Contest Journey",
      excerpt: "A comprehensive roadmap for contest participants at every level. Track your progress and set meaningful goals for continuous improvement.",
      category: "Guide",
      readTime: "15 min read",
      date: "Jan 3, 2025",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      tags: ["Journey", "Progress", "Goals"]
    }
  ];

  const tips = [
    { id: 1, text: "Understand the Rules Clearly", icon: "M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.824-2.562" },
    { id: 2, text: "Manage Your Time Wisely", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { id: 3, text: "Practice Before Participating", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
    { id: 4, text: "Focus on Quality Over Quantity", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
  ];

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ background: 'var(--bg-primary)' }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background with theme-aware overlay */}
        <div 
          className="h-[90vh] bg-cover bg-center bg-fixed relative"
          style={{
            backgroundImage: `${isDark 
              ? 'linear-gradient(to right, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.85))' 
              : 'linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4))'
            }, url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')`
          }}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-32 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-32 left-40 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center max-w-5xl mx-auto px-4">
              <ScrollAnimateWrapper animation="fade-in-down" delay={0}>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  Welcome to{' '}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    ChallengeHive
                  </span>
                </h1>
              </ScrollAnimateWrapper>
              
              <ScrollAnimateWrapper animation="fade-in-up" delay={300}>
                <p className="text-lg md:text-2xl text-gray-200 font-medium leading-relaxed mb-8 max-w-4xl mx-auto">
                  Discover insights, strategies, and stories from the world of competitive contests. 
                  Learn from experts, share experiences, and elevate your contest performance.
                </p>
              </ScrollAnimateWrapper>

              <ScrollAnimateWrapper animation="scale-in" delay={600}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button 
                    onClick={scrollToArticles}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="flex items-center space-x-2">
                      <span>Explore Articles</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </span>
                  </button>
                  <button 
                    onClick={() => {
                      const newsletterSection = document.getElementById('newsletter-section');
                      if (newsletterSection) {
                        newsletterSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-all duration-300"
                  >
                    Subscribe to Newsletter
                  </button>
                </div>
              </ScrollAnimateWrapper>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Section */}
      <div id="articles-section" className="relative py-20 overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl ${
            isDark ? 'bg-gradient-to-br from-blue-400/5 to-purple-400/5' : 'bg-gradient-to-br from-blue-400/10 to-purple-400/10'
          }`}></div>
          <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl ${
            isDark ? 'bg-gradient-to-br from-purple-400/5 to-pink-400/5' : 'bg-gradient-to-br from-purple-400/10 to-pink-400/10'
          }`}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <ScrollAnimateWrapper animation="fade-in-up" delay={0}>
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg shadow-blue-500/25">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Latest Articles
              </h2>
              <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                Insights, tips, and strategies to help you excel in contests
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-6 rounded-full"></div>
            </div>
          </ScrollAnimateWrapper>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {blogPosts.map((post, index) => (
              <ScrollAnimateWrapper 
                key={post.id}
                animation="fade-in-up" 
                delay={index * 100}
              >
                <article className={`group relative backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border overflow-hidden flex flex-col h-full ${
                  isDark 
                    ? 'bg-slate-800/80 border-gray-700/50 hover:border-blue-500/50' 
                    : 'bg-white/80 border-gray-200/50 hover:border-blue-300/50'
                }`}>
                  {/* Post Image */}
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      {post.category}
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center space-x-4 mb-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <span className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{post.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    <h3 className={`text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300 ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}>
                      {post.title}
                    </h3>
                    
                    <p className={`text-sm leading-relaxed mb-4 ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`} style={{ 
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag) => (
                        <span 
                          key={tag}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            isDark 
                              ? 'bg-blue-500/20 text-blue-300' 
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Spacer to push button to bottom */}
                    <div className="flex-grow"></div>

                    {/* Read More Button - Always at bottom */}
                    <button 
                      onClick={() => handleReadArticle(post)}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <span className="flex items-center justify-center space-x-2">
                        <span>Read Article</span>
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </button>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </article>
              </ScrollAnimateWrapper>
            ))}
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="relative py-20 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimateWrapper animation="fade-in-up" delay={0}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Champion Tips
              </h2>
              <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                Essential strategies to elevate your contest performance
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-6 rounded-full"></div>
            </div>
          </ScrollAnimateWrapper>

          {/* Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tips.map((tip, index) => (
              <ScrollAnimateWrapper 
                key={tip.id}
                animation="bounce-in-up" 
                delay={index * 150}
              >
                <div 
                  onClick={() => handleTipClick(tip)}
                  className={`group relative backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border text-center cursor-pointer ${
                    isDark 
                      ? 'bg-slate-800/80 border-gray-700/50 hover:border-blue-500/50' 
                      : 'bg-white/80 border-gray-200/50 hover:border-blue-300/50'
                  }`}
                >
                  {/* Step Number */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {tip.id}
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-6 mt-2">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tip.icon} />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className={`text-lg font-bold group-hover:text-blue-600 transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    {tip.text}
                  </h3>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </ScrollAnimateWrapper>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <ScrollAnimateWrapper animation="fade-in-up" delay={0}>
        <div id="newsletter-section" className="relative py-20" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className={`backdrop-blur-sm rounded-3xl p-12 shadow-2xl border ${
              isDark 
                ? 'bg-slate-800/80 border-gray-700/50' 
                : 'bg-white/80 border-gray-200/50'
            }`}>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-8 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Stay Updated
              </h3>
              <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
                Get the latest contest tips, strategies, and announcements delivered to your inbox
              </p>
              
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className={`flex-1 px-6 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                    isDark 
                      ? 'bg-slate-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
                <button 
                  type="submit"
                  disabled={isSubscribed}
                  className={`font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                    isSubscribed 
                      ? 'bg-green-500 text-white cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                  }`}
                >
                  {isSubscribed ? (
                    <span className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Subscribed!</span>
                    </span>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </ScrollAnimateWrapper>

      {/* Article Modal */}
      {showArticleModal && selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className={`relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${
            isDark ? 'bg-slate-800' : 'bg-white'
          }`}>
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b" style={{ 
              background: isDark ? '#1e293b' : '#ffffff',
              borderColor: 'var(--border-primary)'
            }}>
              <div className="flex items-center space-x-4">
                <div className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  {selectedArticle.category}
                </div>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {selectedArticle.readTime}
                </span>
              </div>
              <button
                onClick={closeArticleModal}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
                }`}
              >
                <svg className="w-6 h-6" style={{ color: 'var(--text-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                {selectedArticle.title}
              </h1>
              
              <div className="flex items-center space-x-4 mb-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{selectedArticle.date}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{selectedArticle.readTime}</span>
                </span>
              </div>

              <div className="prose max-w-none" style={{ color: 'var(--text-primary)' }}>
                <p className="text-lg leading-relaxed mb-6">
                  {selectedArticle.excerpt}
                </p>
                
                <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  <p>
                    This comprehensive guide will walk you through the essential strategies and techniques that can significantly improve your contest performance. Whether you're a beginner looking to get started or an experienced participant aiming to reach the next level, these insights will prove invaluable.
                  </p>
                  
                  <p>
                    Contest success isn't just about technical skills—it's about developing the right mindset, managing your time effectively, and understanding the nuances of competitive environments. Throughout this article, we'll explore proven methodologies that top performers use to consistently achieve excellent results.
                  </p>
                  
                  <p>
                    From preparation strategies to execution techniques, we'll cover everything you need to know to maximize your potential and achieve your contest goals. Remember, every expert was once a beginner, and with the right approach, you can develop the skills needed to excel.
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                {selectedArticle.tags.map((tag) => (
                  <span 
                    key={tag}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isDark 
                        ? 'bg-blue-500/20 text-blue-300' 
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
