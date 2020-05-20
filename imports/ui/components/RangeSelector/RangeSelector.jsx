import React, { useState, useEffect} from 'react';
import './RangeSelector.css';
import Slider from '@material-ui/core/Slider';
import { withStyles, makeStyles } from '@material-ui/core/styles';
const PrettySlider = withStyles({
  root: {
    color: '#ffa15f',
    height: 8,
    width: '94%'
    
  },
  thumb: {
    height: 18,
    width: 18,
    backgroundColor: '#ffa15f',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -3,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
    
   
  },
  track: {
    height: 3,
    borderRadius: 3,
    
  },
  rail: {
    height: 3,
    borderRadius: 3,
    marginLeft: 8,
  },
})(Slider);
const RangeSelector = (
    {
      value1=0, value2=10, 
      onMouseUpFnc=()=>{},
      resetRangeSelector,
    })=>{
      useEffect(()=>{
        if (resetRangeSelector.didResetPriceFilter === true){
          setValue([39,300]);
          resetRangeSelector.setDidResetPriceFilter(false);
        }
      },[resetRangeSelector.didResetPriceFilter]);
      console.log({value1, value2})

      const [value, setValue] = useState([value1, value2]);

      const handleChange = (event, newValue) => {
        setValue(newValue);
      };

  
  const content = (
    <div className="range-slider-holder">
      <PrettySlider  
          defaultValue={[39,300]}
          min={39}
          max={300}
          value={value} 
          onChange={handleChange}
          onMouseUp={()=>{onMouseUpFnc(value[0], value[1])}} />
      <div className="value-display">
        <div id="min-value">{`$${value[0]}`}</div>
        <div id="max-value">{`$${value[1]}`}</div>
      </div>
    </div>
  );
  return content;
}

export default RangeSelector;