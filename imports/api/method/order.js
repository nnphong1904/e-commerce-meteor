import OrderCollection from '../order';
export const addOrder = async (order)=>{
  const result = await OrderCollection.insert(order);
  return result
}