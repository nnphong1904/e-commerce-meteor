import React from 'react';
import background from '../../assets/image/thumbnail_background.jpg';
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
        <div className="filter-card">
          <div className="card-title">Men</div>
          <button onClick={goProductsPage} className="shop-now-btn">Shop Now</button>
        </div>
        <div className="filter-card">
          <div className="card-title">Men</div>
          <button onClick={goProductsPage} className="shop-now-btn">Shop Now</button>
        </div>
        <div className="filter-card">
          <div className="card-title">Men</div>
          <button onClick={goProductsPage} className="shop-now-btn">Shop Now</button>
        </div>
        <div className="filter-card">
          <div className="card-title">Men</div>
          <button onClick={goProductsPage} className="shop-now-btn">Shop Now</button>
        </div>
      </div>
   </>
  )   
  return content;
}

export default Homepage;