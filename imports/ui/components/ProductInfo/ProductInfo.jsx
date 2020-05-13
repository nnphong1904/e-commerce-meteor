import React, { useState } from 'react';
import './ProductInfo.css';
import classnames from 'classnames';

const SIZE_LIST = ['S', 'M', 'L'];
const COLOR_LIST = [  
  {colorId:'wild-watermelon', colorValue: 'wild watermelon'}, 
  {colorId:'sunglow', colorValue:'sunglow'},
  {colorId:'neon-blue', colorValue:'neon blue'}, 
  {colorId:'payne-grey', colorValue: `payne's grey`}, 
  {colorId:'white-smoke', colorValue:'white smoke'},
];
const calNumberOfItem = (sizeList)=>{
  return  sizeList.reduce((numberItem, size)=>numberItem + parseInt(size.noItems), 0);
}
const getNumberOfItemEachSize = (size, product)=>{
  let sizeAndNumberOfItem;
  if (product !== undefined)
  {
    sizeAndNumberOfItem = product.sizes;
   // console.log(sizeAndNumberOfItem[0].size);
    const result = sizeAndNumberOfItem.filter(sizeObj => sizeObj.size === size);
    return result.length > 0 ? result[0].noItems : 0;
  }
}
const ProductInfo = ({product})=>{
//  console.log(product);
  const [productQuantity, setProductQuantity] = useState(0);

  const changProductQuantity = (e)=>{
    setProductQuantity(e.target.value);
  }
  const increaseQuantity = ()=>{
    let numberOfItem;
    if (product.numberOfItem)
    {
      numberOfItem = product.numberOfItem;
    }
    else {
      numberOfItem = calNumberOfItem(product.sizes)
    }
    if (productQuantity<numberOfItem)
    {
        setProductQuantity(oldQuantity => oldQuantity + 1);
    }
  }
  const decreaseQuantity = ()=>{
    if (productQuantity>0)
    {
      setProductQuantity(oldQuantity => oldQuantity - 1);
    }
  }
  const content = (
    <div className="product-info-container">
      <div className="product-info-details">
       <div className="product-view">
         <img className="image-view" src={product.avt}/>
         <img className="image-view" src={product.avt}/>
         <img className="image-view" src={product.avt}/>
         <img className="image-view" src={product.avt}/>
       </div>
       <div className="big-image-view">
         <img className="big-image" src={product.avt}/>
       </div>
       <div className="product-info">
         <div className="product-name">{product.name}</div>
         <div className="product-price">{`$${product.price}`}</div>
         <div className="product-size">
            <div>Size</div>
            <form className="size-selector-holder">
              {SIZE_LIST.map((size, sizeIndex)=>{
                  console.log(getNumberOfItemEachSize(size, product));
                        const content = (
                          <label key={sizeIndex}> 
                            {getNumberOfItemEachSize(size, product) === 0 &&
                              <input
                                className= "size-selector"
                                type="radio"
                                name="size-selector"
                                value={size}
                                disabled={true}
                              />
                            }
                            {
                              getNumberOfItemEachSize(size, product) > 0 &&
                              <input
                                className= "size-selector"
                                type="radio"
                                name="size-selector"
                                value={size}
                              />
                            }
                            <span className={classnames('size-name', {'disabled':getNumberOfItemEachSize(size, product) === 0})}>{size}</span>
                          </label>
                        )
                        return content;
              })}
            </form>
         </div>
         <div className="product-color">
            <div>Color</div>
            {
              COLOR_LIST.map((color, colorIndex)=>{
                const content = (
                  <label key={colorIndex} className="color-picker-details">
                    <input  
                            className="check-boxed"
                             type="checkbox"
                            value={color.colorValue}
                            />
                      <span id={color.colorId} className="check-mark"></span> 
                  </label>             
                )
                return content;
              })
            }
         </div>
         <div className="product-quantity">
             <span>Quantity</span>
             <span className="change-quantity-holder">
                    <button onClick={increaseQuantity} className="increase change-quantity-btn">+</button>
                    <input 
                      type="number" 
                      className="quantity-selector" 
                      value={productQuantity}
                      onChange={e=>changProductQuantity(e)}
                      />
                    <button onClick={decreaseQuantity} className="decrease change-quantity-btn">-</button>
              </span>
          </div>
          <button className="add-to-cart-btn">Add to cart</button>
          <div className="horizontal-line"></div>
        </div>
        <div className="product-view same-brand-list ">
          <div className="same-brand">
            <div>Move from</div>
            <div className="brand">{product.branch.charAt(0).toUpperCase() + product.branch.slice(1)}</div>
          </div>
          <img className="image-view same-branch-product" src={product.avt}/>
          <img className="image-view same-branch-product" src={product.avt}/>
          <img className="image-view same-branch-product" src={product.avt}/>
          <img className="image-view same-branch-product" src={product.avt}/>
        </div>
      </div> 
    </div>
  );
  return content;
}

export default ProductInfo;