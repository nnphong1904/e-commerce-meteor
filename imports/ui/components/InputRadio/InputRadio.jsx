import React from 'react';
import './InputRadio.css';

const InputRadio = ({title='', value='' ,onClickFunction= ()=>{}}) =>{

  const content = (
    <label> 
      <input
          onClick={(e)=>onClickFunction(e)}
          className="radio-input"
          type="radio"
          name="radio-input"
          value={value}/>
        <span className="radio-name">{title}</span>
      </label>                  
  )
  return content
}

export default InputRadio;