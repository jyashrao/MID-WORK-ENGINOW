import React from 'react';

const GlassCard = ({ children, className = '' }) => {
  return (
    <div className={`bg-white/90 backdrop-blur-xl rounded-3xl shadow-soft border border-gray-100 p-6 ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;