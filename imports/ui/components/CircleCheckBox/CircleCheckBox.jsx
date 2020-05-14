import React from 'react';
import './CircleCheckBox.css';
const CircleCheckBox = ({title='', id ='', value='', onClickFunction=()=>{}})=>{

  const content = (
    <label className="circle-checkbox-holder">
      <input  
        onClick={(e)=>{
                  onClickFunction(e);
                  }}
        className="circle-checkbox"
        type="checkbox"
        value={value}/>
          <span id={id} className="circle-check-mark">{title}</span> 
      </label>             
  )
  return content;
}
export default CircleCheckBox;