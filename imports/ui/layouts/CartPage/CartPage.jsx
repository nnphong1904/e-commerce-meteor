import React  from 'react';
import ProductsTable from '../../components/ProductsTable/ProductsTable.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import './CartPage.css';

const CartPage = ({myCart, cartSize, subtotal})=>{
  const increaseQuantityInCart = (e, ref)=>{
    console.log(ref.current.id);
  }
  const decreaseQuantityInCart = (e, ref)=>{
    console.log(ref.current.id);
  }
  const content = (
  <div className="cart-page-container">
    <div className="cart-page-header">MY BAG</div>
    <div className="table-container">
      <ProductsTable onClickFunction={{increaseQuantityInCart, decreaseQuantityInCart}} productList={myCart} />
    </div>
    <div className="bill-holder">
      <div className="bill-holder-header">Total</div>
      <div className="bill-info">
        <div className="bill-info-details">
          <div className="ship-handling">Shipping & Handling: <span className="ship-handling-price">Free</span></div>
          <div className="total-product">Total product: <span className="total-product-value">{cartSize}</span></div>
          <div className="subtotal">Subtotal: <span className="subtotal-value">{`$${subtotal}`}</span></div>
        </div>
        <button className="check-out-btn">Check out</button>
      </div>
    </div>
  </div>
  );
  return content;
}
export default withTracker(()=>{
  return {
    myCart: Session.get('myCart'),
    cartSize: Session.get('myCart').reduce((sumQuantity, productInCart)=>sumQuantity + productInCart.quantity, 0),
    subtotal: Session.get('myCart').reduce((subtotalValue, productInCart)=>subtotalValue+(productInCart.price*productInCart.quantity), 0)
  }
})(CartPage);