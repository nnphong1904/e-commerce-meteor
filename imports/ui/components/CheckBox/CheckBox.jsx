import React from 'react';
import './CheckBox.css';
const Checkbox = ({title='', isDisabled=false, value='' ,onClickFunction= ()=>{}})=>{

  const content = (
    <label className="check-box-holder">
                <span className="check-box-title">{title}</span>
                <input
                      onClick={(e)=>{
                        onClickFunction(e);
                      }} 
                      className="check-boxed"
                      type="checkbox"
                      disabled={isDisabled}
                      value={value}
                      />
               { !isDisabled && <span className="check-mark"></span>}
               { isDisabled && <span className="check-mark disabled"></span>}  
            </label>
  )
  return content;
}

export default Checkbox;