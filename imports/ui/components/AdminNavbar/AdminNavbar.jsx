import React, { useState, useEffect } from 'react';
import './AdminNavbar.css';
import Avatar from 'react-avatar';
import {Meteor} from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data';
import Mail from '../../assets/image/mail.svg';
import Notify from '../../assets/image/notification.svg';
import Dropdown from '../../assets/image/dropdown.svg';
const AdminNavbar = ({currentUser, title=''})=>{
  const logoutFunction = ()=>{
    Meteor.logout();
    FlowRouter.go('/admin');
  }
  const content = (
    <div className="admin-navbar-container">
      <div className="admin-navbar-title">{title}</div>
      {currentUser &&
        <div className="admin-info">
          <span id="admin-avatar">
            <Avatar name={currentUser.profile.name} size={25} round={true}/>
          </span>
          <div className="admin-name">{currentUser.profile.name}</div>
          <img id="dropdown-icon" src={Dropdown}/>
          <div onClick={logoutFunction} className="logout-admin">Log out</div>
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