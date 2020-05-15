import React from 'react';
import './CartPage.css';
import CircleCheckBox from '../../components/CircleCheckBox/CircleCheckBox.jsx';
import ProductHolder from '../../components/ProductHolder/ProductHolder.jsx';
const CartPage = (props)=>{
  const fakeObject ={
    avt:'https://i.pinimg.com/564x/06/6b/40/066b401775f48d2e4ac886c387d21363.jpg',
    price:69.00,
    name:'Fake Product',
    sizes: [{size:'M', noItems:10}]
  };
  const content =(
    <div className="cart-page-container">
      <div className="cart-page-header">MY BAG</div>
      <div className="cart-page-container">
        <div className="products-list">
            <table className="product-list-table">
                <thead>
                  <tr className="products-list-header">
                    <th className="column-header">Product</th>
                    <th className="column-header">Color</th>
                    <th className="column-header">Size</th>
                    <th className="column-header">Quantity</th>
                    <th className="column-header">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="products-list-item">
                    <td className="product"><ProductHolder product={fakeObject}/></td>
                    <td className="color"><CircleCheckBox/></td>
                    <td className="size">S</td>
                    <td>10</td>
                    <td>{`$${fakeObject.price}`}</td>
                  </tr>
                </tbody>
            </table>
        </div>
        </div>
    </div>
  );
  return content;
}
export default CartPage;