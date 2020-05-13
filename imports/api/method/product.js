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
 //console.log(condition);
  try{
    if (Object.entries(condition).length === 0)    
      {
        const result = await ProductCollection.find({}).fetch();
        return {success: true, data:[...result]};
      } 
    let matchingFilterCondition = {};
    if (condition.size !== '') matchingFilterCondition.sizes =  {$elemMatch: {size:condition.size}};
   
    if (condition.category !== '') matchingFilterCondition.category = condition.category;
  
    if (condition.color.length > 0) matchingFilterCondition.color = {$in: condition.color};

    if (condition.branch.length > 0) matchingFilterCondition.branch = {$in: condition.branch};

    if (condition.price.doPriceFilter === true) 
     {
       const maxPrice = parseInt(condition.price.priceValue1) >= parseInt(condition.price.priceValue2) ? parseInt(condition.price.priceValue1) : parseInt(condition.price.priceValue2);
       const minPrice = parseInt(condition.price.priceValue1) <= parseInt(condition.price.priceValue2) ? parseInt(condition.price.priceValue1) : parseInt(condition.price.priceValue2);

       matchingFilterCondition.$and = [{price:{$lte: maxPrice}}, {price:{$gte: minPrice}}];
     }

     if (condition.outStockOrInStored.doFilterByNumberOfItem === true){
       if (condition.outStockOrInStored.outOffStock !== condition.outStockOrInStored.inStored){
         if (condition.outStockOrInStored.outOffStock === false){
           matchingFilterCondition.numberOfItem = {$ne:0};
         }
         else {
           matchingFilterCondition.numberOfItem = 0;
         }
       }
      
     }
  // console.log(matchingFilterCondition);
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
          numberOfItem: {$sum:'$sizes.noItems'},
          category:1
        }
      },
      {
        $match:{
        ...matchingFilterCondition
        }
      }]; 
      
      const result =  await ProductCollection.rawCollection().aggregate(pipe).toArray();
      return {success: true, data: [...result]};
    }
  catch(err){
    return {success: false, msg:'can not found'};
  }
}



