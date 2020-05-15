import React from 'react';
import './InputRadio.css';

const InputRadio = ({title='', isDisabled=false, value='' ,onClickFunction= ()=>{}}) =>{

  const content = (
    <label> 
      <input
          onClick={(e)=>onClickFunction(e)}
          className="radio-input"
          type="radio"
          name="radio-input"
          disabled={isDisabled}
          value={value}/>
        {!isDisabled && <span className="radio-name">{title}</span>}
        {isDisabled &&  <span className="radio-name disabled">{title}</span>}
      </label>                  
  )
  return content
}

export default InputRadio;