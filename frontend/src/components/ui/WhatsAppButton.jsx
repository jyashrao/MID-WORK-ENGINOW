import React from 'react';
import { MessageCircle } from 'lucide-react';

/**
 * WhatsAppButton Component
 * A floating button that opens a pre-filled WhatsApp chat
 * includes UTM tracking for lead generation analysis
 */
const WhatsAppButton = () => {
  const phoneNumber = "919000000000"; // Replace with actual business number
  const message = encodeURIComponent("Hi Enginow — I’d like to know more about your programs and next cohorts.");
  const utmSource = "student_dashboard";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}&utm_source=${utmSource}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[60] group"
      aria-label="Chat with us on WhatsApp"
    >
      {/* Tooltip */}
      <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-white text-text-main px-4 py-2 rounded-lg shadow-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-100 pointer-events-none">
        Chat with us!
      </span>

      {/* Button */}
      <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-glow hover:scale-110 active:scale-95 transition-all duration-300">
        <MessageCircle className="text-white" size={28} fill="currentColor" />
      </div>
      
      {/* Pulse Effect */}
      <div className="absolute inset-0 w-14 h-14 bg-[#25D366] rounded-full animate-ping opacity-20 pointer-events-none"></div>
    </a>
  );
};

export default WhatsAppButton;
