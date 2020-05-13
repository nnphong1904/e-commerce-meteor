import React, { useState } from 'react';
import './ProductPage.css';
const ProductCard = ({product})=>{
  const goProductInfo = (product)=>{
    FlowRouter.go(`/products/${product.name}`,product);
    FlowRouter.setQueryParams({product});
  }
  const noItems = product.sizes.reduce(((sum, sizeObj)=> sum + sizeObj.noItems),0);
  const content = (
    <div onClick={()=>goProductInfo(product)} className="product-card-container">
      {noItems === 0 && <div className="out-stock-notify">Sold Out</div>}
      <img className="product-avt" src={product.avt}/>
      <div className="product-name">{product.name}</div>
      <div className="product-price">{`$${product.price}`}</div>
    </div>
  )
  return content;
}

export default ProductCard;