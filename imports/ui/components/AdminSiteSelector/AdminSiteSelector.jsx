import React, { useState, useEffect, createRef } from 'react';
import './AdminSiteSelector.css';
import { setRef } from '@material-ui/core';

const AdminSiteSelector = ({onClickFunction = ()=>{}, checkedInitial=false ,currentSite='orders' ,checkedLogo='' ,title='', logo=''})=>{
  const [checked, setChecked] = useState(currentSite === title.toLowerCase());
  const siteRef = createRef();
  useEffect(()=>{
    if (currentSite !== title.toLowerCase()){
      setChecked(false);
      siteRef.current.checked = false;
    }
    else {
      setChecked(true);
      siteRef.current.checked = true;
    }
  },[])
  

  const content =(  
    <label   
        
        className="admin-site-selector-holder">
      <input ref={siteRef} onClick={(e)=>{
        FlowRouter.go(`/admin/${title.toLowerCase()}`)
      }} 
      value={title}  
      name="site-admin" type='radio' className="site-checker"/> 
          <img className="site-logo" src={checked === true? checkedLogo : logo}/>
      <div className="site-title">{title}</div>  
    </label>
  );
  return content; 
}
export default AdminSiteSelector;