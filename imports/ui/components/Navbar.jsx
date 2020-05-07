import React, {useState} from 'react';
import '../assets/css/Navbar.css';
import {Meteor} from 'meteor/meteor';
import Logo from '../assets/image/logo.svg';
import { withTracker } from 'meteor/react-meteor-data';

const Navbar = (props)=>{
  const loginBtnClick = ()=>{
    FlowRouter.go('/login')
  }
  
  const logoutBtnClick = ()=>{
    Meteor.logout((err)=>{
      console.log(err);
    })
  }
  
  const content = (
    <div className="navbar">
      <div className="upper-part">
        <input 
          className="search-box" 
          type="text" 
          placeholder="Search"/>
        <img src={Logo} className="Logo"/>
        <div className="auth">
            { props.currentUser===null &&
              <>
                <div className="register-btn">Register</div>
                  <div 
                  onClick={loginBtnClick}
                  className="login-btn">
                  <div>Log In</div>
                </div>
              </>
            }
            { props.currentUser !== null &&
              <div onClick={logoutBtnClick} className="login-btn">
                <div>Log Out</div>
              </div>
            }
     
        </div>
      </div>
      <div className="lower-part">Lower part</div>
    </div>
  );
  return content;
}

export default withTracker(()=>{
  return {
    currentUser: Meteor.user()
  }
})(Navbar);