import React from 'react';
import GlassCard from '../ui/GlassCard';
import { ArrowRight, BookOpen, Code, Layers, Database, Globe, Rocket } from 'lucide-react';

const steps = [
  { id: 1, title: 'Programming Fundamentals', icon: <BookOpen className="text-blue-500" />, time: '2-4 Weeks', desc: 'Logic building, syntax, and basic algorithms.' },
  { id: 2, title: 'Data Structures & Algorithms', icon: <Code className="text-purple-500" />, time: '6-8 Weeks', desc: 'Master efficient problem solving.' },
  { id: 3, title: 'Operating Systems & Core', icon: <Layers className="text-orange-500" />, time: '3-4 Weeks', desc: 'Understand how computers work.' },
  { id: 4, title: 'DBMS & SQL', icon: <Database className="text-green-500" />, time: '2-3 Weeks', desc: 'Handling data like a pro.' },
  { id: 5, title: 'Web Development', icon: <Globe className="text-indigo-500" />, time: '8-10 Weeks', desc: 'Frontend, Backend, and Full-stack deployment.' },
  { id: 6, title: 'Industry Projects', icon: <Rocket className="text-red-500" />, time: 'Continuous', desc: 'Building real-world applications.' },
];

const LearningRoadmap = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center mb-16">
        <div className="inline-block bg-accent-blue/10 text-accent-blue font-bold px-4 py-1.5 rounded-full text-sm mb-4 uppercase tracking-widest">
          Your Success Path
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-text-main mb-4">
          Master Engineering, <span className="text-accent-blue">Step-by-Step.</span>
        </h2>
        <p className="text-text-muted text-lg max-w-2xl mx-auto">
          No more confusion on where to start. Follow our proven curriculum designed for the modern tech industry.
        </p>
      </div>

      <div className="relative">
        {/* Connection Line (Desktop) */}
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-accent-blue/5 via-accent-blue/20 to-accent-blue/5 -translate-y-1/2 z-0"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
          {steps.map((step, index) => (
            <div key={step.id} className="group flex flex-col items-center">
              <GlassCard className="w-full p-6 flex flex-col items-center text-center hover:border-accent-blue/40 transition-all hover:-translate-y-2 bg-white shadow-xl border-gray-100">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 shadow-soft flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="font-bold text-sm text-text-main mb-2 leading-tight">{step.title}</h3>
                <p className="text-[10px] font-black text-accent-blue uppercase tracking-tighter mb-3">{step.time}</p>
                <p className="text-xs text-text-muted font-medium line-clamp-2">{step.desc}</p>
              </GlassCard>
              
              {index < steps.length - 1 && (
                <div className="lg:hidden my-4 text-white/10">
                   <ArrowRight className="rotate-90 md:rotate-0" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-16 text-center">
         <button className="bg-accent-blue text-white px-8 py-4 rounded-full font-bold hover:shadow-glow transition-all flex items-center gap-3 mx-auto">
            Take the "Where Should I Start?" Quiz <ArrowRight size={20} />
         </button>
      </div>
    </section>
  );
};

export default LearningRoadmap;