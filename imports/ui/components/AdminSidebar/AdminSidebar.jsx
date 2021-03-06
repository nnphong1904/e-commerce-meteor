import React, { createRef, useState, useEffect } from 'react';
import './AdminSidebar.css';
import Logo from '../../assets/image/logo.svg';
import AdminSiteSelector from '../AdminSiteSelector/AdminSiteSelector.jsx';
import Cart from '../../assets/image/orders-dark.svg';
import ProductLogo from '../../assets/image/products.svg';
import CartOrange from '../../assets/image/orders-orange.svg';
import ProductLogoOrange from '../../assets/image/products-orange.svg';

const AdminSidebar = (props)=>{
  
  console.log('sidebar');
  const navigate = (url)=>{
    FlowRouter.go(url);
  }
  const siteSelectorRef = createRef();
  const [site, setSite] = useState(window.history.state.path.split('/')[2]);

  const content = (
    <div className="admin-sidebar-container">
        <img className="sidebar-logo" src={Logo} />
        <form ref={siteSelectorRef} className="select-site-container">
            <AdminSiteSelector onClickFunction={{setSite, navigate}} checkedInitial={true} currentSite={site} title="Orders" checkedLogo={CartOrange} logo={Cart}/>
            <AdminSiteSelector onClickFunction={{setSite, navigate}} currentSite={site}  title="Products" checkedLogo={ProductLogoOrange} logo={ProductLogo}/>
        </form>
    </div>
  );
  return content;
}

export default React.memo(AdminSidebar);