import React, { useState, createRef } from 'react';
import './QuantityInput.css';
import CircleCancel from '../../assets/image/circle-cancel.svg';

const QuantityInput = ({updateQuantityList = ()=>{}})=>{
  const [listQuantity, setListQuantity] = useState([])
  const [inputtingValue, setInputtingValue] = useState('');

  const quantityListRef = createRef();
  const inputQuantityRef = createRef();

  const cancelQuantityValue = (e)=>{
    const quantityValueIndex = parseInt(e.target.id);
    const newListQuantity = [...listQuantity.slice(0, quantityValueIndex),
                             ...listQuantity.slice(quantityValueIndex+1)
                            ];
    setListQuantity([...newListQuantity]);
    updateQuantityList([...newListQuantity]);
                          
  }

  const onChangeHandler = (e)=>{
    setInputtingValue(e.target.value);
  }

  const onKeyUpHandler = (e)=>{
    if (e.keyCode === 13){
      if (e.target.value === ''){
        return;
      }
      setListQuantity([...listQuantity, inputtingValue]);
      updateQuantityList([...listQuantity, inputtingValue])
      setInputtingValue('');
      console.log(quantityListRef.current.offsetWidth);
      inputQuantityRef.current.style['padding-left'] = quantityListRef.current.offsetWidth + 44;
    }
    
  }
  const content = (
    <label className="quantity-input-holder">
      <input 
        ref={inputQuantityRef}
        onKeyUp={e=>{
          onKeyUpHandler(e);
        }}
        type="number" 
        className="quantity-input" 
        onChange={(e)=>{onChangeHandler(e)}} 
        value={inputtingValue}/>
      <div ref={quantityListRef} className="quantity-value-holder" >
        {
          listQuantity.map((quantity, quantityIndex)=>{
          const content = (
            <div key={quantityIndex} className="quantity-value">
              <span>{`${quantity}`}</span>
              <img onClick={e=>{cancelQuantityValue(e)}} id={quantityIndex} className="circle-cancel-icon" src={CircleCancel}/>
            </div>
            );
          return content;
          })
        }
     </div>
      
    </label>
  );
  return content;
}
export default QuantityInput;