import React from 'react';
import './ProductHolder.css';
const ProductHolder = ({product})=>{
  const content = (
    <div className="product-holder">
        <img src={product.avt} className="product-avatar"/>
        <div className="product-holder-name">{product.name}</div>
    </div>
  );
  return content;
}
export default ProductHolder;