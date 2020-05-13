import React, { useState, useEffect } from 'react';
import './ProductInfo.css';
import { withTracker } from 'meteor/react-meteor-data';
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
const ProductInfo = ({product, currentUser})=>{
//  console.log(product);
  console.log(currentUser);
  const [productQuantity, setProductQuantity] = useState(0);
  const [listProductSameBrand, setListProductSameBrand] = useState([]);

  useEffect(() => {
    Meteor.call('fetchProduct', {branch: [product.branch]}, (err, docs)=>{
      setListProductSameBrand([...docs.data.slice(0,4)]);
    })
  }, [product])

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
          <div className="info-of-model">
            <div className="size-of-model">{`Model wearing size ${product.sizes[0].size}`}</div>
          </div>
        </div>
        <div className="product-view same-brand-list ">
          <div className="same-brand">
            <div>Move from</div>
            <div className="brand">{product.branch.charAt(0).toUpperCase() + product.branch.slice(1)}</div>
          </div>
          {
            listProductSameBrand.map((product, productIndex) => <img key={productIndex} className="image-view same-branch-product" src={product.avt}/> )
          }
         </div>
      </div> 
      <div className="header">
          <hr className="decor-review-header"/>
          <div className="review-text">Reviews</div>
      </div>
      {
        currentUser &&
        <>
          <div className="post-review-area">
              <span className="you">You</span>
              <form className="form-comment">
                <input type="text" className="comment-title"/>
                <textarea className="comment-content"></textarea>
                <span className="rating-area">
                  <div className="rating-msg">Rating for us:</div>
                </span>
                <input className="submit-comment-btn" type='submit'/>
              </form>
         </div>
         <div className="horizontal-line"></div>
        </>
      }
       
       <div className="footer">

       </div>
    </div>
  );
  return content;
}

export default withTracker(()=>{
  return {
    currentUser: Meteor.user()
  }
})(ProductInfo);