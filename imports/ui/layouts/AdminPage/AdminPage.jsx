import React from  'react';
import AdminLogin from '../../components/AdminLogin/AdminLogin.jsx';
import './AdminPage.css';
import { withTracker } from 'meteor/react-meteor-data';
const AdminPage = ({loginAsAdmin})=>{
  console.log('render admin...')
  const content = (
    <div className="admin-page-container">
      {loginAsAdmin === false && <AdminLogin/>}
      {loginAsAdmin && <div>LOGIN AS ADMIN</div>}
    </div>
  );
  return content;
}
export default withTracker(()=>{
  if (Session.get('loginAsAdmin') === false){
    Meteor.logout();
  }
  return {
    loginAsAdmin: Session.get('loginAsAdmin'),
  }
})(AdminPage);