import React, { useState, useEffect, Fragment } from 'react';
import './ProductInfo.css';
import arrayBufferToHex from 'array-buffer-to-hex';
import { withTracker } from 'meteor/react-meteor-data';
import classnames from 'classnames';
import StarRating from '../../components/StarRating/StarRating.jsx';
import CircleCheckBox from '../../components/CircleCheckBox/CircleCheckBox.jsx';
import InputRadio from '../../components/InputRadio/InputRadio.jsx';
import QuantitySelector from '../../components/QuantitySelector/QuantitySelector.jsx';
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
const BRAND_NAME = new Map([
  ['h&m','H&M'],
  ['zara','Zara'],
  ['pull&bear','Pull&bear'],
  ['dior','Dior'],
  ['chanel','chanel']
]);

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
const getDefaultSize = (product)=>{
  let getDefaultSize='';
  for (let i = SIZE_LIST.length; i>=0; i--){
    if (getNumberOfItemEachSize(SIZE_LIST[i], product)>0){
      getDefaultSize = SIZE_LIST[i];
      return getDefaultSize;
    }
  }
}
const ProductInfo = ({product, currentUser})=>{


  const [productQuantity, setProductQuantity] = useState(1);
  const [listProductSameBrand, setListProductSameBrand] = useState([]);
  const [productSize, setProductSize] = useState(getDefaultSize(product));

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
  
  console.log(productSize);

  const [didUserWriteReview, setDidUserWriteReview] = useState(false);
  const [recommendProductList, setRecommendProductList] = useState([]);


  useEffect(() => {
   
    Meteor.call('fetchProduct', {branch: [product.branch]}, (err, docs)=>{
      setListProductSameBrand([...docs.data.slice(0,4)]);
    });

    Meteor.call('fetchProduct', {category: product.category}, (err, docs)=>{
      setRecommendProductList([...docs.data.slice(0,8)]);
    })
    
  }, [product])
  

  const selectSize = (e)=>{
    if (e.target.value === productSize){
      e.target.checked = false;
      setProductSize('');
      return;
    }
    setProductSize(e.target.value);
  }

  const calNumberOfItem = (sizeList)=>{
    return  sizeList.reduce((numberItem, size)=>numberItem + parseInt(size.noItems), 0);
  }

  
  const goProductInfo = (product)=>{
    const id = arrayBufferToHex(product._id.id);
    FlowRouter.go(`/products/${id}`);
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
                    <Fragment key={sizeIndex}>
                       {getNumberOfItemEachSize(size, product) === 0 && 
                       <InputRadio  title={size} value={size} isDisabled={true} />}
                       {getNumberOfItemEachSize(size, product) > 0 && 
                       <InputRadio currentSize={productSize} isChecked={true} onClickFunction={selectSize} title={size} value={size} />}
                    </Fragment>
                   );
            
                   return content
              })
              
              }
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
                  <Fragment key={colorIndex}>
                    <CircleCheckBox id={color.colorId} />
                  </Fragment>
                );
                return content;
              })
            }
         </div>
         <div className="product-quantity">
             <span className="quantity-title">Quantity</span>
             <QuantitySelector 
                  onClickLeftBtnFunction={increaseQuantity} 
                  onClickRightBtnFunction={decreaseQuantity}
                  quantityValue={productQuantity}
                  onChangeFunction={changProductQuantity} />
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
            <div className="brand">{BRAND_NAME.get(product.branch)}</div>
          </div>
          {
            listProductSameBrand.map((product, productIndex) => <img 
              onClick={()=>goProductInfo(product)}
              key={productIndex} 
              className="image-view same-branch-product" 
              src={product.avt}/> )
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
                {(reviewTitle === ''  ) && 
                 <button 
                    onClick={submitReview}
                    className="submit-comment-btn" 
                    disabled 
                    type='submit'>Submit</button>}
                {( reviewTitle !== '') && 
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
                <div 
                    onClick={()=>goProductInfo(productRecommend)} key={index} className="product-recommend-view">
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