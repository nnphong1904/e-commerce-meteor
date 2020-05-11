import React from 'react';
import './ProductPage.css';
const ProductCard = ({product})=>{
  const content = (
    <div className="product-card-container">
      <img className="product-avt" src={product.avt}/>
      <div className="product-name">{product.name}</div>
      <div className="product-price">{`$${product.price}`}</div>
    </div>
  )
  return content;
}

export default ProductCard;