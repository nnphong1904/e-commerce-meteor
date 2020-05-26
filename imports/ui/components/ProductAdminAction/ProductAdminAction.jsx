import React from 'react';
import './ProductAdminAction.css';
import Edit from '../../assets/image/edit.svg';
import Remove from '../../assets/image/remove.svg';
import axios from 'axios';
const ProductAdminAction = ({updateProductsList=()=>{}, currentList=[], productIndex=0 ,productId=''})=>{
  const removeProduct = (id, index)=>{
    const newProductsList = [...currentList.slice(0, index),
                             ...currentList.slice(index+1)  
                            ]
    updateProductsList([...newProductsList]);
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
      })
      .catch(err=>{
        console.log(err);
      })
    });
    
  }
  const content = (
    <div className="product-admin-action-holder">
       <div 
            onClick={()=>{
              // removeProduct(productId, productIndex);
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