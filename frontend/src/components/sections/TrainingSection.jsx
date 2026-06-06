import React, { useState, useEffect } from 'react';
import GlassCard from '../ui/GlassCard';
import PillButton from '../ui/PillButton';
import { Rocket, Target, Users, CheckCircle, Clock } from 'lucide-react';

const TrainingSection = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 5, hours: 12, minutes: 30, seconds: 0 });

  // Simple countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="training" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-12">
        
        {/* Left Side: Text and Features */}
        <div className="flex-1">
          <div className="inline-block bg-accent-blue/10 text-accent-blue font-bold px-4 py-1.5 rounded-full text-sm mb-6">
            Intensive Training
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-text-main">
            Job-Ready Bootcamps & <br/> Vocational Training.
          </h2>
          <p className="text-text-muted text-lg mb-8 leading-relaxed">
            Go beyond standard courses. Our intensive training programs simulate real-world startup environments where you build production-ready applications from scratch.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3 font-medium text-text-main"><CheckCircle className="text-green-500" size={20}/> Live Mentorship</div>
            <div className="flex items-center gap-3 font-medium text-text-main"><CheckCircle className="text-green-500" size={20}/> Industry Projects</div>
            <div className="flex items-center gap-3 font-medium text-text-main"><CheckCircle className="text-green-500" size={20}/> Career Guidance</div>
            <div className="flex items-center gap-3 font-medium text-text-main"><CheckCircle className="text-green-500" size={20}/> Certificate of Completion</div>
          </div>

          <PillButton variant="primary">Explore Training Programs</PillButton>
        </div>

        {/* Right Side: Visual/Card */}
        <div className="flex-1 w-full relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/20 to-purple-500/10 rounded-3xl blur-2xl transform -rotate-3 scale-105 pointer-events-none"></div>
          <GlassCard className="relative z-10 border-gray-100 p-8 shadow-2xl bg-white">
            <div className="w-16 h-16 bg-gradient-to-br from-accent-blue to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-glow">
              <Rocket size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-text-main">MERN Stack Mastery</h3>
            <p className="text-text-muted mb-6">Build a complete restaurant management system (like QuickSEAT) from frontend to backend over 8 weeks.</p>
            
            {/* Batch Urgency UI */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 mb-6">
               <div className="flex items-center gap-2 text-accent-blue font-bold text-xs uppercase tracking-widest mb-3">
                  <Clock size={14} /> Next Batch Starts In:
               </div>
               <div className="flex gap-4">
                  <div className="flex flex-col">
                     <span className="text-2xl font-black text-text-main">{timeLeft.days}d</span>
                     <span className="text-[10px] text-text-muted uppercase font-bold">Days</span>
                  </div>
                  <div className="text-2xl font-black text-gray-200">:</div>
                  <div className="flex flex-col">
                     <span className="text-2xl font-black text-text-main">{timeLeft.hours}h</span>
                     <span className="text-[10px] text-text-muted uppercase font-bold">Hrs</span>
                  </div>
                  <div className="text-2xl font-black text-gray-200">:</div>
                  <div className="flex flex-col">
                     <span className="text-2xl font-black text-text-main">{timeLeft.minutes}m</span>
                     <span className="text-[10px] text-text-muted uppercase font-bold">Min</span>
                  </div>
                  <div className="text-2xl font-black text-gray-200">:</div>
                  <div className="flex flex-col">
                     <span className="text-2xl font-black text-text-main">{timeLeft.seconds}s</span>
                     <span className="text-[10px] text-text-muted uppercase font-bold">Sec</span>
                  </div>
               </div>
            </div>

            <div className="w-full bg-gray-100 rounded-full h-2 mb-2 overflow-hidden">
              <div className="bg-accent-blue h-2 rounded-full w-[85%] animate-pulse"></div>
            </div>
            <p className="text-xs text-text-muted text-right font-semibold">85% of seats filled</p>
          </GlassCard>
        </div>

      </div>
    </section>
  );
};

export default TrainingSection;
