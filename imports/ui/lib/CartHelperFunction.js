
export const addToCart = (product, productColor, productQuantity, productSize)=>{
  
  const productObjectInCart = {
    productId: product._id._str,
    name: product.name,
    avatar: product.avt,
    color: productColor,
    quantity: productQuantity,
    size: productSize,
    price: product.price
  };
  
  const myCart = Session.get('myCart');
  const existingProductInCart = myCart.findIndex((productInCart, indexOfProduct) => productInCart.productId === productObjectInCart.productId && productInCart.size === productObjectInCart.size && productObjectInCart.color === productInCart.color )
  
  if (existingProductInCart === -1){
    console.log('add new');
    Session.set('myCart', [...myCart, productObjectInCart]);
  }
  else if (existingProductInCart !== -1){
    console.log('update');
    let newCart = [];
    if (myCart.length === 1){
       console.log('length 1')
       newCart = [{
                    ...myCart[existingProductInCart], 
                    quantity: myCart[existingProductInCart].quantity + productQuantity}];
    }
     else
     {
        newCart = [...myCart.slice(0, existingProductInCart),
                    ...myCart.slice(existingProductInCart+1), 
                    {...myCart[existingProductInCart], 
                      quantity: myCart[existingProductInCart].quantity + productQuantity}
                  ];
        console.log(newCart);
     }
     Session.set('myCart',[...newCart]);
  }
  
}

export const increaseQuantityInCart = (ref)=>{
  const indexOfProduct = parseInt(ref.current.id);
  const myCart = [...Session.get('myCart')];
  let myNewCart = [...Session.get('myCart')];
  const updatingProduct = myCart[indexOfProduct];
  if (indexOfProduct === 0){
    myNewCart = [{...updatingProduct, quantity: updatingProduct.quantity + 1},...myCart.slice(1)];
  }
  else {
    myNewCart = [...myCart.slice(0, indexOfProduct),
                 {...updatingProduct, quantity: updatingProduct.quantity + 1},
                 ...myCart.slice(indexOfProduct+1)
                ]
  }
  Session.set('myCart', [...myNewCart]);
}

export const decreaseQuantityInCart = (ref)=>{
  const indexOfProduct = parseInt(ref.current.id);
  const myCart = [...Session.get('myCart')];
  let myNewCart = [];
  const updatingProduct = myCart[indexOfProduct];
  if (updatingProduct.quantity === 1){
    return;
  }
  if (indexOfProduct === 0){
    myNewCart = [{...updatingProduct, quantity: updatingProduct.quantity - 1},...myCart.slice(1)];
  }
  else {
    myNewCart = [...myCart.slice(0, indexOfProduct),
                 {...updatingProduct, quantity: updatingProduct.quantity - 1},
                 ...myCart.slice(indexOfProduct+1)
                ]
  }
  Session.set('myCart', [...myNewCart]);
}
export const changeQuantityInCartByTyping = (e, ref)=>{
  let quantityValue = e.target.value===''? 0 : parseInt(e.target.value);
  console.log(quantityValue);
  const indexOfProduct = parseInt(ref.current.id);
  const myCart = [...Session.get('myCart')];
  let myNewCart = [];
  const updatingProduct = myCart[indexOfProduct];
  
    if (indexOfProduct === 0){
      myNewCart = [{...updatingProduct, quantity: quantityValue},...myCart.slice(1)];
    }
    else {
      myNewCart = [...myCart.slice(0, indexOfProduct),
                   {...updatingProduct, quantity: quantityValue},
                   ...myCart.slice(indexOfProduct+1)
                  ]
    }
  
  Session.set('myCart',[...myNewCart]);
}

export const removeItemFromCart = (productIndex)=>{
  let myNewCart = [];
  const myCart = [...Session.get('myCart')];
  const indexOfProduct = parseInt(productIndex);
  console.log(indexOfProduct)
  if (indexOfProduct === 0){
    myNewCart = [...myCart.slice(1)];
  }
  else {
    myNewCart = [...myCart.slice(0, indexOfProduct),
                 ...myCart.slice(indexOfProduct+1)
                ]
  }
  Session.set('myCart', [...myNewCart]);
  // console.log(ref.current.children[0]);
  console.log(productIndex);
}

export const clearCart = ()=>{
  Session.set('myCart', []);
}