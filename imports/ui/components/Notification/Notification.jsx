import React from 'react';
import './Notification.css';

const Notification = ({text='', onClickFunction=()=>{}})=>{
  console.log(onClickFunction);
  const content =(
    <div className="notification-overlay">
      <div className="notification-container">
        <div className="notification-holder">
            <div className="notification-content">Are you sure to cancelled order?</div>
            <button onClick={onClickFunction} className="notification-button">Confirm</button>
        </div>
      </div>
    </div>
  );
  return content;
}

export default Notification