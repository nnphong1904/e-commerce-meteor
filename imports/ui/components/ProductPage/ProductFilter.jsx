import React, { createRef, useState } from 'react';
import Arrow from '../../assets/image/arrow.svg'


const ProductFilter = ({fetchProduct})=>{

  const filterSizeRef = createRef();
  const filterPriceRef1 = createRef();
  const filterPriceRef2 = createRef();
  const priceTextHolderRef = createRef();
  const filterBranchRef = createRef();
  const filterColorRef = createRef();
  const filterAvailableRef = createRef();

  const branchNameRef1 = createRef();
  const branchNameRef2 = createRef();
  const branchNameRef3 = createRef();
  const branchNameRef4 = createRef();
  const branchNameRef5 = createRef();

  const arrowIconRefSize = createRef();
  const arrowIconRefPrice = createRef();
  const arrowIconRefBranch = createRef();
  const arrowIconRefColor = createRef();
  const arrowIconRefAvailable = createRef();

  const [priceValue1, setPriceValue1] = useState('39');
  const [priceValue2, setPriceValue2] = useState('300');

  const [listFilterBranch, setListFilterBranch] = useState([]);
  const [listFilterColor, setListFilterColor] = useState([]);
  const [filterAvailableItem, setFilterAvailableItem] = useState({'in stored':false, 'out stock':false});

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
    const size = e.target.innerText;
    let currentFilterCondition = {...filterCondition};
    if (currentFilterCondition.size !== size)
    {
      currentFilterCondition = {...currentFilterCondition, size};
    }
    else if (currentFilterCondition.size === size){
      currentFilterCondition = {...currentFilterCondition, size:''};
    }
    fetchProduct(currentFilterCondition);
    setFilterCondition({...filterCondition, size:size})
  }//need to check again

  const filterByBranch = (e, ref)=>{
   
    const selectedBranch = ref.current.innerText.toLowerCase();
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
    const selectedCategory = e.target.innerText.toLowerCase();
    let currentFilterCondition = {...filterCondition};
    if (currentFilterCondition.category !== selectedCategory){
      currentFilterCondition = {...currentFilterCondition, category: selectedCategory};
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
      <ul className="category-content-container">
        <li className="category-detail">
          <button onClick={({})=>fetchProduct({})}><span>All</span> Dresses</button>
        </li>
        <li key={1} className="category-detail">
          <button onClick={(e)=>filterByCategory(e)}>Rompers/Jumpsuits</button>
        </li>
        <li key={2} className="category-detail">
          <button onClick={(e)=>filterByCategory(e)}>Casual Dresses</button>
        </li>
        <li key={3} className="category-detail">
          <button onClick={(e)=>filterByCategory(e)}>Going out dresses</button>
        </li>
        <li key={4} className="category-detail">
          <button onClick={(e)=>filterByCategory(e)}>Party/Ocassion dresses</button>
        </li>
          <li key={5} className="category-detail">
          <button onClick={(e)=>filterByCategory(e)}>Mini dresses</button>
        </li>
        <li key={6} className="category-detail">
          <button onClick={(e)=>filterByCategory(e)}>Maxi/Mini dresses</button>
        </li>
        <li key={8} className="category-detail">
          <button onClick={(e)=>filterByCategory(e)}>Sets</button>
        </li>
      </ul>
      {/* ========filter by size, branch, price...============= */}
      {/* ===============filter by size======================== */}
      <div className="filter-title">Filter</div>
      <ul className="filter-content-container">
        <li className="filter-detail">
          <a 
              onClick={
                ()=>{
                  toggleFilter(filterSizeRef);
                  rotateArrowIcon(arrowIconRefSize);
                  }} 
              className="filter-holder">
            <div className="title">Size</div>
            <img ref={arrowIconRefSize} className="Arrow" src={Arrow}/>
          </a>
          <div ref={filterSizeRef} className="selector-container">
              <button onClick={(e)=>filterBySize(e)} className="box-selector-holder">S</button>
              <button onClick={(e)=>filterBySize(e)} className="box-selector-holder">M</button>
              <button onClick={(e)=>filterBySize(e)}  className="box-selector-holder">L</button>
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
            <label className="color-picker-details">
              <input  
                      onClick={
                        (e)=>{
                          filterByColor(e);
                        }
                      }
                      className="check-boxed"
                      type="checkbox"
                      value="wild watermelon"
                      />
                <span id="wild-watermelon" className="check-mark"></span> 
            </label>                
            
         
            <label className="color-picker-details">
              <input   
                      onClick={
                        (e)=>{
                          filterByColor(e);
                        }
                      }
                      className="check-boxed"
                      type="checkbox"
                      value="sunglow"
                      />
                <span id="sunglow" className="check-mark"></span>                 
            </label>
                     
            <label className="color-picker-details">
              <input   
                      onClick={
                              (e)=>{
                                filterByColor(e);
                              }
                      }
                      className="check-boxed"
                      type="checkbox"
                      value="neon blue"
                      />
                <span id="neon-blue" className="check-mark"></span>
            </label>             
         
             <label className="color-picker-details">
                <input   
                      onClick={
                        (e)=>{
                          filterByColor(e);
                        }
                      }
                      className="check-boxed"
                      type="checkbox"
                      value="atomic tangerine"
                      />
                <span id="atomic-tangerine" className="check-mark"></span>
             </label>                 
         
          
           <label className="color-picker-details">
              <input 
                      onClick={
                        (e)=>{
                          filterByColor(e);
                        }
                      }
                      className="check-boxed"
                      type="checkbox"
                      value="payne's grey"
                      />
                <span id="payne-grey" className="check-mark"></span>  
           </label>                
          
            
            <label className="color-picker-details">
              <input 
                      onClick={
                        (e)=>{
                          filterByColor(e);
                        }
                      }
                      className="check-boxed"
                      type="checkbox"
                      value="white-smoke"
                      />
                <span id="white-smoke" className="check-mark"></span>   
            </label>               
  
          </div>
        </li>
        {/* ================filter by branch==================== */}
        <li className="filter-detail">
          <a 
              onClick={
                ()=>{
                  toggleFilter(filterBranchRef);
                  rotateArrowIcon(arrowIconRefBranch);
                }
              }
              className="filter-holder">
            <div className="title">Branch</div>
            <img ref={arrowIconRefBranch} className="Arrow" src={Arrow}/>           
          </a>
          <div ref={filterBranchRef} className="branch-list-container">
            <label  className="branch-holder">
              <span ref={branchNameRef1} className="branch-name">Zara</span>
              <input  onClick={(e)=>{
                      changeBranchNameColor(branchNameRef1);
                      filterByBranch(e, branchNameRef1);
                    }} 
                    className="check-boxed"
                    type="checkbox"/>
              <span className="check-mark"></span>  
            </label>
            <label className="branch-holder">
              <span ref={branchNameRef2} className="branch-name">H&M</span>
              <input 
                    onClick={(e)=>{
                            changeBranchNameColor(branchNameRef2);
                            filterByBranch(e, branchNameRef2);
                          }}
                    className="check-boxed" 
                    type="checkbox"/>
              <span className="check-mark"></span>  
            </label>
            <label className="branch-holder">
              <span ref={branchNameRef3} className="branch-name">Pull&Bear</span>
              <input 
                    onClick={(e)=>{
                      changeBranchNameColor(branchNameRef3);
                      filterByBranch(e, branchNameRef3);
                    }}
                    className="check-boxed" 
                    type="checkbox"/>
              <span className="check-mark"></span>  
            </label>
            <label className="branch-holder">
              <span ref={branchNameRef4} className="branch-name">Dior</span>
              <input
                    onClick={(e)=>{
                      changeBranchNameColor(branchNameRef4);
                      filterByBranch(e, branchNameRef4);
                    }} 
                    className="check-boxed"
                    type="checkbox"/>
              <span className="check-mark"></span>  
            </label>
            <label className="branch-holder">
              <span ref={branchNameRef5} className="branch-name">Chanel</span>
              <input
                  onClick={(e)=>{
                      changeBranchNameColor(branchNameRef5);
                      filterByBranch(e, branchNameRef5);
                    }} 
                  className="check-boxed"
                  type="checkbox"/>
              <span className="check-mark"></span>  
            </label>
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