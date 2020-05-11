import ProductCollection from '../product';
export const addProduct = (product)=>{
  try{
    ProductCollection.insert(product);
    return {success: true, msg: 'add success'};
  }
  catch(err){
    return {success: false, msg: 'can not add success', error:err};
  }
}

export const fetchProduct = async (condition)=>{
  try{
    const result = await ProductCollection.find(condition).fetch();
    return {success: true, data: result};
  }
  catch(err){
    return {success: false, msg:'can not found'};
  }
}

export const fetchProductBySize = async (size)=>{
  try{
    const result = await ProductCollection.find({'sizeList.size':'2XL'}).fetch();
    console.log(result.data);
    return {success: true, data: result};
  }
  catch(err){
    return {success: false, msg:'can not found'};
  }
}