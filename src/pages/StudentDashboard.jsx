import React, { useRef, useState, useEffect } from 'react';
import StudentLayout from '../components/layout/StudentLayout';
import GlassCard from '../components/ui/GlassCard';
import PillButton from '../components/ui/PillButton';
import { 
  Play, ChevronLeft, ChevronRight, Clock, Star, 
  Briefcase, Award, Check, X, FileText 
} from 'lucide-react';
import Skeleton, { CourseCardSkeleton } from '../components/ui/Skeleton';
import toast, { Toaster } from 'react-hot-toast';
import { fetchCourses, fetchInternships, fetchMyOffers, fetchMyCertificates, fetchUserProfile } from '../services/api';
import LearningRoadmap from '../components/sections/LearningRoadmap';

const StudentDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([
    { _id: '1', title: 'Data Structures & Algorithms', instructor: 'Rahul M.', duration: '40 Hrs', rating: 4.8, tag: 'Bestseller', category: 'DSA', image: '/thumbnail/DSA.png' },
    { _id: '2', title: 'Full Stack MERN Bootcamp', instructor: 'Priya K.', duration: '60 Hrs', rating: 4.9, tag: 'New', category: 'Web Development', image: '/thumbnail/Full_Stack.png' },
    { _id: '3', title: 'Operating Systems Mastery', instructor: 'Amit S.', duration: '25 Hrs', rating: 4.7, tag: null, category: 'Core Engineering', image: '/thumbnail/OS_Mastery.png' },
    { _id: '4', title: 'Gen AI with JS', instructor: 'Jeet B.', duration: '30 Hrs', rating: 4.8, tag: 'Bestseller', category: 'AI', image: '/thumbnail/GenAI_JS.png' },
    { _id: '5', title: 'MLOps Engineering', instructor: 'Rahul M.', duration: '40 Hrs', rating: 4.7, tag: null, category: 'AI', image: '/thumbnail/MLOps.png' },
    { _id: '6', title: 'System Design', instructor: 'Amit S.', duration: '35 Hrs', rating: 4.9, tag: 'New', category: 'Core Engineering', image: '/thumbnail/System_Design.png' }
  ]);
  const [internships, setInternships] = useState([
    { _id: '1', title: 'Frontend Developer Intern', company: 'Enginow Tech', location: 'Remote', stipend: '₹10k - 15k / mo', type: 'Pre-Placement Offer', category: 'Web Development' },
    { _id: '2', title: 'AI & Data Science Intern', company: 'NextGen Solutions', location: 'Hybrid', stipend: '₹12k / mo', type: '2 Months', category: 'AI' },
    { _id: '3', title: 'Backend Engineering Intern', company: 'CloudScale', location: 'Remote', stipend: '₹15k / mo', type: '3 Months', category: 'Web Development' }
  ]);
  const [offers, setOffers] = useState([
    { _id: 'o1', role: 'Frontend Developer', company: 'Enginow Tech', stipend: '₹15k', duration: '6 Months', status: 'Sent' },
    { _id: 'o2', role: 'Backend Developer', company: 'CloudScale', stipend: '₹18k', duration: '3 Months', status: 'Accepted' }
  ]);
  const [certificates, setCertificates] = useState([
    { _id: 'c1', certificateId: 'CERT-EN-123456-789', course: { title: 'Data Structures & Algorithms' } },
    { _id: 'c2', certificateId: 'CERT-EN-987654-321', course: { title: 'Full Stack MERN Bootcamp' } }
  ]);
  const [activeProgress, setActiveProgress] = useState({
    course: { title: 'Data Structures & Algorithms', category: 'DSA', instructor: 'Rahul M.' },
    percentComplete: 45
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("Not authenticated. Please login.");
        setIsLoading(false);
        return;
      }

      try {
        const [coursesData, internshipsData, offersData, certsData, userData] = await Promise.all([
          fetchCourses(),
          fetchInternships(),
          fetchMyOffers(token),
          fetchMyCertificates(token),
          fetchUserProfile(token)
        ]);
        
        setCourses(coursesData);
        setInternships(internshipsData);
        setOffers(offersData);
        setCertificates(certsData);
        
        // Pick the most recently accessed course as the "Continue Learning" banner
        if (userData.progress && userData.progress.length > 0) {
          const sorted = [...userData.progress].sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed));
          setActiveProgress(sorted[0]);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Dashboard Load Error:", error);
        toast.error("Failed to load dashboard data");
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOfferAction = async (id, action) => {
    const token = localStorage.getItem('token');
    const loading = toast.loading(`Updating offer status...`);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/offers/${id}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ status: action })
      });
      if (!response.ok) throw new Error("Update failed");
      
      toast.success(`Offer ${action} successfully!`, { id: loading });
      setOffers(offers.map(o => o._id === id ? { ...o, status: action } : o));
    } catch (err) {
      toast.error("Failed to update offer", { id: loading });
    }
  };

  const coursesRef = useRef(null);
  const scrollLeft = (ref) => ref.current.scrollBy({ left: -400, behavior: 'smooth' });
  const scrollRight = (ref) => ref.current.scrollBy({ left: 400, behavior: 'smooth' });

  return (
    <StudentLayout>
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto space-y-12 pb-12">
        
        {/* ==========================================
            0. LEARNING ROADMAP (Quick View)
            ========================================== */}
        <div className="scale-90 -mt-10 -mb-10 origin-top opacity-80">
           <LearningRoadmap />
        </div>

        {/* ==========================================
            1. CONTINUE LEARNING BANNER
            ========================================== */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-text-main">Continue Learning</h2>
            <span className="bg-green-500 text-white text-[10px] font-black px-2 py-1 rounded-full animate-pulse">LIVE v2.0</span>
          </div>
          {isLoading ? (
            <GlassCard className="w-full p-6 flex flex-col md:flex-row gap-8 items-center bg-white border border-gray-100 shadow-sm">
              <Skeleton variant="rect" className="w-full md:w-80 aspect-video rounded-xl bg-gray-50" />
              <div className="flex-1 w-full space-y-4">
                <Skeleton variant="text" className="w-1/4 bg-gray-50" />
                <Skeleton variant="text" className="w-1/2 h-8 bg-gray-50" />
              </div>
            </GlassCard>
          ) : (
            activeProgress && activeProgress.course ? (
              <GlassCard className="w-full p-6 flex flex-col md:flex-row gap-8 items-center bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full md:w-80 aspect-video bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl relative overflow-hidden shrink-0 flex items-center justify-center group cursor-pointer">
                  <span className="text-white font-extrabold text-3xl">{activeProgress.course.category?.split(' ')[0] || 'Learn'}</span>
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <div className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center pl-1">
                      <Play className="text-white" fill="white" size={24} />
                    </div>
                  </div>
                </div>

                <div className="flex-1 w-full">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex-1">
                      <p className="text-accent-blue font-bold text-sm mb-1">Batch 1 • {activeProgress.course.category}</p>
                      <h3 className="text-3xl font-extrabold text-text-main mb-2">{activeProgress.course.title}</h3>
                      <p className="text-text-muted font-medium">Instructor: {activeProgress.course.instructor}</p>
                    </div>
                    
                    <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-50" />
                        <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={251.2} strokeDashoffset={251.2 - (251.2 * activeProgress.percentComplete) / 100} strokeLinecap="round" className="text-accent-blue transition-all duration-1000 ease-out" />
                      </svg>
                      <span className="absolute text-lg font-black text-text-main">{activeProgress.percentComplete}%</span>
                    </div>

                    <PillButton variant="primary" className="hidden md:flex">Resume Course</PillButton>
                  </div>
                </div>
              </GlassCard>
            ) : (
              <GlassCard className="w-full p-12 text-center bg-gray-50 border border-dashed border-gray-200">
                <p className="text-text-muted font-bold">You haven't started any courses yet. Start your journey below!</p>
              </GlassCard>
            )
          )}
        </section>

        {/* ==========================================
            2. MY OFFERS & CERTIFICATES
            ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section>
            <h2 className="text-2xl font-bold text-text-main mb-6 flex items-center gap-3">
              <Briefcase className="text-accent-blue" size={24} /> My Offers
            </h2>
            <div className="space-y-4">
              {isLoading ? [1, 2].map(i => <div key={i} className="h-32 bg-gray-50 rounded-2xl animate-pulse"></div>) 
              : offers.length > 0 ? offers.map(offer => (
                <GlassCard key={offer._id} className="p-5 bg-white border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-text-main">{offer.role}</h3>
                      <p className="text-sm text-text-muted">{offer.company} • {offer.stipend}</p>
                    </div>
                    <span className={`text-[10px] font-black px-2 py-1 rounded-full ${offer.status === 'Accepted' ? 'bg-green-500/20 text-green-400' : offer.status === 'Rejected' ? 'bg-red-500/20 text-red-400' : 'bg-accent-blue/20 text-accent-blue'}`}>
                      {offer.status}
                    </span>
                  </div>
                  {offer.status === 'Sent' && (
                    <div className="flex gap-2">
                      <button onClick={() => handleOfferAction(offer._id, 'Accepted')} className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-bold transition-all">Accept</button>
                      <button onClick={() => handleOfferAction(offer._id, 'Rejected')} className="flex-1 py-2 bg-gray-50 text-text-main border border-gray-100 hover:bg-gray-100 rounded-xl text-sm font-bold transition-all">Reject</button>
                    </div>
                  )}
                </GlassCard>
              )) : <p className="text-text-muted italic text-sm">No active offers.</p>}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-main mb-6 flex items-center gap-3">
              <Award className="text-accent-blue" size={24} /> Certificates
            </h2>
            <div className="space-y-4">
              {isLoading ? [1].map(i => <div key={i} className="h-32 bg-gray-50 rounded-2xl animate-pulse"></div>)
              : certificates.length > 0 ? certificates.map(cert => (
                <GlassCard key={cert._id} className="p-5 bg-white border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent-blue/10 rounded-xl flex items-center justify-center text-accent-blue"><FileText size={24} /></div>
                    <div>
                      <h3 className="font-bold text-text-main">{cert.course?.title || 'Course'}</h3>
                      <p className="text-xs text-text-muted">ID: {cert.certificateId}</p>
                    </div>
                  </div>
                  <ChevronRight className="text-text-muted" />
                </GlassCard>
              )) : <p className="text-text-muted italic text-sm">No certificates earned yet.</p>}
            </div>
          </section>
        </div>

        {/* ==========================================
            3. EXPLORE COURSES
            ========================================== */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text-main">Explore Courses</h2>
            <div className="flex gap-2">
              <button onClick={() => scrollLeft(coursesRef)} className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"><ChevronLeft size={20} className="text-text-main" /></button>
              <button onClick={() => scrollRight(coursesRef)} className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"><ChevronRight size={20} className="text-text-main" /></button>
            </div>
          </div>

          <div ref={coursesRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {isLoading ? [1, 2, 3, 4].map((i) => <CourseCardSkeleton key={i} />) : courses.map((item) => (
              <GlassCard key={item._id} className="w-[300px] shrink-0 snap-start bg-white p-5 border border-gray-100 hover:border-accent-blue/30 transition-all hover:-translate-y-1">
                <div className="w-full aspect-video bg-gradient-to-br from-accent-blue/10 to-gray-50 rounded-lg mb-4 flex items-center justify-center text-xl font-bold text-accent-blue/5 shrink-0 overflow-hidden relative">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    item.title.split(' ')[0]
                  )}
                  {item.tag && <span className="absolute top-2 left-2 bg-accent-blue/80 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-white">{item.tag}</span>}
                </div>
                <h3 className="font-bold text-lg mb-1 line-clamp-1 text-text-main">{item.title}</h3>
                <p className="text-sm text-text-muted mb-4">{item.instructor}</p>
                <div className="flex items-center justify-between text-xs font-bold text-text-muted pt-4 border-t border-gray-50">
                  <span className="flex items-center gap-1"><Clock size={14}/> {item.duration}</span>
                  <span className="flex items-center gap-1 text-yellow-500"><Star size={14} fill="currentColor"/> {item.rating}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* ==========================================
            4. TRAINING & INTERNSHIP PROGRAMS
            ========================================== */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-text-main mb-1">Training & Internships</h2>
              <p className="text-text-muted text-sm font-medium">Apply for real-world project experience.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? [1, 2, 3].map((i) => <CourseCardSkeleton key={i} />) : internships.map((item) => (
              <GlassCard key={item._id} className="bg-white p-6 border border-gray-100 hover:border-accent-blue/30 transition-all hover:-translate-y-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-accent-blue/10 rounded-lg flex items-center justify-center text-accent-blue font-bold">
                    {item.title?.charAt(0) || 'E'}.
                  </div>
                  <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded-md">Open Now</span>
                </div>
                <h3 className="font-bold text-lg mb-1 text-text-main">{item.title}</h3>
                <p className="text-sm text-text-muted mb-6">{item.company} • {item.location}</p>
                <div className="flex gap-2">
                  <PillButton variant="outline" className="w-full text-xs py-2 text-text-main">View Details</PillButton>
                  <PillButton variant="primary" className="w-full text-xs py-2">Apply</PillButton>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;