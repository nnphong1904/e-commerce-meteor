import React, { useState } from 'react';
import Arrow from '../../assets/image/arrow.svg'
import './PageSelector.css';
const PageSelector = ({currentPage=1, textDisplay='', minValue=1, maxValue=100, onClickFunction = ()=>{}, onChangeHandler=()=>{}})=>{
  
  const [innerCurrentPage, setInnerCurrentPage] = useState(1);
  
  const onClickLeftButton = ()=>{
    if (innerCurrentPage > minValue)
    {
      setInnerCurrentPage(oldValue => oldValue-1);
    }
  }
  const onClickRightValue = ()=>{
    if (innerCurrentPage < maxValue)
    {
      setInnerCurrentPage(oldValue => oldValue+1);
    }
  }
  const onChangeFunction = (e)=>{
    if ((e.target.value<minValue || e.target.value >maxValue) && (e.target.value !== '')){
      return;
    }
    // console.log(e.target.value === NaN)
    onChangeHandler(e.target.value);
    onClickFunction(e.target.value);
  }
  const content = (
    <div className="page-selector-holder">
      <img 
        onClick = {
          (e)=>{
            //onClickLeftButton();
              onClickFunction(parseInt(currentPage-1));
            
          }
        }
        id="increase-btn" 
        src={Arrow}/>
      <div className="text-holder">
        <input 
          onChange={
            (e)=>{
           
              onChangeFunction(e)
            }
          }
          className="input-value" 
          value={currentPage} 
          type="number"/>
        <span className="display-text">{textDisplay}</span>
      </div>
      <img 
        onClick={
          (e)=>{
         //  onClickRightValue();
          
           onClickFunction(parseInt(currentPage+1));
            
          }
        }
        id="decrease-btn" 
        src={Arrow}/>
    </div>
  );
  return content;
}
export default PageSelector;