import React from 'react';
import GlassCard from '../ui/GlassCard';
import PillButton from '../ui/PillButton';
import { Briefcase, MapPin, ExternalLink } from 'lucide-react';
import { ListSkeleton } from '../ui/Skeleton';

const fallbackInternships = [
  { id: 1, role: 'Frontend Developer Intern', company: 'Enginow Tech', location: 'Remote', stipend: '₹10k - 15k / mo', type: 'Pre-Placement Offer' },
  { id: 2, role: 'AI & Data Science Intern', company: 'NextGen Solutions', location: 'Hybrid', stipend: '₹12k / mo', type: '2 Months' },
  { id: 3, role: 'UI/UX Design Intern', company: 'Creative Studio', location: 'Remote', stipend: 'Performance Based', type: '3 Months' },
];

const InternshipBoard = ({ dbInternships, isLoading }) => {
  const internships = dbInternships && dbInternships.length > 0 ? dbInternships : fallbackInternships;

  return (
    <section id="internships" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2 text-text-main">Exclusive Internships</h2>
        <p className="text-text-muted max-w-2xl mx-auto">
          Apply your skills in the real world. Get access to verified internship opportunities matched to your training profile.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {isLoading ? (
          <ListSkeleton />
        ) : (
          internships.map((job) => (
            <GlassCard key={job.id || job._id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:p-8 hover:bg-gray-50 transition-colors group bg-white border-gray-100 shadow-soft">
              
              <div className="flex items-start gap-6 mb-4 md:mb-0">
                <div className="w-12 h-12 rounded-xl bg-accent-blue/10 text-accent-blue flex items-center justify-center shrink-0">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold group-hover:text-accent-blue transition-colors text-text-main">{job.role || job.title}</h3>
                  <p className="text-text-muted font-medium mb-2">{job.company}</p>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted">
                    <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                    <span className="px-2 py-0.5 bg-gray-100 rounded-md font-medium text-text-muted">{job.type}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:items-end w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t border-gray-100 md:border-none">
                <p className="text-sm font-semibold text-text-main mb-3 md:mb-2">{job.stipend}</p>
                <PillButton variant="outline" className="w-full md:w-auto justify-center group-hover:bg-accent-blue group-hover:text-white group-hover:border-transparent text-text-main">
                  Apply Now <ExternalLink size={16} />
                </PillButton>
              </div>

            </GlassCard>
          ))
        )}
      </div>
      
      <div className="text-center mt-10">
        <button className="text-accent-blue font-bold hover:underline transition-all">
          View all 50+ opportunities →
        </button>
      </div>
    </section>
  );
};

export default InternshipBoard;