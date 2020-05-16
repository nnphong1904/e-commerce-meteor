import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartContextProvider = ({children})=>{

  const [myCart, setMyCart] = useState([]);

  const addProductToCart = (product)=>{
    const existingProductInCart = myCart.filter((productInCart, indexOfProduct) =>{
      if (productInCart.product._id._str === product._id._str){
        return {productInCart, indexOfProduct};
      }
      return null;
    })
    if (existingProductInCart === null){
      setMyCart([...myCart, product]);
    }
    else {
      setMyCart([
        ...myCart.slice(0, existingProductInCart.indexOfProduct), 
        ...myCart.slice(existingProductInCart.indexOfProduct+1),
        {...myCart[existingProductInCart.indexOfProduct], quantity: myCart[existingProductInCart.indexOfProduct].quantity+1}
      ]);
    }
  }

  const content = (
    <CartContext.Provider value={{myCart, addProductToCart}}>
      {children}
    </CartContext.Provider>
  );
  return content;

}
