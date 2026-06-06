import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, Link } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import PillButton from '../components/ui/PillButton';
import { googleLogin, login } from '../services/api';
import { ShieldCheck, Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse) => {
    // try {
    //   const data = await googleLogin(credentialResponse.credential);
    //   localStorage.setItem('userInfo', JSON.stringify(data));
    //   localStorage.setItem('token', data.token);
    //   navigate('/dashboard');
    // } catch (err) {
    //   setError('Google Login failed. Please try again.');
    // }
    
    // Demo Bypass
    localStorage.setItem('userInfo', JSON.stringify({ name: 'Demo Student', role: 'Student' }));
    localStorage.setItem('token', 'demo-token');
    navigate('/dashboard');
  };

  const handleManualLogin = async (e) => {
    e.preventDefault();
    setError('');
    // setLoading(true);
    // try {
    //   const data = await login(formData.email, formData.password);
    //   localStorage.setItem('userInfo', JSON.stringify(data));
    //   localStorage.setItem('token', data.token);
    //   navigate('/dashboard');
    // } catch (err) {
    //   setError(err.message || 'Login failed. Check your credentials.');
    // } finally {
    //   setLoading(false);
    // }

    // Demo Bypass
    localStorage.setItem('userInfo', JSON.stringify({ name: 'Demo Student', role: 'Student' }));
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
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-text-main mb-2">Welcome Back</h1>
          <p className="text-text-muted font-medium">Log in to Enginow to continue your journey.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 text-sm font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleManualLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="email" 
              placeholder="Email Address"
              required
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-all text-text-main"
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
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-all text-text-main"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          
          <PillButton type="submit" variant="primary" className="w-full justify-center py-4" disabled={loading}>
            {loading ? 'Logging in...' : 'Sign In'} <ArrowRight size={18} />
          </PillButton>
        </form>

        <div className="my-8 flex items-center gap-4 text-gray-200">
          <div className="flex-1 h-px bg-gray-100"></div>
          <span className="text-xs font-bold uppercase tracking-widest text-text-muted">Or continue with</span>
          <div className="flex-1 h-px bg-gray-100"></div>
        </div>

        <div className="w-full flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Google Login Failed')}
            theme="filled_blue"
            shape="pill"
          />
        </div>

        <p className="mt-8 text-center text-sm text-text-muted font-medium">
          Don't have an account? {' '}
          <Link to="/register" className="text-accent-blue font-bold hover:underline">Sign Up Free</Link>
        </p>
      </GlassCard>
    </div>
  );
};

export default Login;
