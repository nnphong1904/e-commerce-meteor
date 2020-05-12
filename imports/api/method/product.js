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
    const result = await ProductCollection.find({'sizeList.size':size}).fetch();
    console.log(result.data);
    return {success: true, data: result};
  }
  catch(err){
    return {success: false, msg:'can not found'};
  }
}

export const getNoItemOfProduct =  async (filterCondition) => {
  console.log(filterCondition);
  const matchingConditionFilter = filterCondition === 'in stored' ? {$ne:0} : 0;   
  console.log(matchingConditionFilter);
    const pipe = [{
          $project: {
            name:1, 
            price:1, 
            rating:1, 
            avt:1, 
            decId:1, 
            sizes:1, 
            branch:1, 
            color: 1,
            numberOfItem: {$sum:'$sizes.noItems'}
          }
        },
        {
          $match:{
            numberOfItem: matchingConditionFilter
          }
        }
    ]
    const result =  await ProductCollection.rawCollection().aggregate(pipe).toArray();
    return {success: true, data: [...result]};
     

}