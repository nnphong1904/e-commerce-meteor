import React, { useState, useEffect } from 'react';
import './AdminNavbar.css';
import Avatar from 'react-avatar';
import {Meteor} from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data';
import Mail from '../../assets/image/mail.svg';
import Notify from '../../assets/image/notification.svg';
import Dropdown from '../../assets/image/dropdown.svg';
const AdminNavbar = ({currentUser})=>{
  const logoutFunction = ()=>{
    FlowRouter.go('/admin');
    Meteor.logout();
  }
  const [title, setTitle] = useState('orders');
  useEffect(()=>{
    setTitle(window.history.state.path.split('/')[2].charAt(0).toUpperCase() + window.history.state.path.split('/')[2].slice(1));
  }, [])
  const content = (
    <div className="admin-navbar-container">
      <div className="admin-navbar-title">{title}</div>
      {currentUser &&
        <div className="admin-info">
          <span id="admin-avatar">
            <Avatar name={currentUser.profile.name} size={25} round={true}/>
          </span>
          <button className="admin-name">{currentUser.profile.name}</button>
          <img id="dropdown-icon" src={Dropdown}/>
          <button onClick={logoutFunction} className="logout-admin">Log out</button>
        </div>}
      <img src={Mail} className="icon"/>
      <img src={Notify} className="icon"/>
    </div>
  );
  return content;
}

export default withTracker(()=>{
  return{
    currentUser: Meteor.user()
  }
})(AdminNavbar);