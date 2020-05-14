import React, { useState } from 'react';
import './RangeSelector.css';
const RangeSelector = (
    {
      value1=0, value2=10, 
      onClickFnc = ()=>{}, 
      onMouseUpFnc = ()=>{}, 
    })=>{

  const [currentValue1, setCurrentValue1] = useState(value1);
  const [currentValue2, setCurrentValue2] = useState(value2);

  const onChangeHandler = (e, setState)=>{
    setState(e.target.value);
  }
  const content = (
    <div className="range-slider-holder">
      <input  
            id="range-slider-1"
            type="range" 
            onClick={(e)=>console.log(e.target)}
            onMouseUp={()=>onMouseUpFnc(e, parseInt(currentValue1), parseInt(currentValue2))} 
            onChange={(e)=>{onChangeHandler(e, setCurrentValue1)}} 
            min="39" max="300" 
            className="range-slider" 
            value={currentValue1}/>
      <input  
            id="range-slider-2"
            type="range" 
            onClick={(e)=>console.log(e.target)}
            onMouseUp={()=>onMouseUpFnc(e, parseInt(currentValue1), parseInt(currentValue2))} 
            onChange={(e)=>{onChangeHandler(e, setCurrentValue1)}} 
            min="39" max="300" 
            className="range-slider" 
            value={currentValue2}/>
      <div className="price-text-holder">
            <div className="min-price">{
              parseInt(currentValue1) < parseInt(currentValue2) ? currentValue1 : currentValue2}
            </div>
            <div className="max-price">{
              parseInt(currentValue1) >= parseInt(currentValue2) ? currentValue1 : currentValue2}
            </div> 
      </div>
    </div>
  );
  return content;
}

export default RangeSelector;