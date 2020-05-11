import React from 'react';
import Arrow from '../../assets/image/arrow.svg'

const ProductFilter = ()=>{


  const content = (
    <div className="product-filter-container">
      <div className="filter-title">Category</div>
      <ul className="category-content-container">
        <li key={0} className="category-detail">
          <button><span>All</span> Dresses</button>
        </li>
        <li key={1} className="category-detail">
          <button>Rompers/Jumpsuits</button>
        </li>
        <li key={2} className="category-detail">
          <button>Casual Dresses</button>
        </li>
        <li key={3} className="category-detail">
          <button>Going out dresses</button>
        </li>
        <li key={4} className="category-detail">
          <button>Party/Ocassion dresses</button>
        </li>
          <li key={5} className="category-detail">
          <button>Mini dresses</button>
        </li>
        <li key={6} className="category-detail">
          <button>Maxi/Mini dresses</button>
        </li>
        <li key={8} className="category-detail">
          <button>Sets</button>
        </li>
      </ul>
      <div className="filter-title">Filter</div>
      <ul className="filter-content-container">
        <li className="filter-detail">
          <div className="filter-holder">
            <div className="title">Size</div>
            <img src={Arrow}/>
          </div>
        </li>
        <li className="filter-detail">
          <div className="filter-holder">
            <div className="title">Color</div>
            <img src={Arrow}/>
          </div>
        </li>
        <li className="filter-detail">
          <div className="filter-holder">
            <div className="title">Brand</div>
            <img src={Arrow}/>
          </div>
        </li>
        <li className="filter-detail">
          <div className="filter-holder">
            <div className="title">Price</div>
            <img src={Arrow}/>
          </div>
        </li>
        <li className="filter-detail">
          <div className="filter-holder">
            <div className="title">Available</div>
            <img src={Arrow}/>
          </div>
        </li>
      </ul>
    </div>
    )
  return content;
}

export default ProductFilter;