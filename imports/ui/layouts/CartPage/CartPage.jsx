import React from 'react';
import ProductsTable from '../../components/ProductsTable/ProductsTable.jsx';
import './CartPage.css';

const CartPage = ()=>{
  const content = (
  <div className="cart-page-container">
    <div className="cart-page-header">MY BAG</div>
    <div className="table-container">
      <ProductsTable/>
    </div>
  </div>
  );
  return content;
}
export default CartPage;