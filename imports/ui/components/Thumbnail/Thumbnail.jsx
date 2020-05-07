import React from 'react';
import background from '../../assets/image/thumbnail_background.jpg';
import './Thumbnail.css';
const Thumbnail = ()=>{
  console.log(background);
  const content = (
    <div className="thumbnail-container">
      <div className="thumbnail-title">OUTFIT OF THE WEEK</div>
      <button>Shop Now</button>
    </div>
  )   
  return content;
}

export default Thumbnail;