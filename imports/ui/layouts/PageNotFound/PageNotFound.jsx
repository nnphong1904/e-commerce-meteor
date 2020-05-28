import React from 'react';
import './PageNotFound.css';
import PageNotFoundBackground from '../../assets/image/404.png';
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

