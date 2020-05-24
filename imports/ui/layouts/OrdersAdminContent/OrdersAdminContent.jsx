import React, {useEffect, useState} from 'react';
import OrdersTable from '../../components/OrdersTable/OrdersTable.jsx';
import { withTracker } from 'meteor/react-meteor-data';

import './OrdersAdminContent.css';



const OrdersAdminContent = ({orders})=>{
  // console.log(orders);
  const [ordersList, setOrdersList] = useState([]);
  const fetchOrders = async ()=>{
   await Meteor.call('fetchAllOrders', {}, (err, result)=>{
      if (!err){
       setOrdersList([...result.data]);
      }     
      else {
        console.log(err);
      }     
   })
  }
  useEffect(()=>{
    Meteor.call('fetchAllOrders', {}, (err, result)=>{
      if (!err){
       setOrdersList([...result.data]);
      }     
      else {
        console.log(err);
      }     
   });
  },[])

  const content = (
    <div className="orders-admin-table-container">
      <OrdersTable ordersList={ordersList} /> 
    </div>
  )
  return content;
}

export default withTracker(
   ()=>{
   return {
     
   }
  }
)(OrdersAdminContent);