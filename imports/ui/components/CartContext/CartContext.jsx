import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartContextProvider = ({children})=>{
  
  const [myCart, setMyCart] = useState([]);

  
  const addProduct = (product)=>{
    
    const existingProductInCart = myCart.map((productInCart, indexOfProduct) =>{
      if (productInCart.productId === product.productId){
        return indexOfProduct;
      }
    })
 
   
    if (existingProductInCart.length === 0){
      setMyCart([...myCart, product]);
      console.log('a');
    }
    else {
     console.log([
        ...myCart.slice(0, existingProductInCart[0]), 
        ...myCart.slice(existingProductInCart[0]+1),
        {...myCart[existingProductInCart[0]], quantity: myCart[existingProductInCart[0]].quantity+1}
      ]);
      // setMyCart([
      //   ...myCart.slice(0, existingProductInCart[0]), 
      //   ...myCart.slice(existingProductInCart[0]+1),
      //   {...myCart[existingProductInCart[0]], quantity: myCart[existingProductInCart[0]].quantity+1}
      // ]);
    }
  }

  const content = (
    <CartContext.Provider value={{myCart, addProduct}}>
      {children}
    </CartContext.Provider>
  );
  return content;

}
