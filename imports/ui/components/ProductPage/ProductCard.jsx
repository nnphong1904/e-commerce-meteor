import React from 'react';
import './ProductPage.css';
const ProductCard = ({product})=>{
  const goProductInfo = (product)=>{
    FlowRouter.go(`/products/${product.name}`);
  }
  const content = (
    <div onClick={()=>goProductInfo(product)} className="product-card-container">
      <img className="product-avt" src={product.avt}/>
      <div className="product-name">{product.name}</div>
      <div className="product-price">{`$${product.price}`}</div>
    </div>
  )
  return content;
}

export default ProductCard;