import React, {useContext} from 'react';
import ProductsTable from '../../components/ProductsTable/ProductsTable.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import './CartPage.css';

const CartPage = ({myCart})=>{
  const content = (
  <div className="cart-page-container">
    <div className="cart-page-header">MY BAG</div>
    <div className="table-container">
      <ProductsTable productList={myCart} />
    </div>
  </div>
  );
  return content;
}
export default withTracker(()=>{
  return {myCart: Session.get('myCart')}
})(CartPage);