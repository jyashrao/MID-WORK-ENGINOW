import React, { useState, useEffect } from 'react';
import StudentLayout from '../components/layout/StudentLayout';
import GlassCard from '../components/ui/GlassCard';
import PillButton from '../components/ui/PillButton';
import { 
  ShieldCheck, Users, Ticket as TicketIcon, Search, 
  Filter, MoreHorizontal, Trash2, ExternalLink 
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const AdminDashboard = () => {
  const [allTickets, setAllTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ users: 0, tickets: 0, open: 0 });

  const statusOptions = ['Open', 'In-Progress', 'Resolved', 'Closed'];

  useEffect(() => {
    // Simulated fetch for Admin - In a real app, calls /api/tickets/admin/all
    setTimeout(() => {
      setAllTickets([
        { _id: '1', ticketId: 'ENG-2026-8821', user: { name: 'Yash', email: 'yash@test.com' }, subject: 'Course Access Issue', status: 'Open', priority: 'High', createdAt: '2026-05-26T10:00:00Z' },
        { _id: '2', ticketId: 'ENG-2026-4412', user: { name: 'Janmejay', email: 'jan@test.com' }, subject: 'Payment Receipt Query', status: 'Resolved', priority: 'Medium', createdAt: '2026-05-24T14:30:00Z' },
        { _id: '3', ticketId: 'ENG-2026-1123', user: { name: 'Jeet', email: 'jeet@test.com' }, subject: 'PWA not installing', status: 'In-Progress', priority: 'Low', createdAt: '2026-05-27T09:15:00Z' },
      ]);
      setStats({ users: 156, tickets: 45, open: 12 });
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleStatusUpdate = (id, newStatus) => {
    const loading = toast.loading('Updating status...');
    setTimeout(() => {
      setAllTickets(allTickets.map(t => t._id === id ? { ...t, status: newStatus } : t));
      toast.success(`Ticket status updated to ${newStatus}`, { id: loading });
    }, 800);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      const loading = toast.loading('Deleting ticket...');
      setTimeout(() => {
        setAllTickets(allTickets.filter(t => t._id !== id));
        toast.success('Ticket deleted successfully', { id: loading });
      }, 800);
    }
  };

  return (
    <StudentLayout>
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-text-main flex items-center gap-3">
              <ShieldCheck className="text-accent-blue" size={36} />
              Admin Control Panel
            </h1>
            <p className="text-text-muted font-medium">Platform-wide oversight and management.</p>
          </div>
        </div>

        {/* Admin Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6 bg-white border-gray-100 shadow-soft">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                <Users size={28} />
              </div>
              <div>
                <p className="text-sm font-bold text-text-muted">Total Students</p>
                <p className="text-3xl font-black text-text-main">{stats.users}</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard className="p-6 bg-white border-gray-100 shadow-soft">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                <TicketIcon size={28} />
              </div>
              <div>
                <p className="text-sm font-bold text-text-muted">Total Tickets</p>
                <p className="text-3xl font-black text-text-main">{stats.tickets}</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard className="p-6 bg-white border-gray-100 shadow-soft">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                <Filter size={28} />
              </div>
              <div>
                <p className="text-sm font-bold text-text-muted">Open Issues</p>
                <p className="text-3xl font-black text-text-main">{stats.open}</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Global Ticket Management Table */}
        <GlassCard className="bg-white border-gray-100 shadow-soft overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-text-main">Ticket Management</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by ID or email..."
                className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-accent-blue outline-none transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-text-muted text-xs font-black uppercase tracking-widest">
                  <th className="px-6 py-4">Ticket ID</th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoading ? (
                  [1,2,3].map(i => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan="5" className="px-6 py-8"><div className="h-4 bg-gray-100 rounded w-full"></div></td>
                    </tr>
                  ))
                ) : allTickets.map((ticket) => (
                  <tr key={ticket._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-black text-accent-blue">{ticket.ticketId}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-text-main">{ticket.user.name}</span>
                        <span className="text-xs text-text-muted">{ticket.user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-text-main line-clamp-1">{ticket.subject}</span>
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={ticket.status}
                        onChange={(e) => handleStatusUpdate(ticket._id, e.target.value)}
                        className={`text-[10px] font-black px-3 py-1.5 rounded-full border-none outline-none focus:ring-2 focus:ring-accent-blue transition-all cursor-pointer ${
                          ticket.status === 'Open' ? 'bg-blue-100 text-blue-700' :
                          ticket.status === 'In-Progress' ? 'bg-yellow-100 text-yellow-700' :
                          ticket.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-accent-blue hover:bg-blue-50 rounded-lg transition-all">
                          <ExternalLink size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(ticket._id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

      </div>
    </StudentLayout>
  );
};

export default AdminDashboard;
