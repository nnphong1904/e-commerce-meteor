import React, {useState, useEffect} from 'react';
import './Navbar.css';
import {Meteor} from 'meteor/meteor';
import Logo from '../../assets/image/logo.svg';
import Cart from '../../assets/image/cart.svg';
import Arrow from '../../assets/image/arrow.svg';
import { withTracker } from 'meteor/react-meteor-data';
import Avatar from 'react-avatar';


const Navbar = (props)=>{

  // const ref = React.createRef();
  const [userProfile, setUserProfile] =useState({});
  useEffect(() => {
    Meteor.call('getCurrentUser', {}, (err,result)=>{
      if (result.data!==null) 
      {
        setUserProfile({...result.data.profile});
      }
    })
  }, [props.currentUser]);
  const loginBtnClick = ()=>{
    props.setDisplayLoginForm(true);
  }
  
  const logoutBtnClick = ()=>{
    Meteor.logout((err)=>{
      console.log(err);
    })
  }

  const registerBtnClick = ()=>{
    props.setDisplayRegisterForm(true);
  }
  
  // const onclickRef = ()=>{
  //   console.log(ref.current.children[0].innerText);
  // }
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
                <button onClick={registerBtnClick} className="register-btn">Register</button>
                  <button 
                  onClick={loginBtnClick}
                  className="login-btn">
                  <div>Log In</div>
                </button>
              </>
            }
            {
              props.currentUser !== null &&
              <span id="avt"><Avatar name={userProfile.name} size={25} round={true}/></span>
            }
            { props.currentUser !== null &&
              <button onClick={logoutBtnClick} className="logout-btn">Log Out</button>
            }
        <img src={Cart} className="Cart"/>     
        </div>
      </div>
      {/* Lower-part of navbar */}
      <div className="lower-part">
            <ul className="gender-age-filter">
               <li>
                <div>Men</div>
                <img src={Arrow} className="Arrow"/> 
              </li> 
               <li>
                <span>Ladies</span>
                <img src={Arrow} className="Arrow"/>
                <div id="forLadies" className="item-selector">
              </div> 
               </li> 
               <li>
                <span>Boys</span>
                <img src={Arrow} className="Arrow"/>
                <div id="forBoys" className="item-selector">
                 
              </div> 
               </li> 
               <li>
                <span>Girls</span>
                <img src={Arrow} className="Arrow"/>
                <div id="forGirls" className="item-selector">
                 
              </div> 
               </li>
            </ul>
            <div className="item-selector">
                  <ul className="list-item-title">
                    <li>Tops</li>
                    <li>Bottoms</li>
                    <li>Dresses</li>
                    <li>Jackets</li>
                    <li>Shoes</li>
                    <li>Accessories</li>
                    <li>Sale</li>
                  </ul>
            </div>
      </div>
      <div className="filter-value">Ladies/Dresses</div>
    </div>
  );
  return content;
}

export default withTracker(()=>{
  return {
    currentUser: Meteor.user(),
  }
})(Navbar);