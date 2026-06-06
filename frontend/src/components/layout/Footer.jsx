import React from 'react';
import PillButton from '../ui/PillButton';
import { MapPin, Phone, Mail, ArrowRight, Settings } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full max-w-7xl mx-auto px-4 md:px-6 pb-6 mt-32 relative z-10">
      {/* The Floating Glassmorphism Container */}
      <div className="bg-white border border-gray-100 rounded-[2.5rem] md:rounded-[3rem] shadow-soft overflow-hidden relative p-8 md:p-12 lg:p-16">
        
        {/* Subtle inner glow for the glass effect */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-blue/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

        {/* Top Section: Integrated Newsletter CTA */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-12 border-b border-gray-50 relative z-10">
          <div className="max-w-lg">
            <h3 className="text-3xl md:text-4xl font-extrabold text-text-main mb-3 tracking-tight">
              Ready to accelerate <br/> your career?
            </h3>
            <p className="text-text-muted text-lg">
              Join our newsletter for exclusive resources, bootcamp invites, and placement updates.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
            <input 
              type="email" 
              placeholder="Enter your email address..." 
              className="px-6 py-4 rounded-full bg-gray-50 border border-gray-100 focus:outline-none focus:border-accent-blue focus:ring-4 focus:ring-accent-blue/10 transition-all w-full sm:w-80 shadow-sm text-text-main placeholder:text-text-muted font-medium"
            />
            <PillButton variant="primary" className="shrink-0 py-4 px-8">
              Subscribe <ArrowRight size={18} />
            </PillButton>
          </div>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 py-12 relative z-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 pr-0 lg:pr-8">
            <div className="flex items-center gap-2 font-bold text-2xl tracking-tight mb-4 text-text-main">
              {/* Logo */}
              <span>Enginow</span>
            </div>
            <p className="text-text-muted font-medium mb-8 leading-relaxed">
              The smarter, more connected way for CS & IT students to learn, track progress, and thrive in the tech industry.
            </p>
            
            <div className="space-y-4 text-sm font-medium text-text-main">
              <div className="flex items-start gap-3 hover:text-accent-blue transition-colors cursor-pointer">
                <MapPin size={18} className="text-accent-blue shrink-0" />
                <span>Noida, Uttar Pradesh 201301</span>
              </div>
              <div className="flex items-center gap-3 hover:text-accent-blue transition-colors cursor-pointer">
                <Phone size={18} className="text-accent-blue shrink-0" />
                <span>+91 89350 69570</span>
              </div>
              <div className="flex items-center gap-3 hover:text-accent-blue transition-colors cursor-pointer">
                <Mail size={18} className="text-accent-blue shrink-0" />
                <span>contact@enginow.in</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-text-main mb-6 text-lg">Platform</h4>
            <ul className="space-y-4 text-sm font-medium text-text-muted">
              <li><a href="#" className="hover:text-text-main transition-colors">All Courses</a></li>
              <li><a href="#" className="hover:text-text-main transition-colors">Job Bootcamps</a></li>
              <li><a href="#" className="hover:text-text-main transition-colors">Internship Board</a></li>
              <li><a href="#" className="hover:text-text-main transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-text-main transition-colors">Pricing & Plans</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-text-main mb-6 text-lg">Company</h4>
            <ul className="space-y-4 text-sm font-medium text-text-muted">
              <li><a href="#" className="hover:text-text-main transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-text-main transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-text-main transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-text-main transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-text-main transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Free Resources (Redesigned from chunky cards to sleek glass pills) */}
          <div className="lg:col-span-4">
            <h4 className="font-bold text-text-main mb-6 text-lg">Free Resources</h4>
            <div className="flex flex-col gap-3">
              <a href="#" className="flex flex-col p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-gray-100 hover:shadow-md transition-all group">
                <span className="font-bold text-sm text-text-main group-hover:text-accent-blue transition-colors">DSA Cheat Sheet</span>
                <span className="text-xs text-text-muted mt-1">Quick-reference algorithms & data structures</span>
              </a>
              <a href="#" className="flex flex-col p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-gray-100 hover:shadow-md transition-all group">
                <span className="font-bold text-sm text-text-main group-hover:text-accent-blue transition-colors">Operating Systems Notes</span>
                <span className="text-xs text-text-muted mt-1">Core concepts explained simply</span>
              </a>
              <a href="#" className="flex flex-col p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-gray-100 hover:shadow-md transition-all group">
                <span className="font-bold text-sm text-text-main group-hover:text-accent-blue transition-colors">DBMS Practice Set</span>
                <span className="text-xs text-text-muted mt-1">SQL queries and normalization exercises</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <p className="text-sm font-medium text-text-muted">© 2026 Enginow. All rights reserved.</p>
          
          <div className="flex items-center gap-6 text-sm font-bold text-text-muted">
            <a href="#" className="hover:text-text-main transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-text-main transition-colors">Instagram</a>
            <a href="#" className="hover:text-text-main transition-colors">YouTube</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;