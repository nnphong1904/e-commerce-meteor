import React, { createRef, useState } from 'react';
import Arrow from '../../assets/image/arrow.svg'

const ProductFilter = ({fetchProduct ,filterBySize})=>{

  const filterSizeRef = createRef();
  const filterPriceRef1 = createRef();
  const filterPriceRef2 = createRef();
  const priceTextHolderRef = createRef();

  const arrowIconRefSize = createRef();
  const arrowIconRefPrice = createRef();


  const [priceValue1, setPriceValue1] = useState('39');
  const [priceValue2, setPriceValue2] = useState('300');

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
  const filterByPriceHandler = (price1, price2)=>{
    let minPrice, maxPrice;
    if (price1 <= price2){
      minPrice = price1;
      maxPrice = price2;
    }
    else {
      minPrice = price2;
      maxPrice = price1;
    }
    fetchProduct({$and:[{price:{$lte:maxPrice}},{price:{$gte:minPrice}}]});
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
                toggleFilter(filterPriceRef1);
                toggleFilter(filterPriceRef2);
                toggleTextPriceFilter();
                rotateArrowIcon(arrowIconRefPrice);
                }} 
                className="filter-holder">
            <div className="title">Price</div>
            <img ref={arrowIconRefPrice} className="Arrow" src={Arrow}/>
          </a>
          <input  
            id="price-filter-1"
            type="range" 
            ref={filterPriceRef1}
            onMouseUp={()=>filterByPriceHandler(parseInt(priceValue1), parseInt(priceValue2))} 
            onChange={(e)=>{onChangeHandler(e, setPriceValue1)}} 
            min="39" max="300" 
            className="price-slider" 
            value={priceValue1}
            step={1}
            />
            <input  
            id="price-filter-2"
            type="range" 
            ref={filterPriceRef2}
            onMouseUp={()=>filterByPriceHandler(parseInt(priceValue1), parseInt(priceValue2))} 
            onChange={(e)=>{onChangeHandler(e, setPriceValue2)}} 
            min="39" max="300" 
            className="price-slider" 
            value={priceValue2}
           />
          <div ref={priceTextHolderRef} className="price-text-holder">
            <div className="min-price">$39</div>
            <div>{`price1: ${priceValue1} price2:${priceValue2}`}</div>
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