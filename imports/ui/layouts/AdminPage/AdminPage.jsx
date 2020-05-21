import React, { useEffect } from  'react';
import AdminLogin from '../../components/AdminLogin/AdminLogin.jsx';
import AdminSideBar from '../../components/AdminSidebar/AdminSidebar.jsx';
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar.jsx';
import './AdminPage.css';
import { withTracker } from 'meteor/react-meteor-data';
const AdminPage = ({currentUser, loginAsAdmin})=>{
  useEffect(()=>{
    console.log(Meteor.user());
    if (Meteor.user() === null || Meteor.user() === undefined){
      return;
    }
    Meteor.call('isAdmin', Meteor.user(),(err, result)=>{
      if (result === false){
        Meteor.logout();
      }
    })
  },[Meteor.user()]);

  const content = (
    <div className="admin-page-container">
      {currentUser !== null && 
        <div className="admin-page-content-container">
          <div className="sidebar-holder"><AdminSideBar/></div>
          <div className="admin-page-content">
           <div className="admin-navbar-holder"><AdminNavbar title='Orders'/></div>
          </div>
        </div>
      }
      {currentUser === null && <AdminLogin/>}  
      
    </div>
  );
  return content;
}
export default withTracker(()=>{
  
  return {
    currentUser: Meteor.user()
  }
})(AdminPage);