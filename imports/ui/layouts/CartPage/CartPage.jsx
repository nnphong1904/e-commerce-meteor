import React  from 'react';
import ProductsTable from '../../components/ProductsTable/ProductsTable.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import {increaseQuantityInCart, decreaseQuantityInCart, removeItemFromCart} from '../../lib/CartHelperFunction.js';
import './CartPage.css';



const CartPage = ({currentUser, myCart, cartSize, subtotal})=>{

  const checkoutOrder = (order)=>{
    let newOrderObj = {};
    if (!currentUser){
      console.log('must login');
      return ;
    }
    if (myCart.length === 0){
      console.log('now item in cart');
      return;
    }
    newOrderObj.userEmail = currentUser.emails[0].address;
    newOrderObj.orderDetails = JSON.stringify(myCart);
    newOrderObj.status = 0;
    newOrderObj.subtotal = subtotal;
    console.log(newOrderObj);
    Meteor.call('addOrder', newOrderObj,(err, docs)=>{
      if (!err){
        console.log('add order success');
        console.log(docs);
      }
    })
  }
  
  const content = (
  <div className="cart-page-container">
    <div className="cart-page-header">MY BAG</div>
    <div className="table-container">
      <ProductsTable onClickFunction={{removeItemFromCart, increaseQuantityInCart, decreaseQuantityInCart}} productList={myCart} />
    </div>
    <div className="bill-holder">
      <div className="bill-holder-header">Total</div>
      <div className="bill-info">
        <div className="bill-info-details">
          <div className="ship-handling">Shipping & Handling: <span className="ship-handling-price">Free</span></div>
          <div className="total-product">Total product: <span className="total-product-value">{cartSize}</span></div>
          <div className="subtotal">Subtotal: <span className="subtotal-value">{`$${subtotal}`}</span></div>
        </div>
        <button 
            onClick={(e)=>{
              checkoutOrder({})
              }} 
            className="check-out-btn">Check out</button>
      </div>
    </div>
  </div>
  );
  return content;
}
export default withTracker(()=>{
  return {
    currentUser: Meteor.user(),
    myCart: Session.get('myCart'),
    cartSize: Session.get('myCart').reduce((sumQuantity, productInCart)=>sumQuantity + productInCart.quantity, 0),
    subtotal: Session.get('myCart').reduce((subtotalValue, productInCart)=>subtotalValue+(productInCart.price*productInCart.quantity), 0)
  }
})(CartPage);