import React, { useState, useEffect } from 'react';
import AddProductForm from '../AddProductForm/AddProductForm.jsx';
import axios from 'axios';

const AddProduct = ({turnOffForm = ()=>{}})=>{
  const [notifyMessage, setNotifyMessage] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addProduct = (file, name, category, brand, price, sizesName, quantity, color)=>{
    setIsLoading(true);
    setNotifyMessage('Loading....');
    if (!file || name === '' || price === '' || !category || !brand || !sizesName || !quantity || !color){
      setNotifyMessage('Missing some fields');
      setHasError(true);
      setIsLoading(false);
      const timeoutId = setTimeout(()=>{
        setNotifyMessage('');
        clearTimeout(timeoutId);
      }, 3000)
      return ;
    }
    if (sizesName.map(size=>size.value).length !== quantity.length){
      setNotifyMessage('You have not input quantity for each sizes');
      setHasError(true);
      setIsLoading(false);
      const timeoutId = setTimeout(()=>{
        setNotifyMessage('');
        clearTimeout(timeoutId);
      }, 3000)
      return;
    }
    
    const newProduct = new FormData();
    // newProduct.append('avt', file, file.name);
    newProduct.append('avt', file);
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
       
        if (res.status === 201){
          // setNotifyMessage('Add new product success');
          // setHasError(false);
          const timeoutId = setTimeout(()=>{
            setNotifyMessage('Add new product success');
            setHasError(false);
            setIsLoading(false)
            clearTimeout(timeoutId);
          }, 3000)
        }
        else {
          // setNotifyMessage('Add new product failed');
          // setHasError(true);
          const timeoutId = setTimeout(()=>{
            setNotifyMessage('Add new product failed');
            setHasError(true);
            setIsLoading(false);
            clearTimeout(timeoutId);
          }, 3000)
        }
        const timeoutId = setTimeout(()=>{
          setNotifyMessage('');
          setHasError(false);
          clearTimeout(timeoutId);
        }, 5000)
      })
    });
   

  }
  const content = (
    <div>
      <AddProductForm isLoading={isLoading} onSubmitHandler={addProduct} hasError={hasError} message={notifyMessage} turnOffForm={turnOffForm}/>
    </div>
  );
  return content;
}

export default AddProduct;