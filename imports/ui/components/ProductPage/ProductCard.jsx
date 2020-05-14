import React, { useState } from 'react';
import arrayBufferToHex from 'array-buffer-to-hex';
import './ProductPage.css';
const ProductCard = ({product})=>{
  
  const goProductInfo = (product)=>{
      const productId = product._id._bsontype === 'ObjectID' ? arrayBufferToHex(product._id.id) : product._id._str;
      console.log(productId);
      FlowRouter.go(`/products/${productId}`);

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