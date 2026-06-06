import React from 'react';
import { Link } from 'react-router-dom'; // 1. Imported Link from React Router
import PillButton from '../ui/PillButton';
import { Settings } from 'lucide-react'; 

const Navbar = () => {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[96%] max-w-7xl z-50">
      
      <div className="bg-white backdrop-blur-lg rounded-full shadow-soft px-8 py-2.5 flex items-center justify-between border border-white/10  transition-colors duration-300">
        
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          {/* Logo with the Settings icon you imported */}
          <Settings className="text-accent-blue" size={24} />
          <span>Enginow</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 font-medium text-text-muted">
          <a href="#courses" className="hover:text-text-main transition-colors">Courses</a>
          <a href="#internships" className="hover:text-text-main transition-colors">Internships</a>
          <a href="#resources" className="hover:text-text-main transition-colors">Resources</a>
        </div>

        <div className="flex items-center gap-4">
          
          {localStorage.getItem('token') ? (
            <Link to="/dashboard">
              <div className="w-10 h-10 rounded-full bg-accent-blue text-white flex items-center justify-center font-bold text-sm cursor-pointer hover:shadow-md transition-shadow">
                {JSON.parse(localStorage.getItem('userInfo'))?.name?.charAt(0) || 'S'}
              </div>
            </Link>
          ) : (
            <>
              {/* Temporarily redirecting directly to dashboard for demo */}
              <Link to="/dashboard">
                <button className="font-semibold text-text-main hover:text-accent-blue transition-colors">
                  Login
                </button>
              </Link>

              <Link to="/dashboard">
                <PillButton variant="primary">Sign Up</PillButton>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;