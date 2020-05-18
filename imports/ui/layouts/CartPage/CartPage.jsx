import React, { useState }  from 'react';
import ProductsTable from '../../components/ProductsTable/ProductsTable.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import { increaseQuantityInCart, decreaseQuantityInCart, removeItemFromCart, clearCart, changeQuantityInCartByTyping} from '../../lib/CartHelperFunction.js';
import shortid from 'shortid';
import './CartPage.css';



const CartPage = ({currentUser, myCart, cartSize, subtotal})=>{

  const [addToCartMessageError, setAddToCartMessageError] = useState('');
  const [addToCartMessageSuccess, setAddToCartMessageSuccess] = useState('');
  console.log(addToCartMessageError);
  const checkoutOrder = (order)=>{
    let newOrderObj = {};
    if (!currentUser){
      console.log('must login');
      setAddToCartMessageError('You must login to check out order');
      setAddToCartMessageSuccess('');
      return ;
    }
    if (myCart.length === 0){
      console.log('now item in cart');
      setAddToCartMessageError('There is no items in cart');
      setAddToCartMessageSuccess('');
      return;
    }const orderId = shortid.generate();
    newOrderObj.userEmail = currentUser.emails[0].address;
    newOrderObj.orderDetails = JSON.stringify(myCart);
    newOrderObj.status = 0;
    newOrderObj.subtotal = subtotal;
    newOrderObj.orderId = orderId;
    console.log(newOrderObj);
    Meteor.call('addOrder', newOrderObj,(err, docs)=>{
      if (!err){
        console.log('add order success');
        console.log(docs);
      }
    })
    const orderDetailsForEmail = myCart.map((item)=>`
        [ Product name: ${item.name}
          Product color: ${item.color}
          Product quantity: ${item.quantity}
          Product size: ${item.size} ]
          `)
    const mailContent = `
      Order ID: ${orderId};
      Customer email:${newOrderObj.userEmail}
      Order details: ${orderDetailsForEmail}
      Subtotal: ${newOrderObj.subtotal}
    `;
    Meteor.call('sendEmailToSeller',{orderId: orderId, orderDetails: mailContent});
    setAddToCartMessageSuccess('You created an order');
    setAddToCartMessageError('');
    clearCart();
  }
  
  const content = (
  <div className="cart-page-container">
    <div className="cart-page-header">MY BAG</div>
    <div className="table-container">
      <ProductsTable onClickFunction={{removeItemFromCart, increaseQuantityInCart, decreaseQuantityInCart}} onChangeFunction={{changeQuantityInCartByTyping}} productList={myCart} />
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
        <div className="add-to-cart-message">
          {addToCartMessageError !== '' && <div className="add-to-cart-message-error">{addToCartMessageError}</div>}
          {addToCartMessageSuccess !== '' && <div className="add-to-cart-message-success">{addToCartMessageSuccess}</div>}
        </div>
              
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