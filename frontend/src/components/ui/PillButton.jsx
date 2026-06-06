import React from 'react';

const PillButton = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2";
  const variants = {
    primary: "bg-accent-blue text-white hover:opacity-90 shadow-lg",
    accent: "bg-white text-navy hover:bg-gray-100 shadow-glow",
    outline: "bg-transparent text-white border border-white/20 hover:bg-white/5 shadow-sm"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default PillButton;