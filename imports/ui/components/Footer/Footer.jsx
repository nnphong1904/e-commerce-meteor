import React from 'react';
import Logo from '../../assets/image/logo.png';
import Facebook from '../../assets/image/facebook-icon.svg';
import Instagram from '../../assets/image/instagram-icon.svg';
import Twitter from '../../assets/image/twitter-icon.svg';
import './Footer.css';
const Footer = ()=>{

  const content = (
    <div className="footer">
      <div className="footer-upper-part">
        <img className="Logo" src={Logo}/>
        <ul className="list-pages">
            <li className="page-list-item" key={1}>Products</li>
            <li className="page-list-item" key={2}>Services</li>
            <li className="page-list-item" key={3}>Home</li>
            <li className="page-list-item" key={4}>About us</li>
            <li className="page-list-item" key={5}>Help</li>
            <li className="page-list-item" key={6}>Contact</li>
        </ul>
        <ul className="social-network-list">
            <li className="social-network-list-item"><img  src={Twitter}/></li>
            <li className="social-network-list-item"><img  src={Instagram}/></li>
            <li className="social-network-list-item"><img  src={Facebook}/></li>
        </ul>
      </div>
      <div className="footer-lower-part">
        <ul className="list-pages">
              <li className="page-list-item" key={1}>Products</li>
              <li className="page-list-item" key={2}>Services</li>
              <li className="page-list-item" key={3}>Home</li>
              <li className="page-list-item" key={4}>About us</li>
              <li className="page-list-item" key={5}>Help</li>
              <li className="page-list-item" key={6}>Contact</li>
        </ul>
        <div className="terms-policy">
            <span className="footer-privacy">Privacy Policy</span>
            <span className="footer-terms">Term&Condition</span>
        </div>
      </div>
    </div>
  );
  return content;
}

export default Footer;