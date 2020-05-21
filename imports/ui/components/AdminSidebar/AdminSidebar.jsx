import React, { createRef, useState, useEffect } from 'react';
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
  useEffect(()=>{
    siteSelectorRef.current.children[0].children[0].checked = true;
    // siteSelectorRef.current.children[0].children[1].src = CartOrange;
  },[])

  const content = (
    <div className="admin-sidebar-container">
        <img className="sidebar-logo" src={Logo} />
        <form ref={siteSelectorRef} className="select-site-container">
            <AdminSiteSelector onClickFunction={setSite} checkedInitial={true} currentSite={site} title="Orders" checkedLogo={CartOrange} logo={Cart}/>
            <AdminSiteSelector onClickFunction={setSite} currentSite={site}  title="Products" checkedLogo={ProductLogoOrange} logo={ProductLogo}/>
        </form>
    </div>
  );
  return content;
}

export default AdminSidebar;