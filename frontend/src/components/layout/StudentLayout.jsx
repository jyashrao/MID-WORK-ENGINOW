import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, Bell, LayoutDashboard, PlayCircle, 
  Briefcase, Edit3, Folder, LogOut, LifeBuoy 
} from 'lucide-react';

const StudentLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;
  
  // Safe parsing of userInfo
  let userInfo = {};
  try {
    userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  } catch (e) {
    console.error("Failed to parse userInfo", e);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex transition-colors duration-300 relative overflow-hidden">
      
      {/* Ambient Background Glows */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[100px] -translate-x-1/4 -translate-y-1/4 pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-accent-blue/5 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4 pointer-events-none z-0" />

      {/* ==========================================
          LEFT SIDEBAR (Fixed)
          ========================================== */}
      <aside className="w-64 bg-white fixed h-screen flex flex-col z-50 border-r border-gray-100 transition-colors duration-300">
        {/* Logo Area */}
        <div className="h-20 flex items-center px-8 border-b border-gray-100">
          <Link to="/" className="font-extrabold text-2xl tracking-tight text-text-main">Enginow</Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto relative z-10">
          <p className="px-4 text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Menu</p>
          
          <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive('/dashboard') ? 'bg-accent-blue/10 text-accent-blue' : 'text-text-muted hover:bg-gray-50 hover:text-text-main'}`}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-text-muted hover:bg-gray-50 hover:text-text-main rounded-xl font-medium transition-all">
            <PlayCircle size={20} /> My Courses
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-text-muted hover:bg-gray-50 hover:text-text-main rounded-xl font-medium transition-all">
            <Briefcase size={20} /> Internships
          </a>
          
          <p className="px-4 text-xs font-bold text-text-muted uppercase tracking-wider mt-8 mb-4">System</p>
          
          <Link to="/support" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive('/support') ? 'bg-accent-blue/10 text-accent-blue' : 'text-text-muted hover:bg-gray-50 hover:text-text-main'}`}>
            <LifeBuoy size={20} /> Support Center
          </Link>
          
          <p className="px-4 text-xs font-bold text-text-muted uppercase tracking-wider mt-8 mb-4">Community</p>
          
          <a href="#" className="flex items-center justify-between px-4 py-3 text-text-muted hover:bg-gray-50 hover:text-text-main rounded-xl font-medium transition-all group">
            <div className="flex items-center gap-3">
              <Edit3 size={20} /> Student Blog
            </div>
            <span className="text-[10px] bg-accent-blue text-white px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">Write</span>
          </a>
          
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-text-muted hover:bg-gray-50 hover:text-text-main rounded-xl font-medium transition-all">
            <Folder size={20} /> Resources
          </a>
        </nav>

        {/* Bottom Logout */}
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-text-muted hover:bg-red-50 hover:text-red-500 rounded-xl font-medium transition-all cursor-pointer"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* ==========================================
          MAIN CONTENT AREA (Right Side)
          ========================================== */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen relative z-10">
        
        {/* Top Navbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 px-8 flex items-center justify-between transition-colors duration-300">
          
          {/* Search Bar */}
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Search courses, blogs, internships..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-transparent focus:bg-white focus:border-accent-blue/40 rounded-full text-sm font-medium text-text-main transition-all outline-none placeholder:text-text-muted"
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-4 text-sm font-bold text-text-muted">
              <a href="#" className="hover:text-text-main">Get App</a>
              <a href="#" className="hover:text-text-main">Community</a>
            </div>
            
            <div className="h-6 w-px bg-gray-100"></div> {/* Divider */}

            <button className="relative text-text-muted hover:text-text-main transition-colors">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            {/* User Profile Avatar */}
            <div className="flex items-center gap-3">
              <span className="hidden lg:block text-sm font-bold text-text-main">
                {userInfo.name || 'Student'}
              </span>
              {userInfo.picture ? (
                <img src={userInfo.picture} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-white/20 shadow-sm" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-accent-blue text-white flex items-center justify-center font-bold text-lg cursor-pointer hover:shadow-md transition-shadow">
                  {userInfo.name?.charAt(0) || 'S'}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* The dynamic page content gets injected here */}
        <main className="flex-1 p-8">
          {children}
        </main>

      </div>
    </div>
  );
};

export default StudentLayout;
