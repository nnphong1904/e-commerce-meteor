import React, { createRef, useState } from 'react';
import Arrow from '../../assets/image/arrow.svg'

const ProductFilter = ({fetchProduct ,filterBySize})=>{

  const filterSizeRef = createRef();
  const filterPriceRef = createRef();
  const priceTextHolderRef = createRef();

  const arrowIconRefSize = createRef();
  const arrowIconRefPrice = createRef();


  const [priceValue, setPriceValue]=useState('39');

  const rotateArrowIcon = (ref)=>{
    console.log(ref.current.style.transform);
     if (ref.current.style.transform === '' )
      {
        ref.current.style.transform='rotate(180deg)';
      }
     else if (ref.current.style.transform==='rotate(180deg)'){
        ref.current.style.transform = 'rotate(360deg)';
        ref.current.style.transform='';
     }

  }

  const toggleFilter = (ref)=>{
    ref.current.style.display=ref.current.style.display===''?'block':'';
  }
  const toggleTextPriceFilter = ()=>{
    priceTextHolderRef.current.style.display = priceTextHolderRef.current.style.display==='' ? 'flex' : '';
  }
  const onChangeHandler = (e, setState)=>{
    setState(e.target.value);
  }
  const filterHandler = (condition)=>{
    fetchProduct(condition);
  }
  const content = (
    <div className="product-filter-container">
      <div className="filter-title">Category</div>
      <ul className="category-content-container">
        <li key={0} className="category-detail">
          <button onClick={({})=>fetchProduct({})}><span>All</span> Dresses</button>
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
          <a 
          onClick={
            ()=>{
              toggleFilter(filterSizeRef);
              rotateArrowIcon(arrowIconRefSize);
              }} className="filter-holder">
            <div className="title">Size</div>
            <img ref={arrowIconRefSize} className="Arrow" src={Arrow}/>
          </a>
          <div ref={filterSizeRef} className="selector-container">
              <button onClick={(e)=>filterBySize(e)} className="box-selector-holder">S</button>
              <button onClick={(e)=>filterBySize(e)} className="box-selector-holder">M</button>
              <button onClick={(e)=>filterBySize(e)}  className="box-selector-holder">L</button>
          </div>
        </li>
        <li className="filter-detail">
          <a className="filter-holder">
            <div className="title">Color</div>
            <img src={Arrow}/>
          </a>
        </li>
        <li className="filter-detail">
          <a className="filter-holder">
            <div className="title">Brand</div>
            <img src={Arrow}/>           
          </a>
        </li>
        <li className="filter-detail">
          <a onClick={
              ()=>{
                toggleFilter(filterPriceRef);
                toggleTextPriceFilter();
                rotateArrowIcon(arrowIconRefPrice);
                }} 
                className="filter-holder">
            <div className="title">Price</div>
            <img ref={arrowIconRefPrice} className="Arrow" src={Arrow}/>
          </a>
          <input  
            type="range" 
            ref={filterPriceRef}
            onMouseUp={()=>filterHandler({price:parseInt(priceValue)})} 
            onChange={(e)=>{onChangeHandler(e, setPriceValue)}} 
            min="39" max="300" 
            className="price-slider" 
            value={priceValue}
            step={1}
            />
          <div ref={priceTextHolderRef} className="price-text-holder">
            <div className="min-price">$39</div>
            <div>{priceValue}</div>
            <div className="max-price">$300</div>
          </div>
        </li>
        <li className="filter-detail">
          <a className="filter-holder">
            <div className="title">Available</div>
            <img src={Arrow}/>
          </a>
        </li>
      </ul>
    </div>
    )
  return content;
}

export default ProductFilter;