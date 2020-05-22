import React from 'react';
import './ChangeStatusAction.css';
const ChangeStatusAction = ()=>{
  const content = (
    <div className="change-order-status-holder">
        <div className="mark-status-holder">
            <div className="complete-icon"></div>
            <div className="complete-title">Mark as Completed</div>
        </div>
        <div className="mark-status-holder">
            <div className="canceled-icon"></div>
            <div className="canceled-title">Mark as Canceled</div>
        </div>
    </div>
  );
  return content;
}
export default ChangeStatusAction;