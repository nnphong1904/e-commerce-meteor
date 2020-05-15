import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';
import ProductFilter from '../../components/ProductFilter/ProductFilter.jsx';
import PageSelector from '../../components/PageSelector/PageSelector.jsx';
import './ProductPage.css';
const NUMBER_ITEM_PER_PAGE = 20;
const ProductPage = ()=>{
 
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [numberOfPage, setNumberOfPage] = useState()
  console.log('rendering');
  const fetchProduct = async (condition)=>{
      await Meteor.call('fetchProduct',condition,currentPage,(err,result)=>{
        if (!err) {
          setProducts([...result.data]);
          setNumberOfPage(Math.round(result.dataLength/NUMBER_ITEM_PER_PAGE));
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
      }
    } 

  useEffect(()=>{
    fetchProduct({});
  },[currentPage]);
  

  const content = (

      <>
        <div className="page-selector-container">
          <PageSelector textDisplay={`/${numberOfPage}`} maxValue={numberOfPage} onClickFunction={changeCurrentPage}/>
        </div>
        <div className="product-page-container">
          <ProductFilter fetchProduct={fetchProduct}/>
            {products.length>0 &&
              products.map(product => <ProductCard key={product.decId} product={product} />)
            }
            {products.length===0 && <div>No Results</div>}
        </div>
      </> 
  );

  return content;
}

export default ProductPage;