import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';
import './ProductPage.css';
const ProductPage = ()=>{
 
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  console.log('rendering');
  const fetchProduct = async (condition)=>{
      await Meteor.call('fetchProduct',condition,currentPage,(err,result)=>{
        if (!err) setProducts([...result.data]);
        else {
          console.log(err);
        }
      })
    }
  

  useEffect(()=>{
    fetchProduct({});
  },[])
  

  const content = (

      <>
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