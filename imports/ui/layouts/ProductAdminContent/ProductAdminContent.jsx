import React, {useState, useEffect} from 'react';
import ProductTableAdmin from '../../components/ProductsTableAdmin/ProductsTableAdmin.jsx';
import './ProductAdminContent.css';
import PlusIcon from '../../assets/image/plus-white.svg';
import AddProductForm from '../../components/AddProductForm/AddProductForm.jsx';
import AddProduct from '../../components/AddProduct/AddProduct.jsx';
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
  const [showAddProductForm, setShowAddProductFrom] = useState(true);

  const showFormForAddProduct = ()=>{
    setShowAddProductFrom(true);
  }
  useEffect(()=>{
    fetchProduct({});
    console.log(products);
  },[]);
  
  const content = (
    <>{
        showAddProductForm === true && <AddProduct turnOffForm={setShowAddProductFrom}/>
      }
      {showAddProductForm === false && <div className="products-admin-table-container">
        <button onClick={showFormForAddProduct} className="add-new-product-admin">
          <img className="plus-icon" src={PlusIcon}/>
          <span>Add Product</span>
        </button>
        <ProductTableAdmin productsList={products}/>
      </div>}
    </>
  );
  return content;
}

export default ProductAdminContent;