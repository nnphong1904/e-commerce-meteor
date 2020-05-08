import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './ProductPage.css';
const ProductPage = ()=>{
  const [products, setProducts] = useState([]);
  console.log('rendering');
  const fetchProduct = async ()=>{
    await Meteor.call('fetchProduct',{},(err,result)=>{
      if (!err) setProducts([...result.data]);
      else {
        console.log(err);
      }
    })
  }

  useEffect(()=>{
    fetchProduct();
  },[])

  const content = (

      <>
        <div className="filter-value">Ladies/Dresses</div>
         <div className="product-page-container">
            {products.length>0 &&
              products.map(product => <ProductCard key={product.decId} product={product} />)
            }
         </div>

      </> 
  );

  return content;
}

export default ProductPage;