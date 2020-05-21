import React from 'react';
import './AdminSidebar.css';
import Logo from '../../assets/image/logo.svg';
import AdminSiteSelector from '../AdminSiteSelector/AdminSiteSelector.jsx';
import Cart from '../../assets/image/orders-dark.svg';
import ProductLogo from '../../assets/image/products.svg';
import CartOrange from '../../assets/image/orders-orange.svg';
import ProductLogoOrange from '../../assets/image/products-orange.svg';

const AdminSidebar = (props)=>{

  const markChecked = ()=>{

  }

  const content = (
    <div className="admin-sidebar-container">
        <img className="sidebar-logo" src={Logo} />
        <form className="select-site-container">
            <AdminSiteSelector title="Orders" checkedLogo={CartOrange} logo={Cart}/>
            <AdminSiteSelector title="Products" checkedLogo={ProductLogoOrange} logo={ProductLogo}/>
        </form>
    </div>
  );
  return content;
}

export default AdminSidebar;