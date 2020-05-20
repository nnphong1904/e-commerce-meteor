import React from  'react';
import AdminLogin from '../../components/AdminLogin/AdminLogin.jsx';
import './AdminPage.css';
const AdminPage = ()=>{
  const content = (
    <div className="admin-page-container">
      <AdminLogin/>
    </div>
  );
  return content;
}
export default AdminPage;