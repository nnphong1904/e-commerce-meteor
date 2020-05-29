import React from 'react';
import './ProductAdminAction.css';
import Edit from '../../assets/image/edit.svg';
import Remove from '../../assets/image/remove.svg';
import axios from 'axios';
const ProductAdminAction = ({updateProductsList=()=>{} ,turnOnEditForm = ()=>{} ,currentList=[], oldList=[] ,productIndex=0 ,productId='', updateCurrentPage=()=>{} ,updateNumberOfPage=()=>{} ,currentPage=1})=>{
  const removeProduct = (id, index)=>{

    const URL = `http://localhost:4000/api/v1/product/${id}`;
    Meteor.call('getHashedToken', (err, result)=>{
      // console.log(result);
      
      axios.delete(URL, {
        headers: {
          'Authorization': result
        }
      })
      .then(res=>{
        console.log(res);
        const newDisplayingProductsList = [...currentList.slice(0, index),
          ...currentList.slice(index+1)  
         ];
        const originIndex = index + (currentPage -1)*6;
        const newProductsList = [...oldList.slice(0,originIndex), ...oldList.slice(originIndex+1)];
        if (newDisplayingProductsList.length === 0){
        updateNumberOfPage(old => old -1);
        updateProductsList.setCurrentProductsList([...oldList.slice((currentPage-2)*6,(currentPage-2)*6+6 )]);
        updateCurrentPage(currentPage-1);
        }
        else{
        updateProductsList.setCurrentProductsList([...newDisplayingProductsList]);
        }

        updateProductsList.setOldProductsList([...newProductsList]);
      })
      .catch(err=>{
       window.alert('Sorry server is down!!');
      })
    });
    
  }
  const content = (
    <div className="product-admin-action-holder">
       <div 
            onClick={(e)=>{
              turnOnEditForm(true);
              Session.set('editedProductId', productId);
            }}
            id={productId} className="product-action">
         <img className="product-action-icon" src={Edit}/>
         <div className="product-action-title">Edit</div>
       </div>
       <div
            onClick={()=>{
              removeProduct(productId, productIndex);
            }}
             id={productId} className="product-action">
         <img className="product-action-icon" src={Remove}/>
         <div className="product-action-title">Remove</div>
       </div>
    </div>
  );

  return content;
}

export default ProductAdminAction;