import React from 'react';
import './OrderStatus.css';
const OrderStatus = ({status})=>{

  const content = (
    <div className="order-status-container">
      {status === 0 &&
          <div className="order-status-holder pending">
            <div className="order-status-content">Pending</div>
          </div>
      }
      {status === 1 &&
          <div className="order-status-holder completed">
            <div className="order-status-content">Completed</div>
          </div>
      }
      {status === -1 &&
          <div className="order-status-holder cancelled">
            <div className="order-status-content">Cancelled</div>
          </div>
      }
    </div>
  );
  return content;
}

export default OrderStatus;