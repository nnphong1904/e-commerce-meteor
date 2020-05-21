import React, { useState, useEffect, createRef } from 'react';
import './AdminSiteSelector.css';

const AdminSiteSelector = ({onClickFunction = ()=>{}, checkedInitial=false ,currentSite='orders' ,checkedLogo='' ,title='', logo=''})=>{
  const ref = createRef();
  console.log('chowp')
  const [checked, setChecked] = useState(checkedInitial);
  useEffect(()=>{
    if (currentSite !== title.toLowerCase()){
      setChecked(false);
    }
  },[currentSite])
  

  const content =(  
    <label   
        className="admin-site-selector-holder">
      <input onClick={(e)=>{
        setChecked(true);
        onClickFunction(title.toLowerCase());
      }} 
      value={title}  
      name="site-admin" type='radio' className="site-checker"/> 
          <img ref={ref}  className="site-logo" src={checked === true? checkedLogo : logo}/>
      <div className="site-title">{title}</div>  
    </label>
  );
  return content; 
}
export default AdminSiteSelector;