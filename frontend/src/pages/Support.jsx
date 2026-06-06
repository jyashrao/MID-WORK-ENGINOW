import React, { useState, useEffect } from 'react';
import StudentLayout from '../components/layout/StudentLayout';
import GlassCard from '../components/ui/GlassCard';
import PillButton from '../components/ui/PillButton';
import { LifeBuoy, Plus, MessageSquare, Clock, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { createTicket, fetchUserTickets } from '../services/api';

const Support = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ subject: '', message: '', priority: 'Medium' });

  // Industry Pattern: Centralized status styling
  const statusStyles = {
    'Open': 'bg-accent-blue/20 text-accent-blue',
    'In-Progress': 'bg-yellow-500/20 text-yellow-400',
    'Resolved': 'bg-green-500/20 text-green-400',
    'Closed': 'bg-white/5 text-text-muted'
  };

  useEffect(() => {
    const getTickets = async () => {
      const token = localStorage.getItem('token');
      if (!token) return setIsLoading(false);

      try {
        const data = await fetchUserTickets(token);
        setTickets(data);
      } catch (err) {
        toast.error("Could not load tickets");
      } finally {
        setIsLoading(false);
      }
    };
    getTickets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const loadingToast = toast.loading('Creating your ticket...');
    
    try {
      const newTicket = await createTicket(formData, token);
      toast.success('Ticket Created! Our team will respond within 24 hours.', { id: loadingToast });
      setTickets([newTicket, ...tickets]);
      setShowModal(false);
      setFormData({ subject: '', message: '', priority: 'Medium' });
    } catch (err) {
      toast.error(err.message || "Failed to create ticket", { id: loadingToast });
    }
  };

  return (
    <StudentLayout>
      <Toaster position="top-right" />
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-text-main flex items-center gap-3">
              <LifeBuoy className="text-accent-blue" size={32} />
              Support Center
            </h1>
            <p className="text-text-muted font-medium mt-1">
              Have a question? We're here to help you succeed.
            </p>
          </div>
          <PillButton variant="primary" onClick={() => setShowModal(true)} className="flex items-center gap-2">
            <Plus size={18} /> New Ticket
          </PillButton>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6 bg-white border border-gray-100 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent-blue/10 rounded-xl flex items-center justify-center text-accent-blue">
                <MessageSquare size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-text-muted uppercase tracking-wider">Total Tickets</p>
                <p className="text-2xl font-black text-text-main">{tickets.length}</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard className="p-6 bg-white border border-gray-100 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-400">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-text-muted uppercase tracking-wider">In Progress</p>
                <p className="text-2xl font-black text-text-main">1</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard className="p-6 bg-white border border-gray-100 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400">
                <CheckCircle size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-text-muted uppercase tracking-wider">Resolved</p>
                <p className="text-2xl font-black text-text-main">1</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Ticket List */}
        <section>
          <h2 className="text-xl font-bold text-text-main mb-6">Your Recent Tickets</h2>
          <div className="space-y-4">
            {isLoading ? (
               <div className="animate-pulse space-y-4">
                 {[1,2].map(i => <div key={i} className="h-24 bg-gray-50 rounded-2xl w-full"></div>) /* Changed bg-white/5 to bg-gray-50 */}
               </div>
            ) : tickets.length > 0 ? (
              tickets.map((ticket) => (
                <GlassCard key={ticket.id} className="p-5 bg-white border border-gray-100 shadow-soft hover:border-accent-blue/30 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className={`w-2 h-12 rounded-full ${ticket.priority === 'High' ? 'bg-red-500' : 'bg-accent-blue'}`}></div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xs font-black text-accent-blue uppercase tracking-tighter">{ticket.ticketId}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusStyles[ticket.status]}`}>
                            {ticket.status}
                          </span>
                        </div>
                        <h3 className="font-bold text-lg text-text-main">{ticket.subject}</h3>
                        <p className="text-sm text-text-muted">Created on {ticket.date || new Date(ticket.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <ChevronRight className="text-text-muted group-hover:text-accent-blue transition-colors" size={24} />
                  </div>
                </GlassCard>
              ))
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
                <AlertCircle className="mx-auto text-gray-200 mb-4" size={48} />
                <p className="text-text-muted font-bold">No tickets found. Need help?</p>
              </div>
            )}
          </div>
        </section>

        {/* Modal for New Ticket */}
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
            <GlassCard className="relative w-full max-w-lg bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-300">
              <h3 className="text-2xl font-black text-text-main mb-6">Raise a Support Ticket</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-text-main mb-2">Subject</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Briefly describe the issue"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-accent-blue outline-none transition-all text-text-main placeholder:text-text-muted"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-main mb-2">Priority</label>
                  <select 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-accent-blue outline-none transition-all text-text-main"
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-main mb-2">Message</label>
                  <textarea 
                    required
                    rows="4"
                    placeholder="Provide details so we can help you faster..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-accent-blue outline-none transition-all resize-none text-text-main placeholder:text-text-muted"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <div className="flex gap-4 pt-2">
                  <PillButton variant="outline" className="flex-1 text-text-main" onClick={() => setShowModal(false)}>Cancel</PillButton>
                  <PillButton variant="primary" type="submit" className="flex-1">Submit Ticket</PillButton>
                </div>
              </form>
            </GlassCard>
          </div>
        )}

      </div>
    </StudentLayout>
  );
};

export default Support;
