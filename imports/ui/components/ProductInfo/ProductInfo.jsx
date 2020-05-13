import React, { useState, useEffect } from 'react';
import './ProductInfo.css';
import { withTracker } from 'meteor/react-meteor-data';
import classnames from 'classnames';
import StarRating from './StarRating.jsx';


const SIZE_LIST = ['S', 'M', 'L'];
const COLOR_LIST = [  
  {colorId:'wild-watermelon', colorValue: 'wild watermelon'}, 
  {colorId:'sunglow', colorValue:'sunglow'},
  {colorId:'neon-blue', colorValue:'neon blue'}, 
  {colorId:'payne-grey', colorValue: `payne's grey`}, 
  {colorId:'white-smoke', colorValue:'white smoke'},
];

const MONTH = [
                'Jan', 'Feb', 'Mar', 
                'Apr', 'May', 'Jun', 
                'Jul', 'Aug', 'Sep', 
                'Oct', 'Nov', 'Dec'
              ];




const ProductInfo = ({product, currentUser})=>{
//  console.log(product);
  
  const [productQuantity, setProductQuantity] = useState(0);
  const [listProductSameBrand, setListProductSameBrand] = useState([]);

  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [ratingPoint, setRatingPoint] = useState(0);
  const [listReviews, setListReviews] = useState([
    {
      reviewTitle:'Test Review',
      reviewContent:`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      author: 'Phong Nguyen',
      createAt: '30 Jul',
      rating: 4
    }
  ])
  const [didUserWriteReview, setDidUserWriteReview] = useState(false);
  const [recommendProductList, setRecommendProductList] = useState([]);


  useEffect(() => {
    Meteor.call('fetchProduct', {branch: [product.branch]}, (err, docs)=>{
      setListProductSameBrand([...docs.data.slice(0,4)]);
    });

    Meteor.call('fetchProduct', {category: product.category}, (err, docs)=>{
      setRecommendProductList([...docs.data.slice(0,8)]);
      console.log(docs.data.slice(0,8));
    })
    
  }, [product])
  
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

  const updateRatingPoint = (ratingPoint)=>{
      setRatingPoint(ratingPoint);
  }

  const submitReview = ()=>{
    const author = currentUser.profile.name;
    const day = new Date();
    const date = day.getDate();
    const month = MONTH[day.getMonth()];
    const createAt = `${date} ${month}`;
    const review = {
      reviewTitle,
      reviewContent,
      author,
      createAt,
      rating: ratingPoint
    };
    setListReviews([...listReviews, {...review}]);
    setDidUserWriteReview(true);
    setReviewContent('');
    setReviewTitle('');
  }

  const onChangeHandler = (e, setState)=>{
    setState(e.target.value);
  }

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
            <form onSubmit={submitReview} className="size-selector-holder">
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
         <div className="product-rating"> 
          <StarRating rating={product.rating}/>
          <div className="number-of-reviews">{`${listReviews.length} Review`}</div>
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
            <div>More from</div>
            <div className="brand">{product.branch.charAt(0).toUpperCase() + product.branch.slice(1)}</div>
          </div>
          {
            listProductSameBrand.map((product, productIndex) => <img key={productIndex} className="image-view same-branch-product" src={product.avt}/> )
          }
         </div>
      </div> 
      <div className="header">
          <hr className="decor-header"/>
          <div className="header-text">Reviews</div>
      </div>
      {
        (currentUser && didUserWriteReview === false) &&
        <>
          <div className="post-review-area">
              <span className="you">You</span>
              <div className="form-comment">
                <input 
                    type="text" 
                    className="comment-title"
                    value={reviewTitle}
                    onChange={e=>onChangeHandler(e, setReviewTitle)}
                    />
                <textarea 
                    value={reviewContent}
                    onChange={e=>onChangeHandler(e, setReviewContent)}
                    className="comment-content"></textarea>
                <span className="rating-area">
                  <div className="rating-msg">Rating for us:</div>
                  <StarRating updateRatingPoint={updateRatingPoint}/>
                </span>
                {(reviewContent === '' && reviewTitle === '' && ratingPoint === 0 ) && 
                 <button 
                    onClick={submitReview}
                    className="submit-comment-btn" 
                    disabled 
                    type='submit'>Submit</button>}
                {(ratingPoint > 0 || reviewContent !== '' || reviewTitle !== '') && 
                  <button 
                    onClick={submitReview}
                    className="submit-comment-btn active-btn" 
                    type='submit'>Submit</button>}
              </div>
         </div>
         <div className="horizontal-line"></div>
        </>
      }
       <ul className="reviews-list">
          {
            listReviews.map((review, reviewIndex) => {
              const content = (
                <li className="review-item" key={reviewIndex}>
                        <div className="review-holder">
                          <div className="review-info">
                            <div className="review-author">{review.author}</div>
                            <div className="review-create-at">{review.createAt}</div>
                          </div>
                            <div className="review-title">{review.reviewTitle}</div>
                            <div 
                                className={
                                    classnames({
                                      'only-stars': review.reviewContent === '' && review.reviewTitle === ''
                                      })}>
                              <StarRating rating={review.rating}/>
                            </div>
                            <p className="review-content">{review.reviewContent}</p>
                        </div>
                        <div className="separate-line"></div>
                </li>
              )
              return content;
            })
          }
       </ul>
       <div className="header">
          <hr className="decor-header"/>
          <div className="header-text recommend-text">You may also like</div>
      </div>
      <div className="recommend-product-holder">
        { recommendProductList.length >0 &&
          recommendProductList.map((productRecommend, index)=>{
            const content = (
                <div key={index} className="product-recommend-view">
                  <img className="image-view" src={productRecommend.avt}/>
                  <div className="product-recommend-name">{productRecommend.name}</div>
                </div>
            );
            return content;
          })
        }
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