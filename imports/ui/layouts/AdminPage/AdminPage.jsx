import React, { useEffect } from  'react';
import AdminLogin from '../../components/AdminLogin/AdminLogin.jsx';
import AdminSideBar from '../../components/AdminSidebar/AdminSidebar.jsx';
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar.jsx';
import './AdminPage.css';
import { withTracker } from 'meteor/react-meteor-data';
const AdminPage = ({currentUser, loginAsAdmin, component})=>{
  console.log(loginAsAdmin);
  useEffect(()=>{
    if (Meteor.user() === null || Meteor.user() === undefined){
      FlowRouter.go('/admin');
      return;
    }
    Meteor.call('isAdmin', Meteor.user(),(err, result)=>{
      if (result === false){
        Meteor.logout();
      }
      else{
        FlowRouter.go('/admin/orders');
      }
    })
  },[Meteor.user()]);

  const content = (
    <div className="admin-page-container">
      {currentUser !== null && loginAsAdmin===true &&
        <div className="admin-page-content-container">
          <div className="sidebar-holder"><AdminSideBar/></div>
          <div className="admin-page-content">
           <div className="admin-navbar-holder"><AdminNavbar title='Orders'/></div>
           {component}
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
    currentUser: Meteor.user(),
    loginAsAdmin: Session.get('loginAsAdmin')
  }
})(AdminPage);