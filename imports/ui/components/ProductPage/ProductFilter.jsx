import React, { createRef, useState } from 'react';
import Arrow from '../../assets/image/arrow.svg'

const COLOR_LIST = [  
                    {colorId:'wild-watermelon', colorValue: 'wild watermelon'}, 
                    {colorId:'sunglow', colorValue:'sunglow'},
                    {colorId:'neon-blue', colorValue:'neon blue'}, 
                    {colorId:'payne-grey', colorValue: `payne's grey`}, 
                    {colorId:'white-smoke', colorValue:'white smoke'},
                  ];
const SIZE_LIST = ['S', 'M', 'L'];
const BRAND_LIST = ['Zara', 'Pull&Bear', 'Dior', 'Chanel', 'H&M'];
  //        console.log(BRAND_LIST[0].brandRef === BRAND_LIST[1].brandRef);

              

const ProductFilter = ({fetchProduct})=>{

  const filterSizeRef = createRef();
  const filterPriceRef1 = createRef();
  const filterPriceRef2 = createRef();
  const priceTextHolderRef = createRef();
  const filterBranchRef = createRef();
  const filterColorRef = createRef();
  const filterAvailableRef = createRef();


  const arrowIconRefSize = createRef();
  const arrowIconRefPrice = createRef();
  const arrowIconRefBranch = createRef();
  const arrowIconRefColor = createRef();
  const arrowIconRefAvailable = createRef();

  // const [priceValue1, setPriceValue1] = useState('39');
  // const [priceValue2, setPriceValue2] = useState('300');
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
    console.log(e.target.value);
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
  }//need to check again

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

  const filterByPrice = ()=>{
    let currentFilterCondition ={...filterCondition};
    let newPriceObj = {...currentFilterCondition.price, doPriceFilter:true};
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
                value="mini-dresses"
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
            <form className="size-selector-holder">
                {SIZE_LIST.map((size, sizeIndex)=>{
                    const content = (
                      <label key={sizeIndex}> 
                        <input
                            onClick={(e)=>filterBySize(e)}
                            className="size-selector"
                            type="radio"
                            name="size-selector"
                            value={size}
                        />
                        <span className="size-name">{size}</span>
                      </label>
                    )
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
                  <label key={colorIndex} className="color-picker-details">
                    <input  
                            onClick={
                              (e)=>{
                                filterByColor(e);
                              }
                            }
                            className="check-boxed"
                            type="checkbox"
                            value={color.colorValue}
                            />
                      <span id={color.colorId} className="check-mark"></span> 
                  </label>             
                )
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
          <div ref={filterBranchRef} className="branch-list-container">
          {
            BRAND_LIST.map((brand, brandIndex)=>{
              const content = (
                  <label key={brandIndex}  className="branch-holder">
                    <input  onClick={(e)=>{
                            filterByBranch(e);
                          }} 
                          className="check-boxed"
                          value={brand}
                          type="checkbox"/>
                    <span className="check-mark"></span> 
                    <span className="branch-name">{brand}</span> 
                  </label>
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
            onClick={(e)=>console.log(e.target)}
            onMouseUp={()=>filterByPrice(parseInt(priceValue1), parseInt(priceValue2))} 
            onChange={(e)=>{onChangeHandlerForPriceValue1(e)}} 
            min="39" max="300" 
            className="price-slider" 
            value={filterCondition.price.priceValue1}
            step={1}
            />
            <input  
            id="price-filter-2"
            type="range" 
            ref={filterPriceRef2}
            onClick={(e)=>console.log(e.target)}
            onMouseUp={()=>filterByPrice(parseInt(priceValue1), parseInt(priceValue2))} 
            onChange={(e)=>{onChangeHandlerForPriceValue2(e)}} 
            min="39" max="300" 
            className="price-slider" 
            value={filterCondition.price.priceValue2}
           />
          <div ref={priceTextHolderRef} className="price-text-holder">
            <div className="min-price">{
              parseInt(filterCondition.price.priceValue1) < parseInt(filterCondition.price.priceValue2) ? filterCondition.price.priceValue1 : filterCondition.price.priceValue2}
            </div>
            <div className="max-price">{
              parseInt(filterCondition.price.priceValue1) >= parseInt(filterCondition.price.priceValue2) ? filterCondition.price.priceValue1 : filterCondition.price.priceValue2}
            </div>
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
          <div ref={filterAvailableRef} className="available-filter-container">
            <label className="available-holder">
                <span className="available-title">In stored</span>
                <input
                      onClick={(e)=>{
                        filterByAvailableItem(e);
                      }} 
                      className="check-boxed"
                      type="checkbox"
                      value="in stored"
                      />
                <span className="check-mark"></span>
                  
            </label>
            <label className="available-holder">
                <span className="available-title">Out of stock</span>
                <input
                      onClick={(e)=>{
                        filterByAvailableItem(e);
                      }} 
                      className="check-boxed"
                      type="checkbox"
                      value="out of stock"
                      />
                <span className="check-mark"></span>
                  
            </label>
          </div>
        </li>
      </ul>
    </div>
    )
  return content;
}

export default ProductFilter;