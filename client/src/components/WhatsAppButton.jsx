import React from 'react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  // Replace with your actual WhatsApp number (with country code, no + or spaces)
  const phoneNumber = '919876543210'; // Example: 919876543210 for India
  const message = 'Hello! I would like to inquire about your products.';
  
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="whatsapp-button" onClick={handleClick}>
      <svg 
        viewBox="0 0 32 32" 
        xmlns="http://www.w3.org/2000/svg"
        className="whatsapp-icon"
      >
        <path 
          fill="currentColor" 
          d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-5.155 1.383 1.383-5.146-0.324-0.534c-1.336-2.197-2.027-4.703-2.027-7.341 0-7.51 6.123-13.633 13.633-13.633s13.633 6.123 13.633 13.633c0 7.51-6.123 13.633-13.633 13.633zM21.751 18.831c-0.271-0.135-1.599-0.789-1.846-0.879s-0.428-0.135-0.608 0.135c-0.18 0.271-0.698 0.879-0.857 1.059-0.158 0.18-0.316 0.203-0.586 0.068s-1.144-0.421-2.179-1.344c-0.806-0.719-1.351-1.607-1.509-1.877s-0.017-0.417 0.119-0.552c0.122-0.122 0.271-0.316 0.406-0.474s0.18-0.271 0.271-0.452c0.090-0.18 0.045-0.338-0.023-0.474s-0.608-1.464-0.833-2.004c-0.22-0.527-0.443-0.456-0.608-0.464-0.158-0.008-0.338-0.010-0.518-0.010s-0.474 0.068-0.721 0.338c-0.248 0.271-0.946 0.924-0.946 2.256s0.969 2.616 1.104 2.796c0.135 0.18 1.898 2.992 4.665 4.087 2.767 1.096 2.767 0.729 3.268 0.684s1.599-0.654 1.824-1.284c0.226-0.631 0.226-1.171 0.158-1.284s-0.248-0.18-0.518-0.316z"
        />
      </svg>
      <span className="whatsapp-tooltip">Chat with us!</span>
    </div>
  );
};

export default WhatsAppButton;
