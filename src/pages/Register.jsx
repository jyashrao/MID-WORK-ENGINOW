import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import PillButton from '../components/ui/PillButton';
import { register } from '../services/api';
import { UserPlus, Mail, Lock, User, ArrowRight } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    // setLoading(true);
    // try {
    //   const data = await register({
    //     name: formData.name,
    //     email: formData.email,
    //     password: formData.password
    //   });
    //   localStorage.setItem('userInfo', JSON.stringify(data));
    //   localStorage.setItem('token', data.token);
    //   navigate('/dashboard');
    // } catch (err) {
    //   setError(err.message || 'Registration failed');
    // } finally {
    //   setLoading(false);
    // }

    // Demo Bypass
    localStorage.setItem('userInfo', JSON.stringify({ name: formData.name || 'Demo Student', role: 'Student' }));
    localStorage.setItem('token', 'demo-token');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6 transition-colors duration-300">
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-accent-blue/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-accent-blue/5 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <GlassCard className="w-full max-w-md p-8 md:p-10 flex flex-col shadow-2xl border-gray-100 bg-white/80">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-accent-blue/10 rounded-2xl flex items-center justify-center text-accent-blue mb-4">
            <UserPlus size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-text-main mb-2">Join Enginow</h1>
          <p className="text-text-muted font-medium">Create your account to start learning engineering concepts.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 text-sm font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Full Name"
              required
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-all text-text-main placeholder:text-text-muted"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="email" 
              placeholder="Email Address"
              required
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-all text-text-main placeholder:text-text-muted"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="password" 
              placeholder="Password"
              required
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-all text-text-main placeholder:text-text-muted"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="password" 
              placeholder="Confirm Password"
              required
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-all text-text-main placeholder:text-text-muted"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>
          
          <PillButton type="submit" variant="primary" className="w-full justify-center py-4" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'} <ArrowRight size={18} />
          </PillButton>
        </form>

        <p className="mt-8 text-center text-sm text-text-muted font-medium">
          Already have an account? {' '}
          <Link to="/login" className="text-accent-blue font-bold hover:underline">Sign In</Link>
        </p>
      </GlassCard>
    </div>
  );
};

export default Register;
