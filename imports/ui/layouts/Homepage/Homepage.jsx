import React from 'react';  
import './Homepage.css';
const Homepage = ()=>{
  const goProductsPage = ()=>{
    console.log('hello');
    FlowRouter.go('/products');
  }

  const content = (
   <>
      <div className="thumbnail-container">
        <div className="thumbnail-title">OUTFIT OF THE WEEK</div>
        <button onClick={goProductsPage}  className="shop-now-btn">Shop Now</button>
      </div>
      <div className="filter-container">
        <div className="filter-card men">
          <div className="card-title">Men</div>
          <button onClick={goProductsPage} className="shop-now-btn">Shop Now</button>
        </div>
        <div className="filter-card ladies">
          <div className="card-title ">Ladies</div>
          <button onClick={goProductsPage} className="shop-now-btn">Shop Now</button>
        </div>
        <div className="filter-card girls">
          <div className="card-title">Girls</div>
          <button onClick={goProductsPage} className="shop-now-btn">Shop Now</button>
        </div>
        <div className="filter-card boys">
          <div className="card-title">Boys</div>
          <button onClick={goProductsPage} className="shop-now-btn">Shop Now</button>
        </div>
      </div>
   </>
  )   
  return content;
}

export default Homepage;