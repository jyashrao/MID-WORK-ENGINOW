import React from 'react';

/**
 * Skeleton component for loading states.
 * Follows the "grey placeholder shapes" and "animate shimmer" spec from Research PDF Section G.
 */
const Skeleton = ({ className = '', variant = 'rect' }) => {
  // We use animate-pulse from Tailwind as the base shimmer effect
  const baseStyles = "bg-gray-200 animate-pulse";
  
  const variants = {
    rect: "rounded-lg",
    circle: "rounded-full",
    text: "rounded h-4 w-full",
    card: "rounded-3xl h-64", // Matches the rounded-3xl of your GlassCard
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} />
  );
};

/**
 * Pre-built Course Card Skeleton to match your Course.jsx component
 */
export const CourseCardSkeleton = () => (
  <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-white/40 shadow-soft w-[330px] h-[380px] flex flex-col">
    <Skeleton variant="rect" className="w-full aspect-video rounded-2xl mb-6 shrink-0" />
    <div className="flex-grow space-y-3">
      <Skeleton variant="text" className="w-3/4 h-6" />
      <Skeleton variant="text" className="w-1/2 h-4" />
    </div>
    <div className="flex justify-between items-center mt-auto pt-4 border-t border-black/5">
      <Skeleton variant="text" className="w-20" />
      <Skeleton variant="text" className="w-16" />
    </div>
  </div>
);

/**
 * Pre-built List Skeleton for sidebars or search results
 */
export const ListSkeleton = () => (
  <div className="space-y-4 w-full">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl border border-white/40">
        <Skeleton variant="circle" className="w-12 h-12 shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="w-1/3" />
          <Skeleton variant="text" className="w-1/4" />
        </div>
      </div>
    ))}
  </div>
);

export default Skeleton;
