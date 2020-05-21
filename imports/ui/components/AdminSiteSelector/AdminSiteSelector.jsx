import React, { useState, useEffect, createRef } from 'react';
import './AdminSiteSelector.css';

const AdminSiteSelector = ({onClickFunction = ()=>{} ,checkedLogo='' ,title='', logo=''})=>{
  
  const ref = createRef();
  const [checked, setChecked] = useState(false);
  const changeColorLogo = (e)=>{
   
  }
  const content =(  
    <label   
        className="admin-site-selector-holder">
      <input onClick={(e)=>{
       
      }} 
      value={title}  
      name="site-admin" type='radio' className="site-checker"/> 
         <img ref={ref}  className="site-logo" src={logo}/>  
      <div className="site-title">{title}</div>  
    </label>
  );
  return content; 
}
export default AdminSiteSelector;