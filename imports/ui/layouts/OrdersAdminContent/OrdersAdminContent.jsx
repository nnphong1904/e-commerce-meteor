import React, {useEffect, useState} from 'react';
import OrdersTable from '../../components/OrdersTable/OrdersTable.jsx';
import TablePaginationActions from '../../components/TablePaginationActions/TablePaginationActions.jsx';
import './OrdersAdminContent.css';


const OrdersAdminContent = ()=>{
  const [ordersList, setOrdersList] = useState([]);
  useEffect(()=>{
      Meteor.call('fetchAllOrders', {}, (err, result)=>{
          setOrdersList([...result.data]);
      })
  },[])

  const content = (
    <div className="orders-admin-table-container">
      <OrdersTable ordersList={ordersList} /> 
    </div>
  )
  return content;
}

export default OrdersAdminContent;