import React, { createRef, useState, Fragment } from 'react';
import Arrow from '../../assets/image/arrow.svg';
import Checkbox from '../../components/CheckBox/CheckBox.jsx';
import InputRadio from '../../components/InputRadio/InputRadio.jsx';
import CircleCheckBox from '../../components/CircleCheckBox/CircleCheckBox.jsx';
import RangeSelector from '../../components/RangeSelector/RangeSelector.jsx';
import './ProductFilter.css'
import {BRAND_NAME, COLOR_LIST, SIZE_LIST} from '../../lib/Constant.js';
import { element } from 'prop-types';

const BRAND_NAME_LIST = [...BRAND_NAME.values()];
 

              

const ProductFilter = ({changeCurrentPage, fetchProduct, resetCurrentPageValue})=>{

  const filterSizeRef = createRef();
  const filterPriceRef = createRef();
  const filterBranchRef = createRef();
  const filterColorRef = createRef();
  const filterAvailableRef = createRef();
  const categoryListRef = createRef();


  const arrowIconRefSize = createRef();
  const arrowIconRefPrice = createRef();
  const arrowIconRefBranch = createRef();
  const arrowIconRefColor = createRef();
  const arrowIconRefAvailable = createRef();

  const [priceValue1, setPriceValue1] = useState(39);
  const [priceValue2, setPriceValue2] = useState(300);
  const [didResetPriceFilter, setDidResetPriceFilter] = useState(false);
  console.log({priceValue1,priceValue2});

  const [filterCondition, setFilterCondition] = useState({
    category:'',
    price: {
      doPriceFilter: false,
      priceValue1:39,
      priceValue2:300
    },
    color: [],
    size:'',
    brand:[],
    outStockOrInStored:{
      doFilterByNumberOfItem: false,
      outOffStock: false,
      inStored: false
    }
  })

  const turnOffAllFilterUX = ()=>{
    const sizesFilter = Array.from(filterSizeRef.current.children[0].children);
    sizesFilter.forEach(children => {
      if (children.children[0].checked === true){
        children.children[0].checked = false;
      }
    });
   
    const colorsFilter = Array.from(filterColorRef.current.children);
    colorsFilter.forEach(children => {
      if (children.children[0].checked === true){
        children.children[0].checked = false;
      }
      })
    const brandsFilter = Array.from(filterBranchRef.current.children);
    brandsFilter.forEach(children => {
      if (children.children[1].checked === true){
        children.children[1].checked = false;
      }
    setDidResetPriceFilter(true);
   //   console.log(children)
    })
    const availableFilter = Array.from(filterAvailableRef.current.children);
    availableFilter.forEach(children => {
      if (children.children[1].checked === true){
        children.children[1].checked = false;
      }
      
    })
    
  }

  const rotateArrowIcon = (ref)=>{
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
    console.log(ref.current);
    ref.current.style.display=ref.current.style.display===''?'block':'';
  }
  
  const unCheckAllCategoryFilter = ()=>{
    Array.from(categoryListRef.current.children).forEach(element=>{
      if (element.children[0].checked === true){
        element.children[0].checked = false;
      }
    });
    
  }
  //========== filter logic implementation================

  const filterByAvailableItem = (e)=>{
    // changeCurrentPage(1);
    const filterByNumberOfItemCondition = e.target.value;
    console.log(e.target.value);
    let currentFilterCondition = {...filterCondition};
    if (filterByNumberOfItemCondition === 'in stored'){
      currentFilterCondition.outStockOrInStored.inStored = !currentFilterCondition.outStockOrInStored.inStored;
    }
    if (filterByNumberOfItemCondition === 'out of stock'){
      currentFilterCondition.outStockOrInStored.outOffStock = !currentFilterCondition.outStockOrInStored.outOffStock;
    }
    currentFilterCondition.outStockOrInStored.doFilterByNumberOfItem = true;
    resetCurrentPageValue();
    fetchProduct(currentFilterCondition);
  }
  const filterByColor = (e)=>{
    // changeCurrentPage(1);
    const selectedColor = e.target.value;
    let currentFilterCondition = {...filterCondition};
    let currentColorFilterCondition = [...currentFilterCondition.color];
    const indexOfSelectedColor = currentFilterCondition.color.indexOf(selectedColor);
    if (indexOfSelectedColor===-1){
      currentColorFilterCondition.push(selectedColor);
    }
    else{
      currentColorFilterCondition = [...currentColorFilterCondition.slice(0,indexOfSelectedColor), ...currentColorFilterCondition.slice(indexOfSelectedColor+1)];
    }
    currentFilterCondition = {...currentFilterCondition, color: [...currentColorFilterCondition]};
    resetCurrentPageValue();
    fetchProduct(currentFilterCondition);
    setFilterCondition(currentFilterCondition);
  }
  
  const filterBySize = (e)=>{
    // changeCurrentPage(1);
    const size = e.target.value;
    let currentFilterCondition = {...filterCondition};
    if (currentFilterCondition.size !== size)
    {
      currentFilterCondition = {...currentFilterCondition, size};
    }
    else if (currentFilterCondition.size === size){
      currentFilterCondition = {...currentFilterCondition, size:''};
      e.target.checked = false;
    }
    resetCurrentPageValue();
    fetchProduct(currentFilterCondition);
    setFilterCondition({...currentFilterCondition})
  }

  const filterByBranch = (e)=>{
    // changeCurrentPage(1);
    const selectedBranch = e.target.value.toLowerCase();
    
    let currentFilterCondition = {...filterCondition};
    let currentBranchFilterCondition = [...filterCondition.brand];
    const indexOfSelectedBranch = currentBranchFilterCondition.indexOf(selectedBranch);
    if (indexOfSelectedBranch === -1 ){
      currentBranchFilterCondition.push(selectedBranch);
    }
    else {
      currentBranchFilterCondition = [...currentBranchFilterCondition.slice(0, indexOfSelectedBranch), ...currentBranchFilterCondition.slice(indexOfSelectedBranch+1)];
    } 
    currentFilterCondition = {...currentFilterCondition, brand: [...currentBranchFilterCondition]};
    resetCurrentPageValue();
    fetchProduct(currentFilterCondition);
    setFilterCondition(currentFilterCondition);
  }
 
  const filterByCategory = (e)=>{
    // resetCurrentPageValue()
    const selectedCategory = e.target.value.toLowerCase();
    let currentFilterCondition = {...filterCondition};
    
    if (currentFilterCondition.category !== selectedCategory){
      currentFilterCondition = {...currentFilterCondition, category: selectedCategory};
    }
    else{
      e.target.checked = false;
      currentFilterCondition.category='';
    }

    resetCurrentPageValue();
    fetchProduct(currentFilterCondition);
    setFilterCondition({...currentFilterCondition});
    
  } //need to check again

  const filterByPrice = (valuePrice1, valuePrice2)=>{
    // changeCurrentPage(1);
    let currentFilterCondition ={...filterCondition};
    let newPriceObj = {priceValue1: valuePrice1, priceValue2: valuePrice2, doPriceFilter: true};
    
    // let newPriceObj = {...currentFilterCondition.price, doPriceFilter:true};
    currentFilterCondition = {...currentFilterCondition, price:{...newPriceObj}}
    resetCurrentPageValue();
    fetchProduct(currentFilterCondition);

  }
  const content = (
    <div className="product-filter-container">
    {/* ========= filter by category ================ */}
    
      <div className="filter-title">Category</div>
        <div className="category-detail">
          <button  onClick={({})=>{
            setFilterCondition({
                  category:'',
                  price: {
                    doPriceFilter: false,
                    priceValue1:39,
                    priceValue2:300
                  },
                  color: [],
                  size:'',
                  brand:[],
                  outStockOrInStored:{
                    doFilterByNumberOfItem: false,
                    outOffStock: false,
                    inStored: false
                  }
                });
            fetchProduct({});
            unCheckAllCategoryFilter();
            turnOffAllFilterUX();
            }}>
              <span>All</span> <>Dresses</></button>
        </div>
        <form ref={categoryListRef} className="category-detail category-selector-form">
           <label  className="category-holder">
              <input
                name="category-selector"
                value="rompers/jumpsuits"
                onClick={(e)=>filterByCategory(e)} 
                className="category-selector" 
                type="radio"/>
              <span>Rompers/Jumpsuits</span>
            </label>
            <label className="category-holder">
              <input 
                name="category-selector"
                value="casual dresses"
                onClick={(e)=>filterByCategory(e)} 
                className="category-selector" 
                type="radio"/>
              <span>Casual dresses</span>
            </label>
            <label className="category-holder">
              <input
                name="category-selector"
                value="going out dresses" 
                onClick={(e)=>filterByCategory(e)} 
                className="category-selector" 
                type="radio"/>
              <span>Going out dresses</span>
            </label>
            <label className="category-holder">
              <input
                name="category-selector"
                value="party/ocassion dresses" 
                onClick={(e)=>filterByCategory(e)} 
                className="category-selector" 
                type="radio"/>
              <span>Party/Ocassion dresses</span>
            </label>
            <label className="category-holder">
              <input 
                name="category-selector"
                value="mini dresses"
                onClick={(e)=>filterByCategory(e)} 
                className="category-selector" 
                type="radio"/>
              <span>Mini dresses</span>
            </label>
            <label className="category-holder">
              <input
                name="category-selector"
                value="maxi/midi dresses" 
                onClick={(e)=>filterByCategory(e)} 
                className="category-selector" 
                type="radio"/>
              <span>Maxi/Midi dresses</span>
           </label>
            <label className="category-holder">
              <input
                name="category-selector"
                value="sets" 
                onClick={(e)=>filterByCategory(e)} 
                className="category-selector" 
                type="radio"/>
              <span>Sets</span>
            </label>
        </form>
        <div className="horizontal-line"></div>
    
      {/* ========filter by size, brand, price...============= */}
      {/* ===============filter by size======================== */}
      <div className="filter-title">Filter</div>
      <ul className="filter-content-container">
        <li className="filter-detail">
          <a 
              onClick={
                (e)=>{
                  toggleFilter(filterSizeRef);
                  rotateArrowIcon(arrowIconRefSize);
                  }} 
              className="filter-holder">
            <div className="title">Size</div>
            <img ref={arrowIconRefSize} className="Arrow" src={Arrow}/>
          </a>
          <div ref={filterSizeRef} className="selector-container">
            <form className="size-filter-container">
                {SIZE_LIST.map((size, sizeIndex)=>{
                    const content = (
                      <Fragment key={sizeIndex}>
                        <InputRadio title={size} value={size} onClickFunction={filterBySize} />
                      </Fragment>
                    );
                    return content;
                })}
            </form>
          </div>
        </li>
        {/* ================filter by color===================== */}
        <li className="filter-detail">
          <a  
              onClick={
                ()=>{
                  filterColorRef.current.style.display= filterColorRef.current.style.display==='' ? 'flex' : '';
                  rotateArrowIcon(arrowIconRefColor)
                }
              }
              className="filter-holder">
            <div className="title">Color</div>
            <img ref={arrowIconRefColor} className="Arrow" src={Arrow}/>
          </a>
          <div ref={filterColorRef} className="color-picker-container">
            {
              COLOR_LIST.map((color, colorIndex)=>{
                const content = (
                  <Fragment key={colorIndex}>
                    <CircleCheckBox value={color.colorValue} id={color.colorId} onClickFunction={filterByColor}/>
                  </Fragment>
                );
                return content;
              })
            }
          </div>
        </li>
        {/* ================filter by brand==================== */}
        <li className="filter-detail">
          <a 
              onClick={
                ()=>{
                  toggleFilter(filterBranchRef);
                  rotateArrowIcon(arrowIconRefBranch);
                }
              }
              className="filter-holder">
            <div className="title">Brand</div>
            <img ref={arrowIconRefBranch} className="Arrow" src={Arrow}/>           
          </a>
          <div ref={filterBranchRef} className="checkbox-container brand-container">
          {
            BRAND_NAME_LIST.map((brand, brandIndex)=>{
              const content = (
                  <Fragment key={brandIndex}>
                    <Checkbox  title={brand} value={brand} onClickFunction={filterByBranch} />
                  </Fragment>
             )
              return content;
            })
          }
          </div>
        </li>
        {/* =================filter by price====================== */}
        <li className="filter-detail">
          <a onClick={
              ()=>{
                toggleFilter(filterPriceRef);
                rotateArrowIcon(arrowIconRefPrice);
                }} 
                className="filter-holder">
            <div className="title">Price</div>
            <img ref={arrowIconRefPrice} className="Arrow" src={Arrow}/>
          </a>
          <div ref={filterPriceRef} className="range-slider-container">
            <RangeSelector 
                onMouseUpFnc={filterByPrice} 
                resetRangeSelector={{didResetPriceFilter, setDidResetPriceFilter}}
                value1={priceValue1} 
                value2={priceValue2} />
          </div>
          
          
        </li>
        {/* filter by available item */}
        <li className="filter-detail">
          <a 
            onClick={
              ()=>{
                toggleFilter(filterAvailableRef);
                rotateArrowIcon(arrowIconRefAvailable);
              }
            }
            className="filter-holder">
            <div className="title">Available</div>
            <img ref={arrowIconRefAvailable} className="Arrow" src={Arrow}/>
          </a>
          <div ref={filterAvailableRef} className="checkbox-container available-container ">
            <Checkbox title="In Stored" value="in stored" onClickFunction={filterByAvailableItem}/>
            <Checkbox title="Out of stock" value="out of stock" onClickFunction={filterByAvailableItem}/>
          </div>
        </li>
      </ul>
    </div>
    )
  return content;
}

export default ProductFilter;