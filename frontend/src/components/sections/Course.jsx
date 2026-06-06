import React, { useState, useEffect } from 'react';
import GlassCard from '../ui/GlassCard';
import PillButton from '../ui/PillButton';
import { Clock, Star, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { CourseCardSkeleton } from '../ui/Skeleton';

const fallbackCourses = [
  { id: 'dummy-1', title: 'Data Structures & Algorithms', instructor: 'Rahul M.', duration: '40 Hrs', rating: 4.8, tag: 'Bestseller' },
  { id: 'dummy-2', title: 'Full Stack MERN Bootcamp', instructor: 'Priya K.', duration: '60 Hrs', rating: 4.9, tag: 'New' },
  { id: 'dummy-3', title: 'Operating Systems Mastery', instructor: 'Amit S.', duration: '25 Hrs', rating: 4.7, tag: null },
  { id: 'dummy-4', title: 'Gen AI', instructor: 'Amit S.', duration: '30 Hrs', rating: 4.8, tag: 'Bestseller' },
  { id: 'dummy-5', title: 'MLOps', instructor: 'Rahul M.', duration: '40 Hrs', rating: 4.7, tag: null },
  { id: 'dummy-6', title: 'Data Analysis', instructor: 'Priya K.', duration: '35 Hrs', rating: 4.8, tag: null },
];

const Course = ({ dbCourses, isLoading }) => {
  const courses = dbCourses && dbCourses.length > 0 ? dbCourses : fallbackCourses;
  const displayCourses = courses.slice(0, 6);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || isLoading) return; 
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % displayCourses.length);
    }, 3000);   
    return () => clearInterval(timer);
  }, [displayCourses.length, isHovered, isLoading]); 

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % displayCourses.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + displayCourses.length) % displayCourses.length);

  const getCardStyles = (index) => {
    const total = displayCourses.length;
    let diff = index - activeIndex;
    if (diff > Math.floor(total / 2)) diff -= total;
    if (diff < -Math.floor(total / 2)) diff += total;

    if (diff === 0) return { x: "0%", scale: 1.05, opacity: 1, zIndex: 30 };
    if (diff === 1) return { x: "105%", scale: 0.85, opacity: 0.4, zIndex: 20 };
    if (diff === -1) return { x: "-105%", scale: 0.85, opacity: 0.4, zIndex: 20 };
    return { x: diff > 0 ? "200%" : "-200%", scale: 0.5, opacity: 0, zIndex: 10 };
  };

  return (
    <section id="courses" className="py-20 max-w-[100vw] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h2 className="text-4xl font-extrabold mb-3 text-text-main">Trending Courses</h2>
        <p className="text-text-muted text-lg">Master the most in-demand tech skills.</p>
      </div>

      <div 
        className="relative w-full max-w-7xl mx-auto h-[450px] flex justify-center items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button onClick={prevSlide} className="absolute left-4 md:left-12 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-navy/40 backdrop-blur-md border border-white/10 shadow-soft hover:bg-navy/60 hover:scale-110 transition-all text-text-main">
          <ChevronLeft size={24} />
        </button>

        <button onClick={nextSlide} className="absolute right-4 md:right-12 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-navy/40 backdrop-blur-md border border-white/10 shadow-soft hover:bg-navy/60 hover:scale-110 transition-all text-text-main">
          <ChevronRight size={24} />
        </button>

        {isLoading ? (
          <div className="flex gap-8 items-center justify-center w-full overflow-hidden">
             {[1, 2, 3].map(i => <CourseCardSkeleton key={i} />)}
          </div>
        ) : (
          displayCourses.map((course, index) => (
            <motion.div key={course.id || course._id} transition={{ duration: 0.6, ease: "easeInOut" }} animate={getCardStyles(index)} className="absolute w-[80%] md:w-[330px] h-[380px]">
              <GlassCard className="flex flex-col h-full p-6 w-full shadow-xl bg-white border-gray-100">
                <div className="w-full aspect-video bg-gradient-to-br from-accent-blue/10 to-gray-50 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center text-3xl font-bold text-accent-blue/5 shrink-0">
                  {course.image ? (
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  ) : (
                    course.title.split(' ')[0]
                  )}
                  {course.tag && <span className="absolute top-4 left-4 bg-accent-blue/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm text-white">{course.tag}</span>}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-2 line-clamp-2 leading-tight text-text-main">{course.title}</h3>
                  <p className="text-sm text-text-muted mb-4 font-medium">Instructor: {course.instructor}</p>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 text-sm font-bold text-text-muted">
                    <span className="flex items-center gap-1"><Clock size={16} className="text-accent-blue" /> {course.duration}</span>
                    <span className="flex items-center gap-1 text-yellow-500"><Star size={16} fill="currentColor" /> {course.rating}</span>
                </div>
              </GlassCard>
            </motion.div>
          ))  
        )}
      </div>

      <div className="mt-8 flex justify-center relative z-20">
        <PillButton variant="outline" className="px-8 py-3 bg-white/5 hover:bg-accent-blue text-text-main group font-bold">
          Explore All Courses <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform ml-2" />
        </PillButton>
      </div>
    </section>
  );
};

export default Course;