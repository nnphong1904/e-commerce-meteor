import ProductCollection from '../product';
import arrayBufferToHex from 'array-buffer-to-hex';
import { number } from 'prop-types';
export const addProduct = (product)=>{
  try{
    ProductCollection.insert(product);
    return {success: true, msg: 'add success'};
  }
  catch(err){
    return {success: false, msg: 'can not add success', error:err};
  }
}

export const fetchProduct = async (condition, currentPage, numberItemPerPage = 20)=>{
  try{
    let result; 
    // console.log(currentPage, numberItemPerPage);
    if (Object.entries(condition).length === 0)    
    {
         result = await ProductCollection.find({}).fetch();
    } 
    else {
        let matchingFilterCondition = {};

        if (condition.size !== '' && condition.size !== undefined) 
        {
          matchingFilterCondition.sizes =  {$elemMatch: {size:condition.size}};
        }
        
        if (condition.category !== '' && condition.category !== undefined )
        { 
          matchingFilterCondition.category = condition.category;
        }
      
        if (condition.color !== undefined && condition.color.length > 0)
        {
          matchingFilterCondition.color = {$in: condition.color};
        }
        

        if (condition.branch !== undefined && condition.branch.length > 0  )
        {
          matchingFilterCondition.branch = {$in: condition.branch};
        }
        
        
        if (condition.price !== undefined && condition.price.doPriceFilter === true  ) 
        {
          const maxPrice = parseInt(condition.price.priceValue1) >= parseInt(condition.price.priceValue2) ? parseInt(condition.price.priceValue1) : parseInt(condition.price.priceValue2);
          const minPrice = parseInt(condition.price.priceValue1) <= parseInt(condition.price.priceValue2) ? parseInt(condition.price.priceValue1) : parseInt(condition.price.priceValue2);

          matchingFilterCondition.$and = [{price:{$lte: maxPrice}}, {price:{$gte: minPrice}}];
        }

        if (condition.outStockOrInStored !== undefined && condition.outStockOrInStored.doFilterByNumberOfItem === true  ){
          if (condition.outStockOrInStored.outOffStock !== condition.outStockOrInStored.inStored){
            if (condition.outStockOrInStored.outOffStock === false){
              matchingFilterCondition.numberOfItem = {$ne:0};
            }
            else {
              matchingFilterCondition.numberOfItem = 0;
            }
          }
          
        }
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
        result =  await ProductCollection.rawCollection().aggregate(pipe).toArray();
    }
    const dataLength = result.length;
    const startIndex = (currentPage - 1) * numberItemPerPage;
    const endIndex = result.length > numberItemPerPage ? (startIndex + numberItemPerPage) : result.length;
    result = [...result.slice(startIndex, endIndex)];
    return {success: true, data: [...result], dataLength};
  }
  catch(err){
    return {success: false, msg:'can not found'};
  }
}

export const fetchProductById = async (id)=>{
  console.log('hello1');
  const newObjectId = new Mongo.ObjectID(id);
  try{
    const result = await ProductCollection.find({_id: newObjectId}).fetch();
    return {success: true, data: result};
  }
  catch(err){
    return {success: false, err};
  }
  
}

