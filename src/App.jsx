// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import Support from './pages/Support';
import WhatsAppButton from './components/ui/WhatsAppButton';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={googleClientId || ""}>
      <BrowserRouter>
        <Routes>
          {/* The Public Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* The Private Student Area */}
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/support" element={<Support />} />
        </Routes>
        <WhatsAppButton />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
