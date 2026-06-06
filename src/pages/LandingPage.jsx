// src/pages/LandingPage.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroIntro from '../components/sections/HeroIntro';
import Course from '../components/sections/Course';
import TrainingSection from '../components/sections/TrainingSection';
import InternshipBoard from '../components/sections/InternshipBoard';
import LearningRoadmap from '../components/sections/LearningRoadmap';
import { fetchCourses, fetchInternships } from '../services/api';

const LandingPage = () => {
  const [courses, setCourses] = useState([
    { _id: '1', title: 'Data Structures & Algorithms', instructor: 'Rahul M.', duration: '40 Hrs', rating: 4.8, tag: 'Bestseller', category: 'DSA', image: '/thumbnail/DSA.png' },
    { _id: '2', title: 'Full Stack MERN Bootcamp', instructor: 'Priya K.', duration: '60 Hrs', rating: 4.9, tag: 'New', category: 'Web Development', image: '/thumbnail/Full_Stack.png' },
    { _id: '3', title: 'Operating Systems Mastery', instructor: 'Amit S.', duration: '25 Hrs', rating: 4.7, tag: null, category: 'Core Engineering', image: '/thumbnail/OS_Mastery.png' },
    { _id: '4', title: 'Gen AI with JS', instructor: 'Jeet B.', duration: '30 Hrs', rating: 4.8, tag: 'Bestseller', category: 'AI', image: '/thumbnail/GenAI_JS.png' },
    { _id: '5', title: 'MLOps Engineering', instructor: 'Rahul M.', duration: '40 Hrs', rating: 4.7, tag: null, category: 'AI', image: '/thumbnail/MLOps.png' },
    { _id: '6', title: 'System Design', instructor: 'Amit S.', duration: '35 Hrs', rating: 4.9, tag: 'New', category: 'Core Engineering', image: '/thumbnail/System_Design.png' },
    { _id: '7', title: 'DBMS & SQL Mastery', instructor: 'Priya K.', duration: '30 Hrs', rating: 4.6, tag: 'Bestseller', category: 'Web Development', image: '/thumbnail/Full_Stack.png' },
    { _id: '8', title: 'Python for Data Science', instructor: 'Rahul M.', duration: '45 Hrs', rating: 4.8, tag: null, category: 'Data Science', image: '/thumbnail/DSA.png' }
  ]);
  const [internships, setInternships] = useState([
    { _id: '1', title: 'Frontend Developer Intern', company: 'Enginow Tech', location: 'Remote', stipend: '₹10k - 15k / mo', type: 'Pre-Placement Offer', category: 'Web Development' },
    { _id: '2', title: 'AI & Data Science Intern', company: 'NextGen Solutions', location: 'Hybrid', stipend: '₹12k / mo', type: '2 Months', category: 'AI' },
    { _id: '3', title: 'Backend Engineering Intern', company: 'CloudScale', location: 'Remote', stipend: '₹15k / mo', type: '3 Months', category: 'Web Development' },
    { _id: '4', title: 'Full Stack Developer', company: 'Innovate Corp', location: 'Remote', stipend: '₹20k / mo', type: '6 Months', category: 'Web Development' },
    { _id: '5', title: 'Machine Learning Intern', company: 'DataMind', location: 'Hybrid', stipend: '₹18k / mo', type: '3 Months', category: 'AI' },
    { _id: '6', title: 'Software Engineer Intern', company: 'TechFlow', location: 'Remote', stipend: '₹12k / mo', type: '2 Months', category: 'DSA' }
  ]);
  const [loading, setLoading] = useState(false);
// 3. Fetch data on mount
useEffect(() => {
  const getData = async () => {
    try {
      const [coursesData, internshipsData] = await Promise.all([
        fetchCourses({ sort: 'bestseller', limit: 6 }),
        fetchInternships()
      ]);
      setCourses(coursesData);
      setInternships(internshipsData);
      } catch (err) {
        console.error("Landing Page fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-accent-blue selection:text-white">
      
      {/* Ambient Background Glows */}
      <div className="fixed top-0 left-0 w-[700px] h-[700px] bg-accent-blue/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/3 pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-navy/20 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3 pointer-events-none z-0" />

      {/* Main Foreground Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <div className="pt-24">
            <HeroIntro />
          </div>
          
          <Course dbCourses={courses} isLoading={loading} />

          <LearningRoadmap />
          
          <TrainingSection />
          <InternshipBoard dbInternships={internships} isLoading={loading} />
        </main>

        <Footer />
        
      </div>
    </div>
  );
};

export default LandingPage;