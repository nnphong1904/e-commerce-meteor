import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';
import ProductFilter from '../../components/ProductFilter/ProductFilter.jsx';
import PageSelector from '../../components/PageSelector/PageSelector.jsx';
import './ProductPage.css';
const ProductPage = ()=>{
 
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);

  const changeCurrentPage = (nextPage)=>{
    if (nextPage > 1 && nextPage < 100)
    {
      setCurrentPage(nextPage);
    }
  } 
  console.log('rendering');
  const fetchProduct = async (condition)=>{
      await Meteor.call('fetchProduct',condition,currentPage,(err,result)=>{
        if (!err) setProducts([...result.data]);
        else {
          console.log(err);
        }
      })
    }
  const goProductInfo = (product)=>{
      const productId = product._id._bsontype === 'ObjectID' ? arrayBufferToHex(product._id.id) : product._id._str;
      console.log(productId);
      FlowRouter.go(`/products/${productId}`);

  }

  useEffect(()=>{
    fetchProduct({});
  },[currentPage])
  

  const content = (

      <>
        <div className="page-selector-container">
          <PageSelector textDisplay={`/100`} onClickFunction={changeCurrentPage}/>
        </div>
        <div className="product-page-container">
          <ProductFilter fetchProduct={fetchProduct}/>
            {products.length>0 &&
              products.map(product => <ProductCard onClickFunction={goProductInfo} key={product.decId} product={product} />)
            }
            {products.length===0 && <div>No Results</div>}
        </div>
      </> 
  );

  return content;
}

export default ProductPage;