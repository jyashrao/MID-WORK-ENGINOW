import React from 'react';
import PillButton from '../ui/PillButton';
import { ArrowRight, PlayCircle } from 'lucide-react';

const HeroIntro = () => {
  return (
    <section className="pt-48 pb-24 px-6 max-w-6xl mx-auto text-center">
      <h1 className="text-black text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
        Master Engineering <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-purple-400">
          Concepts Faster.
        </span>
      </h1>
      <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
        Join thousands of CS & IT students upgrading their skills with expert-led courses and guaranteed internship opportunities.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <PillButton variant="accent">
          Start Learning Today <ArrowRight size={18} />
        </PillButton>
        <PillButton variant="outline">
          <PlayCircle size={18} className="text-accent-blue" /> Watch Demo
        </PillButton>
      </div>
    </section>
  );
};

export default HeroIntro;