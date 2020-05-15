import React from 'react';
import './QuantitySelector.css';
const QuantitySelector = ({quantityValue=1, onChangeFunction = ()=>{}, onClickLeftBtnFunction=()=>{}, onClickRightBtnFunction = ()=>{} })=>{

  const content = (
    <span className="change-quantity-holder">
      <button onClick={onClickLeftBtnFunction} className="increase change-quantity-btn">+</button>
      <input 
            type="number" 
            className="quantity-selector" 
            value={quantityValue}
            onChange={e=>onChangeFunction(e)}/>
      <button onClick={onClickRightBtnFunction} className="decrease change-quantity-btn">-</button>
    </span>
  );
  return content;
}
export default QuantitySelector;
