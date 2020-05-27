import React, { useState, useEffect }  from 'react';
import ProductsTable from '../../components/ProductsTable/ProductsTable.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import {increaseQuantityInCart, decreaseQuantityInCart, removeItemFromCart, clearCart, changeQuantityInCartByTyping} from '../../lib/CartHelperFunction.js';
import shortid from 'shortid';
import './CartPage.css';
import Cancel from '../../assets/image/cancel.svg';
import Notification from '../../components/Notification/Notification.jsx';
import OrderStatus from '../../components/OrderStatus/OrderStatus.jsx';

const CartPage = ({currentUser, myCart, cartSize, subtotal})=>{
  const [myOldOrders, setMyOldOrders] = useState([]);
  const [orderIdBeingCancelled, setOrderIdBeingCancelled] = useState('');
  const [showNotificationForConfirmCancelledOrder, setShowNotificationForConfirmCancelledOrder] = useState(false);
  const [addToCartMessageError, setAddToCartMessageError] = useState('');
  const [addToCartMessageSuccess, setAddToCartMessageSuccess] = useState('');
  useEffect(() => {
    // const timeout = setTimeout(() => {
    //   console.log('interval');
    //     setAddToCartMessageError('');
    //     setAddToCartMessageSuccess('');
    //     clearTimeout(timeout);
    // }, 3000);
    
    if (!currentUser){
      return;
    }
   
    Meteor.call('fetchOrder', currentUser.emails[0].address, (err, docs)=>{
      setMyOldOrders([...docs.data]);
      console.log(docs.data);
    })
    // return () => clearInterval(interval);
  }, [currentUser])

  const cancelOrder = (orderId)=>{
    const myNewOrdersList = myOldOrders.filter(order => order.orderId !== orderId);
    setMyOldOrders([...myNewOrdersList]);
    
    Meteor.call('canceledOrder', orderId);
    Meteor.call('sendEmailToSeller', {orderId:orderId});
  }

  const confirmToCancelledOrderFunction = ()=>{
    setShowNotificationForConfirmCancelledOrder(false);
    cancelOrder(orderIdBeingCancelled);
  }
  

  const onClickCanceledOrderButton = (e)=>{
    if (showNotificationForConfirmCancelledOrder === false){
      setShowNotificationForConfirmCancelledOrder(true);
      setOrderIdBeingCancelled(e.target.id);
      return;
    }
  }

  const checkoutOrder = (order)=>{
    let newOrderObj = {};
    if (!currentUser){
      console.log('must login');
      setAddToCartMessageError('You must login to check out order');
      setAddToCartMessageSuccess('');
      const timeout = setTimeout(() => {
        console.log('interval');
          setAddToCartMessageError('');
          setAddToCartMessageSuccess('');
          clearTimeout(timeout);
      }, 2000);
      return ;
    }
    if (myCart.length === 0){
      console.log('now item in cart');
      setAddToCartMessageError('There is no items in cart');
      setAddToCartMessageSuccess('');
      const timeout = setTimeout(() => {
        console.log('interval');
          setAddToCartMessageError('');
          setAddToCartMessageSuccess('');
          clearTimeout(timeout);
      }, 2000);
      return;
    }
    const orderId = shortid.generate();
    myCart.forEach(
      item =>{
        Meteor.call('updateSoldValue', item.productId, item.quantity, (err, result)=>{
          console.log(result);
        })
      }
    );
    newOrderObj.userEmail = currentUser.emails[0].address;
    newOrderObj.orderDetails = JSON.stringify(myCart);
    newOrderObj.status = 0;
    newOrderObj.subtotal = subtotal;
    newOrderObj.orderId = orderId;
    newOrderObj.createAt = Date.now();
   
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
    const timeout = setTimeout(() => {
        console.log('interval');
          setAddToCartMessageError('');
          setAddToCartMessageSuccess('');
          clearTimeout(timeout);
      }, 2000);
  }
  
  const content = (
  <>
    {showNotificationForConfirmCancelledOrder && <Notification onClickFunction={confirmToCancelledOrderFunction}/>}
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
        {currentUser && 
         
            <div className="my-orders-list">
                <div className="my-orders-list-header">
                  <div className="orders-list-header-id">Order ID</div>
                  <div className="orders-list-header-status">Status</div>
                  <div className="orders-list-header-status">Cancel</div>
                </div>
                <div className="my-orders-list-body">
                  {myOldOrders.map((order, orderIndex)=>{
                    const content = (
                      <div key={orderIndex} className="order-item-holder">
                          <div className='my-order-id'>{order.orderId}</div>
                          <div className='my-order-status'>
                            <div className="order-status-wrapper">
                              <OrderStatus status={order.status} />
                            </div>
                          </div>
                          {
                            order.status === 0 && 
                              <div >
                                 <img onClick={(e)=>onClickCanceledOrderButton(e)} id={order.orderId} className='cancel-order-button' src={Cancel}/>
                              </div>
                          }
                          {
                            order.status !== 0 && 
                              <div >
                                 
                              </div>
                          }
                      </div>
                    );
                    return content;
                  })}
                </div>
         </div>  } 
      </div>
  </>
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