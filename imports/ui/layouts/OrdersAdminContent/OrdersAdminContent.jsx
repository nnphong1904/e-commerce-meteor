import React from 'react';
import OrdersTable from '../../components/OrdersTable/OrdersTable.jsx';
import './OrdersAdminContent.css';
const OrdersAdminContent = ()=>{
  const content = (
    <div className="orders-admin-table-container">
      <OrdersTable/>
    </div>
  )
  return content;
}

export default OrdersAdminContent;