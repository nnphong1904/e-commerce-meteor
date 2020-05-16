import React from 'react';
import './CircleCheckBox.css';
const CircleCheckBox = ({title='', typeInput='checkbox', 
isDisabled=false, id ='', value='', name='input-circle' ,onClickFunction=()=>{}})=>{

  const content = (
    <label className="circle-checkbox-holder">
      <input  
        onClick={(e)=>{
                  onClickFunction(e);
                  }}
        className="circle-checkbox"
        name={name}
        type={typeInput}
        disabled={isDisabled}
        value={value}/>
        { isDisabled && <span id={id} className="circle-check-mark disabled">{title}</span> }
        { !isDisabled && <span id={id} className="circle-check-mark">{title}</span> }
      </label>             
  )
  return content;
}
export default CircleCheckBox;