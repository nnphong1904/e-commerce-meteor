import React, { useState } from 'react';
import Arrow from '../../assets/image/arrow.svg'
import './PageSelector.css';
const PageSelector = ({currentPage=1, textDisplay='', minValue=1, maxValue=100, onClickFunction = ()=>{}})=>{
  
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
  const onChangeHandler = (e)=>{
    if (e.target.value === ''){
      // setInnerCurrentPage(1);
      onClickFunction(1);
    }
    setInnerCurrentPage(parseInt(e.target.value));
    onClickFunction(parseInt(e.target.value));
  }
  const content = (
    <div className="page-selector-holder">
      <img 
        onClick = {
          (e)=>{
            //onClickLeftButton();
            setInnerCurrentPage(old => old-1);
            onClickFunction(currentPage-1);
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
          value={innerCurrentPage} 
          type="number"/>
        <span className="display-text">{textDisplay}</span>
      </div>
      <img 
        onClick={
          (e)=>{
         //  onClickRightValue();
            setInnerCurrentPage(old => old+1);
            onClickFunction(currentPage+1);
          }
        }
        id="decrease-btn" 
        src={Arrow}/>
    </div>
  );
  return content;
}
export default PageSelector;