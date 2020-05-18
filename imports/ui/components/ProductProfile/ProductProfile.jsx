import React from 'react';
import './ProductProfile.css';

const ProductProfile = ({productAvatar, productName}) =>{
  
  const content = (
    <div className="profile-holder">
      <img className="profile-avatar" src={productAvatar}/>
      <div className="profile-name">{productName}</div>
    </div>
  );
  return content;
}
export default ProductProfile;