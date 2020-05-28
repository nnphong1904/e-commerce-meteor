import React, { useState, useEffect } from 'react';
import AddProductForm from '../AddProductForm/AddProductForm.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import axios from 'axios';
const EditProduct = ({turnOffForm=()=>{}, editedProductId})=>{
  const [editedProduct, setEditedProduct] = useState({});
  const [notifyMessage, setNotifyMessage] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(()=>{
    Meteor.call('fetchProductById', editedProductId, (err, result)=>{
      setEditedProduct({...result.data[0]});
      // Session.set('editedProduct', {...result.data[0]})
    })
  }, []);
  const updateProduct = (file, name, category, brand, price, sizesName, sizesQuantity, color)=>{
    
    if ( sizesName.length === 0 || sizesQuantity.length === 0 ){
      console.log('err')
      setNotifyMessage('Missing some fields');
      setHasError(true);
      const timeoutId = setTimeout(()=>{
        setNotifyMessage('');
        setHasError(false);
        setIsLoading(false);
        clearTimeout(timeoutId);
      },2000);
      return ;
    }
    if (sizesName.map(size=>size.value).length !== sizesQuantity.length){
      setNotifyMessage('You have not input quantity for each sizes');
      setHasError(true);
      const timeoutId = setTimeout(()=>{
        setNotifyMessage('');
        setHasError(false);
        clearTimeout(timeoutId);
      },2000);
      return;
    }
      setIsLoading(true);
      setNotifyMessage('Loading....');
      const newProduct = new FormData();
      const UPDATE_URL = `http://localhost:4000/api/v1/product/${editedProductId}`;
      newProduct.append('sizesName',sizesName.map(size=>size.value).join(','));
      newProduct.append('sizesQuantity', sizesQuantity.join(','));
      newProduct.append('category', category.value);
      Meteor.call('getHashedToken', (err, result)=>{
        axios.put(UPDATE_URL, newProduct, {
          headers: {
            'Authorization': result
          }
        })
          .then(res => {
            if (res.status === 200){
              const timeoutId = setTimeout(()=>{
                setNotifyMessage('Update product success');
                setHasError(false);
                setIsLoading(false)
                clearTimeout(timeoutId);
              },1000); 
             
            
            }
            else {
              const timeoutId = setTimeout(()=>{
                setNotifyMessage('Update product failed');
                setHasError(true);
                clearTimeout(timeoutId);
              },1000); 
            }
            const timeoutId = setTimeout(()=>{
              setNotifyMessage('');
              setHasError(false);
              setIsLoading(false);
              clearTimeout(timeoutId);
            },2000); 
          })
      });
    
    
  }
  const content = (
    <>
      <AddProductForm isLoading={isLoading} message={notifyMessage} hasError={hasError} onSubmitHandler={updateProduct} isDisabled={true} product={editedProduct} turnOffForm={turnOffForm}/>
    </>
  );
  return content;
}

export default withTracker(()=>{
  return {
    editedProductId: Session.get('editedProductId')
  }
})(EditProduct);