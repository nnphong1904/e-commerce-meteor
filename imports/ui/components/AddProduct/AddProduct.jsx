import React from 'react';
import AddProductForm from '../AddProductForm/AddProductForm.jsx';
import axios from 'axios';
const AddProduct = ({turnOffForm = ()=>{}})=>{
  const addProduct = (file, name, category, brand, price, sizesName, quantity, color)=>{
    if (!file || name === '' || price === '' || !category || !brand || !sizesName || !quantity || !color){
      console.log('error');
      return ;
    }
    if (sizesName.map(size=>size.value).length !== quantity.length){
      console.log('error1');
      return;
    }
    
    const newProduct = new FormData();
    newProduct.append('avt', file, file.name);
    newProduct.append('name', name);
    newProduct.append('price', price);
    newProduct.append('category', category.value);
    newProduct.append('brand', brand.value);
    newProduct.append('sizesName',sizesName.map(size=>size.value).join(','));
    newProduct.append('sizesQuantity', quantity.join(','));
    newProduct.append('color', color.value);
    const URL = 'http://localhost:4000/api/v1/product'
    Meteor.call('getHashedToken', (err, result)=>{
      // console.log(result);
      axios.post(URL, newProduct,{
        headers: {
          'Authorization': result
        }
      })
      .then(res=>{
        console.log(res);
      })
    });
   

  }
  const content = (
    <div>
      <AddProductForm onSubmitHandler={addProduct} turnOffForm={turnOffForm}/>
    </div>
  );
  return content;
}

export default AddProduct;