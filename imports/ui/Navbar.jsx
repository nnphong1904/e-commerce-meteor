import React from 'react';
import './assets/css/Navbar.css';
import Logo from './assets/image/logo.svg';
const Navbar = (props)=>{
 console.log(Logo);
  const content = (
    <div className="navbar">
      <div className="upper-part">
        <input 
          className="search-box" 
          type="text" 
          placeholder="Search"/>
        <img src={Logo} className="Logo"/>
        <div className="auth">
          <div className="register-btn">Register</div>
          <div className="login-btn"><div>Log In</div></div>
        </div>
      </div>
      <div className="lower-part">Lower part</div>
    </div>
  );
  return content;
}

export default Navbar;