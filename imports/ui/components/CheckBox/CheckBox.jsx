import React from 'react';
import './CheckBox.css';
const Checkbox = ({title='', value='' ,onClickFunction= ()=>{}})=>{

  const content = (
    <label className="check-box-holder">
                <span className="check-box-title">{title}</span>
                <input
                      onClick={(e)=>{
                        onClickFunction(e);
                      }} 
                      className="check-boxed"
                      type="checkbox"
                      value={value}
                      />
                <span className="check-mark"></span>
                  
            </label>
  )
  return content;
}

export default Checkbox;