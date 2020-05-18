import React, { createRef } from 'react';
import './QuantitySelector.css';
const QuantitySelector = ({quantityValue=1, onChangeFunction = ()=>{}, onClickLeftBtnFunction=()=>{}, onClickRightBtnFunction = ()=>{}, componentId='' })=>{

  const parentElementRef = createRef();
  const content = (
    <span ref={parentElementRef} id={componentId} className="change-quantity-holder">
      <button onClick={(e)=>onClickLeftBtnFunction(parentElementRef)} className="increase change-quantity-btn">+</button>
      <input 
            type="number" 
            className="quantity-selector" 
            value={quantityValue}
            onChange={e=>onChangeFunction(e, parentElementRef)}/>
      <button onClick={(e)=>onClickRightBtnFunction(parentElementRef)} className="decrease change-quantity-btn">-</button>
    </span>
  );
  return content;
}
export default QuantitySelector;
