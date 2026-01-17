import { Outlet } from "react-router";
import { useTheme } from "../../../contexts/ThemeContext";

const AuthLayout = () => {
  const { isDark } = useTheme();
  
  return (
    <div className="min-h-screen transition-colors duration-300" style={{ background: 'var(--bg-primary)' }}>
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl ${
          isDark ? 'bg-gradient-to-br from-blue-400/10 to-purple-400/10' : 'bg-gradient-to-br from-blue-400/20 to-purple-400/20'
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl ${
          isDark ? 'bg-gradient-to-br from-purple-400/10 to-pink-400/10' : 'bg-gradient-to-br from-purple-400/20 to-pink-400/20'
        }`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl ${
          isDark ? 'bg-gradient-to-br from-cyan-400/5 to-blue-400/5' : 'bg-gradient-to-br from-cyan-400/10 to-blue-400/10'
        }`}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
