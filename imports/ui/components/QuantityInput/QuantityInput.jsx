import React, { useState, createRef } from 'react';
import './QuantityInput.css';

const QuantityInput = ()=>{
  const [listQuantity, setListQuantity] = useState([])
  const [inputtingValue, setInputtingValue] = useState('');

  const quantityListRef = createRef();
  const inputQuantityRef = createRef();
  const onChangeHandler = (e)=>{
    setInputtingValue(e.target.value);
  }

  const onKeyUpHandler = (e)=>{
    if (e.keyCode === 13){
      setListQuantity([...listQuantity, inputtingValue]);
      setInputtingValue('');
      console.log(quantityListRef.current.offsetWidth);
      inputQuantityRef.current.style['padding-left'] = quantityListRef.current.offsetWidth + 44;
    }
    
  }
  const content = (
    <label className="quantity-input-holder">
      <div ref={quantityListRef} className="quantity-value-holder" >
        {
          listQuantity.map((quantity, quantityIndex)=>{
          const content = (<div key={quantityIndex} className="quantity-value">{`${quantity}`}</div>);
          return content;
          })
        }
     </div>
      <input 
        ref={inputQuantityRef}
        onKeyUp={e=>{
          onKeyUpHandler(e);
        }}
        type="text" 
        className="quantity-input" 
        onChange={(e)=>{onChangeHandler(e)}} 
        value={inputtingValue}/>
    </label>
  );
  return content;
}
export default QuantityInput;