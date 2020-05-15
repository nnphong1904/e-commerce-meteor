import React from 'react';
import './ProductProfile.css';

const ProductProfile = ({product={}}) =>{
  
  const content = (
    <div className="profile-holder">
      <img className="profile-avatar" src="https://i.pinimg.com/564x/d4/e4/c5/d4e4c544d7e000597ecfc510c268d2d2.jpg"/>
      <div className="profile-name">Dummy Data</div>
    </div>
  );
  return content;
}
export default ProductProfile;