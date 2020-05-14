import React, { useEffect, createRef } from 'react';
import './StarRating.css';
const StarRating = ({rating, updateRatingPoint})=>{
  const starsRef = createRef();
  const setRated = (e, ref)=>{
    const starList = Array.from(ref.current.children);
    if (rating) return;
    let selectedStarIndex = starList.indexOf(e.target);
    console.log(selectedStarIndex);
    if (starList[selectedStarIndex].style.color === 'gold'){
      updateRatingPoint(selectedStarIndex);
      for (let i = selectedStarIndex; i<starList.length; i++){
        if (starList[i].style.color === 'gold'){
          starList[i].style.color = '';
        }
        else {
          return;
        }
      }  
    }
    else {
      updateRatingPoint(selectedStarIndex + 1);
      for (let i = 0; i<=selectedStarIndex; i++){
        starList[i].style.color = 'gold';
      }
    }
  }
 
  useEffect(() => {
    if (rating){
      const starList = Array.from(starsRef.current.children);
      for (let i=0; i < rating; i++){
        starList[i].style.color='gold';
      }
    } 
  }, [rating])
 
  const content = (
    <div ref={starsRef} className="stars">
      <span onClick={e => setRated(e, starsRef)} className="star">&nbsp;</span> 
      <span onClick={e => setRated(e, starsRef)} className="star">&nbsp;</span> 
      <span onClick={e => setRated(e, starsRef)} className="star">&nbsp;</span> 
      <span onClick={e => setRated(e, starsRef)} className="star">&nbsp;</span> 
      <span onClick={e => setRated(e, starsRef)} className="star">&nbsp;</span> 
    </div>
  )
  return content;
}

export default StarRating;