import React from 'react';
import './PageNotFound.css';
import PageNotFoundBackground from '../../assets/image/Ảnh chụp Màn hình 2020-05-28 lúc 16.31.56.png';
const PageNotFound = ()=>{
  const goBackward = ()=>{
    history.back();
  }
  const content = (
    <div className="page-not-found-container">
      <img className="page-not-found-background" src={PageNotFoundBackground} />
      <button onClick={goBackward} className="backward-btn">Go Back</button>
    </div>
  );
  return content;
}

export default PageNotFound;

