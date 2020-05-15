import React, { useState } from 'react';
import Arrow from '../../assets/image/arrow.svg'
const PageSelector = ({textDisplay='', minValue=1, maxValue=100, onClickFunction = ()=>{}})=>{
  const [currentValue, setCurrentValue] = useState(1);
  const onClickLeftButton = ()=>{
    if (currentValue > minValue)
    {
      setCurrentValue(oldValue => oldValue-1);
    }
  }
  const onClickRightValue = ()=>{
    if (currentValue < maxValue)
    {
      setCurrentValue(oldValue => oldValue+1);
    }
  }
  const onChangeHandler = (e)=>{
    setCurrentValue(parseInt(e.target.value));
  }
  const content = (
    <div className="page-selector-holder">
      <img 
        onClick = {
          (e)=>{
            onClickLeftButton();
            onClickFunction(currentValue-1);
          }
        }
        id="increase-btn" 
        src={Arrow}/>
      <div className="text-holder">
        <input 
          onChange={
            (e)=>{
              onChangeHandler(e)
            }
          }
          className="input-value" 
          value={currentValue} 
          type="number"/>
        <span className="display-text">{`/100`}</span>
      </div>
      <img 
        onClick={
          (e)=>{
            onClickRightValue();
            onClickFunction(currentValue+1);
          }
        }
        id="decrease-btn" 
        src={Arrow}/>
    </div>
  );
  return content;
}
export default PageSelector;