import React, {useState, useEffect} from 'react';
import ProductTableAdmin from '../../components/ProductsTableAdmin/ProductsTableAdmin.jsx';
import './ProductAdminContent.css';
import PlusIcon from '../../assets/image/plus-white.svg';
import EditProduct from '../../components/EditProduct/EditProduct.jsx';
import AddProduct from '../../components/AddProduct/AddProduct.jsx';
const ProductAdminContent = ()=>{
  const fetchProduct = async (condition, currentPageForFetching=1)=>{
    await Meteor.call('fetchAllProduct',(err,result)=>{
      if (!err) {
        setProducts([...result.data]);
       
      }
      else {
        console.log(err);
      }
    })
  }

  const [products, setProducts] = useState([]);
  const [showAddProductForm, setShowAddProductFrom] = useState(false);
  const [showEditProductForm, setShowEditProductForm] = useState(false);
  const showFormForAddProduct = ()=>{
    setShowAddProductFrom(true);
  }
  useEffect(()=>{
    fetchProduct({});
  },[]);
  
  const content = (
    <>
      {
        showAddProductForm === true  && <AddProduct productsList={products} updateProductList={setProducts} turnOffForm={setShowAddProductFrom}/>
      }
      {
        showEditProductForm === true && <EditProduct turnOffForm={setShowEditProductForm} />
      }
      {showAddProductForm === false && showEditProductForm === false && <div className="products-admin-table-container">
        <button onClick={showFormForAddProduct} className="add-new-product-admin">
          <img className="plus-icon" src={PlusIcon}/>
          <span>Add Product</span>
        </button>
        <ProductTableAdmin turnOnEditProductForm={setShowEditProductForm} productsList={products}/>
      </div>}
    </>
  );
  return content;
}

export default ProductAdminContent;