import React, { createRef, useState } from 'react';
import './AdminSidebar.css';
import Logo from '../../assets/image/logo.svg';
import AdminSiteSelector from '../AdminSiteSelector/AdminSiteSelector.jsx';
import Cart from '../../assets/image/orders-dark.svg';
import ProductLogo from '../../assets/image/products.svg';
import CartOrange from '../../assets/image/orders-orange.svg';
import ProductLogoOrange from '../../assets/image/products-orange.svg';

const AdminSidebar = (props)=>{

  
  const siteSelectorRef = createRef();
  const [site, setSite] = useState('orders');
  const didChangeSite = (e)=>{
    if (site !== e.target.value.toLowerCase()){
      console.log('uncheck')
      setSite(e.target.value.toLowerCase());
      return true;
    }
    return false;
  }

  const content = (
    <div className="admin-sidebar-container">
        <img className="sidebar-logo" src={Logo} />
        <form className="select-site-container">
            <AdminSiteSelector onClickFunction={{didChangeSite}} title="Orders" checkedLogo={CartOrange} logo={Cart}/>
            <AdminSiteSelector onClickFunction={{didChangeSite}} title="Products" checkedLogo={ProductLogoOrange} logo={ProductLogo}/>
        </form>
    </div>
  );
  return content;
}

export default AdminSidebar;