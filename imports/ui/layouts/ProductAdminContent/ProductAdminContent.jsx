import React, {useState, useEffect} from 'react';
import ProductTableAdmin from '../../components/ProductsTableAdmin/ProductsTableAdmin.jsx';
import './ProductAdminContent.css';
const ProductAdminContent = ()=>{
  const fetchProduct = async (condition, currentPageForFetching=1)=>{
     
    await Meteor.call('fetchProduct',condition,currentPageForFetching,10,(err,result)=>{
      console.log(result.data);
      if (!err) {
        setProducts([...result.data]);
       
        // if (Math.round(result.dataLength/NUMBER_ITEM_PER_PAGE) === 0){
        //   setNumberOfPage(1);
        // }
        // else{
        //   setNumberOfPage(Math.round(result.dataLength/NUMBER_ITEM_PER_PAGE));
        // }
      }
      else {
        console.log(err);
      }
    })
  }
  const [products, setProducts] = useState([]);
  useEffect(()=>{
    fetchProduct({});
    console.log(products);
  },[]);
  
  const content = (
    <div className="products-admin-table-container">
      <ProductTableAdmin productsList={products}/>
    </div>
  );
  return content;
}

export default ProductAdminContent;