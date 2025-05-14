import React from 'react';
import '../../styles/main.css'; // import the CSS file

const Footer = () => {  
  return (
    <footer className="footer">
      {/* Left Section */}
      <div className="footer-left">
        <p>ISLA NI LOLA</p>
        <p>PALAWAN</p>
        <p>PUERTO PRINCESA</p>
      </div>

      {/* Center Icons */}
      <div className="footer-center">
        <a href="#"><i className='bx bxl-facebook'></i></a>
        <a href="#"><i className='bx bxl-instagram'></i></a>
        <a href="#"><i className='bx bxl-twitter'></i></a> {/* For X (Twitter) */}
      </div>

      {/* Right Section */}
      <div className="footer-right">
        <p>0921-2121-2121</p>
      </div>
    </footer>
  );
};

export default Footer;
