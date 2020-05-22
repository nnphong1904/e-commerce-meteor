import React, {useEffect, useState} from 'react';
import OrdersTable from '../../components/OrdersTable/OrdersTable.jsx';
import './OrdersAdminContent.css';
import { withTracker } from 'meteor/react-meteor-data';
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