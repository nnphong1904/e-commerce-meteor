import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';
import ProductFilter from '../../components/ProductFilter/ProductFilter.jsx';
import PageSelector from '../../components/PageSelector/PageSelector.jsx';
import './ProductPage.css';
const NUMBER_ITEM_PER_PAGE = 20;
const ProductPage = ()=>{
  
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [numberOfPage, setNumberOfPage] = useState(1)
  const fetchProduct = async (condition, currentPageForFetching=1)=>{
     
      await Meteor.call('fetchProduct',condition,currentPageForFetching,(err,result)=>{
        console.log(result.data);
        if (!err) {
          setProducts([...result.data]);
         
          if (Math.round(result.dataLength/NUMBER_ITEM_PER_PAGE) === 0){
            setNumberOfPage(1);
          }
          else{
            setNumberOfPage(Math.round(result.dataLength/NUMBER_ITEM_PER_PAGE));
          }
        }
        else {
          console.log(err);
        }
      })
    }
    const changeCurrentPage = (nextPage)=>{
      console.log(nextPage);
      if (nextPage >= 1 && nextPage <= numberOfPage)
      {
        setCurrentPage(nextPage);
        Meteor.call('fetchProduct', {}, nextPage, (err,result)=>{
          if (!err) {
            setProducts([...result.data]);
           
            if (Math.round(result.dataLength/NUMBER_ITEM_PER_PAGE) === 0){
              setNumberOfPage(1);
            }
            else{
              setNumberOfPage(Math.round(result.dataLength/NUMBER_ITEM_PER_PAGE));
            }
          }
          else {
            console.log(err);
          }
        })
      }
    } 
    

  useEffect(()=>{
    fetchProduct({});
  },[]);
  

  const content = (

      <>
        <div className="page-selector-container">
          <PageSelector currentPage={currentPage} minValue={currentPage} textDisplay={`/${numberOfPage}`} maxValue={numberOfPage} onClickFunction={changeCurrentPage}/>
        </div>
        <div className="product-page-container">
          <ProductFilter  changeCurrentPage={changeCurrentPage} fetchProduct={fetchProduct}/>
            <div className="list-of-product-in-page">
              {products.length>0 &&
                products.map(product => <ProductCard key={product.decId} product={product} />)
              }
              {products.length===0 && <div>No Results</div>}
            </div>
        </div>
      </> 
  );

  return content;
}

export default ProductPage;