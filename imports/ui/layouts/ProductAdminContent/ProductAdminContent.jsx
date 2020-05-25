import React, {useState, useEffect} from 'react';
import ProductTableAdmin from '../../components/ProductsTableAdmin/ProductsTableAdmin.jsx';
import './ProductAdminContent.css';
const ProductAdminContent = ()=>{
  const fetchProduct = async (condition, currentPageForFetching=1)=>{
     
    await Meteor.call('fetchProduct',condition,currentPageForFetching,6,(err,result)=>{
      console.log(result.data);
      if (!err) {
        setProducts([...result.data]);
       
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