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

  const [filterCondition, setFilterCondition] = useState({})

  const changeBranchNameColor = (ref)=>{
    if (ref.current.style.color !== 'rgb(255, 161, 95)'){
      ref.current.style.color = '#ffa15f'
      return;
    }
    ref.current.style.color = '#4d4d4d';
  }
  const rotateArrowIcon = (ref)=>{
      console.log(ref);
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

  // filter logic implementation
  const filterByAvailableItem = (e)=>{
    const filterCondition = e.target.value;
    Meteor.call('getNoItemOfProduct', filterCondition, (err,result)=>{
      console.log(result);
    })
  }
  const filterByColor = (e)=>{
    
    const selectedColor = e.target.value;
    let currentColorFilterList = [...listFilterColor];

    if (e.target.checked){
      currentColorFilterList.push(selectedColor);
    }
    else {
      const indexOfSelectedColor = currentColorFilterList.indexOf(selectedColor);
      console.log(indexOfSelectedColor);
      currentColorFilterList = [
        ...currentColorFilterList.slice(0, indexOfSelectedColor),...currentColorFilterList.slice(indexOfSelectedColor+1)
      ];
    }
    if (currentColorFilterList.length === 0){
      fetchProduct({});
    }
    else {
      fetchProduct({color: {$in: currentColorFilterList}});
    }
    setListFilterColor([...currentColorFilterList]);
  }
  
  const filterBySize = (e)=>{
    const size = e.target.innerText;
    fetchProduct({'sizes.size':size});
  }

  const filterByBranch = (e, ref)=>{
    const selectedBranch = ref.current.innerText.toLowerCase();
    let currentBranchFilterList = [...listFilterBranch];
    
    if (e.target.checked){
      currentBranchFilterList.push(selectedBranch);
    }
    else{
      const indexOfSelectedBranch = currentBranchFilterList.indexOf(selectedBranch);
      currentBranchFilterList = [
        ...currentBranchFilterList.slice(0, indexOfSelectedBranch),...currentBranchFilterList.slice(indexOfSelectedBranch+1)
        ];
    }
    if (currentBranchFilterList.length === 0) {
      fetchProduct({});
    }
    else {
      fetchProduct({branch: {$in: currentBranchFilterList}});
    };
    setListFilterBranch([...currentBranchFilterList]);
  }

  const filterByCategory = (e)=>{
    const category = e.target.innerText.toLowerCase();
    fetchProduct({category:category});
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
          <button>Going out dresses</button>
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
            <div className="min-price">{parseInt(priceValue1) < parseInt(priceValue2) ? priceValue1 : priceValue2}</div>
            <div className="max-price">{parseInt(priceValue1) >= parseInt(priceValue2) ? priceValue1 : priceValue2}</div>
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