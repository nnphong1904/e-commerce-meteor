import React, { useEffect } from  'react';
import AdminLogin from '../../components/AdminLogin/AdminLogin.jsx';
import AdminSideBar from '../../components/AdminSidebar/AdminSidebar.jsx';
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar.jsx';
import './AdminPage.css';
import { withTracker } from 'meteor/react-meteor-data';



const AdminPage = ({currentUser, loginAsAdmin, component})=>{
  // console.log(Session.get('loginAsAdmin'));
  useEffect(()=>{
    if (Meteor.user() === undefined){
      return;
    }
    else {
    if (Meteor.user() === null){
      FlowRouter.go('/admin');
      return;
    }
    if (Session.get('loginAsAdmin') === undefined){}
    Meteor.call('isAdmin', Meteor.user(),(err, result)=>{
      if (result === false){
        Meteor.logout();
      }
      else{
       if (window.history.state.path.split('/')[2] === '' || window.history.state.path.split('/')[2] === undefined){
         FlowRouter.go('/admin/orders');
       }
   
      }
    })
  }
  },[Meteor.user()]);

  const content = (
    <div className="admin-page-container">
     
      {currentUser !== null && loginAsAdmin === true && 
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
  Meteor.call('isAdmin', Meteor.user(), (err, result)=>{
    if (result === true){
      Session.set('loginAsAdmin', true);
    }
    else{
      Session.set('loginAsAdmin', false);
    }
  })
  return {
    currentUser: Meteor.user(),
    loginAsAdmin: Session.get('loginAsAdmin')
  }
})(AdminPage);