import React, { useState } from 'react';
import './ChangeStatusAction.css';
const ChangeStatusAction = ({orderId, currentOrdersList, orderIndex, updateOrdersList})=>{
  const [currentOrderId] = useState(orderId);
  const changeOrderStatus = async (id, newStatus)=>{
    
    Meteor.call('changeOrderStatus', currentOrderId, newStatus, (err, result)=>{
      const currentOrder = {...currentOrdersList[orderIndex], status: newStatus};
      let newOrdersList = [
                ...currentOrdersList.slice(0,orderIndex),
                {...currentOrder},
                ...currentOrdersList.slice(orderIndex+1)
                ];
      updateOrdersList(newOrdersList);
    })
  }
  const content = (
    <div className="change-order-status-holder">
        <div 
          onClick={(e)=>{
             
             changeOrderStatus(currentOrderId, 1);
          }} 
          className="mark-status-holder">
            <div className="complete-icon"></div>
            <div className="complete-title">Mark as Completed</div>
        </div>
        <div 
            onClick={(e)=>{
              changeOrderStatus(currentOrderId, -1);
             }}
            className="mark-status-holder">
            <div className="canceled-icon"></div>
            <div className="canceled-title">Mark as Canceled</div>
        </div>
    </div>
  );
  return content;
}
export default ChangeStatusAction;