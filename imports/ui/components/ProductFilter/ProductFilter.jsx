import React, { createRef, useState, Fragment } from 'react';
import Arrow from '../../assets/image/arrow.svg';
import Checkbox from '../../components/CheckBox/CheckBox.jsx';
import InputRadio from '../../components/InputRadio/InputRadio.jsx';
import CircleCheckBox from '../../components/CircleCheckBox/CircleCheckBox.jsx';
import RangeSelector from '../../components/RangeSelector/RangeSelector.jsx';
import './ProductFilter.css'
const COLOR_LIST = [  
                    {colorId:'wild-watermelon', colorValue: 'wild watermelon'}, 
                    {colorId:'sunglow', colorValue:'sunglow'},
                    {colorId:'neon-blue', colorValue:'neon blue'}, 
                    {colorId:'payne-grey', colorValue: `payne's grey`}, 
                    {colorId:'white-smoke', colorValue:'white smoke'},
                  ];
const SIZE_LIST = ['S', 'M', 'L'];
const BRAND_LIST = ['Zara', 'Pull&Bear', 'Dior', 'Chanel', 'H&M'];
 

              

const ProductFilter = ({fetchProduct})=>{

  const filterSizeRef = createRef();
  const filterPriceRef = createRef();
  const priceTextHolderRef = createRef();
  const filterBranchRef = createRef();
  const filterColorRef = createRef();
  const filterAvailableRef = createRef();


  const arrowIconRefSize = createRef();
  const arrowIconRefPrice = createRef();
  const arrowIconRefBranch = createRef();
  const arrowIconRefColor = createRef();
  const arrowIconRefAvailable = createRef();

  const [priceValue1, setPriceValue1] = useState(39);
  const [priceValue2, setPriceValue2] = useState(300);

 
  const [filterCondition, setFilterCondition] = useState({
    category:'',
    price: {
      doPriceFilter: false,
      priceValue1:39,
      priceValue2:300
    },
    color: [],
    size:'',
    branch:[],
    outStockOrInStored:{
      doFilterByNumberOfItem: false,
      outOffStock: false,
      inStored: false
    }
  })

  const changeBranchNameColor = (ref)=>{
    if (ref.current.style.color !== 'rgb(255, 161, 95)'){
      ref.current.style.color = '#ffa15f'
      return;
    }
    ref.current.style.color = '#4d4d4d';
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
  const toggleTextPriceFilter = ()=>{
    priceTextHolderRef.current.style.display = priceTextHolderRef.current.style.display==='' ? 'flex' : '';
  }
  const onChangeHandlerForPriceValue1 = (e)=>{
    const newPrice = {...filterCondition.price, priceValue1: e.target.value};
    setFilterCondition({...filterCondition, price:{...newPrice}});
  }
  const onChangeHandlerForPriceValue2 = (e)=>{
    const newPrice = {...filterCondition.price, priceValue2: e.target.value};
    setFilterCondition({...filterCondition, price:{...newPrice}});
  }

  //========== filter logic implementation================

  const filterByAvailableItem = (e)=>{

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
    fetchProduct(currentFilterCondition);
  }
  const filterByColor = (e)=>{
    
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
    fetchProduct(currentFilterCondition);
    setFilterCondition(currentFilterCondition);
  }
  
  const filterBySize = (e)=>{
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
    fetchProduct(currentFilterCondition);
    setFilterCondition({...currentFilterCondition})
  }

  const filterByBranch = (e)=>{
   
    const selectedBranch = e.target.value.toLowerCase();
    console.log(selectedBranch);
    let currentFilterCondition = {...filterCondition};
    let currentBranchFilterCondition = [...filterCondition.branch];
    const indexOfSelectedBranch = currentBranchFilterCondition.indexOf(selectedBranch);
    if (indexOfSelectedBranch === -1 ){
      currentBranchFilterCondition.push(selectedBranch);
    }
    else {
      currentBranchFilterCondition = [...currentBranchFilterCondition.slice(0, indexOfSelectedBranch), ...currentBranchFilterCondition.slice(indexOfSelectedBranch+1)];
    }
    currentFilterCondition = {...currentFilterCondition, branch: [...currentBranchFilterCondition]};
    fetchProduct(currentFilterCondition);
    setFilterCondition(currentFilterCondition);
  }

  const filterByCategory = (e)=>{
    const selectedCategory = e.target.value.toLowerCase();
    console.log(selectedCategory);
    let currentFilterCondition = {...filterCondition};
    
    if (currentFilterCondition.category !== selectedCategory){
      currentFilterCondition = {...currentFilterCondition, category: selectedCategory};
    }
    else{
      e.target.checked = false;
      currentFilterCondition.category='';
    }
    fetchProduct(currentFilterCondition);
    setFilterCondition({...currentFilterCondition});
  } //need to check again

  const filterByPrice = (valuePrice1, valuePrice2)=>{
    let currentFilterCondition ={...filterCondition};
    let newPriceObj = {priceValue1: valuePrice1, priceValue2: valuePrice2, doPriceFilter: true};
    console.log(newPriceObj);
    // let newPriceObj = {...currentFilterCondition.price, doPriceFilter:true};
    currentFilterCondition = {...currentFilterCondition, price:{...newPriceObj}}
    fetchProduct(currentFilterCondition);

  }
  const content = (
    <div className="product-filter-container">
    {/* ========= filter by category ================ */}
    
      <div className="filter-title">Category</div>
        <div className="category-detail">
          <button  onClick={({})=>fetchProduct({})}><span>All</span> Dresses</button>
        </div>
        <form className="category-detail category-selector-form">
           <label className="category-holder">
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
    
      {/* ========filter by size, branch, price...============= */}
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
            BRAND_LIST.map((brand, brandIndex)=>{
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