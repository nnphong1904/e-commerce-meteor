import React, { createRef, useState, useEffect } from 'react';
import {Meteor} from 'meteor/meteor';

export const Info = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [retail, setRetail] = useState('');
  const [availableSize, setAvailableSize] = useState([]);
  const [color, setColors] = useState([]);
  // const [content, setContent] = useState('');
 // const [content, setContent] = useState('');

  const [products, setProducts] = useState([]);
  useEffect(() => {
     Meteor.call('fetchProduct', {}, (err,result)=>{
        console.log(result.data);
        setProducts([...result.data]);
      });
  },[]);
  console.log(products);
  const submitHandle = (e)=>{
    const newProduct ={
      name,
      price: parseFloat(price),
      rating: parseFloat(rating),
      retail: parseInt(retail),
      availableSize: availableSize.split(',').map(size=>size.trim()),
      color: color.split(',').map(color=>color.trim()) 
    }
    try{
      Meteor.call('addProduct', newProduct, (err, result)=>{
      });
    }
    catch(err){
      console.log(err);
    }
     
      e.preventDefault();
      setName('');
      setPrice('');
      setRetail('');
      setRating('');
      setAvailableSize('');
      setColors('');
  }
  
  const onChange = (e, setState)=>{
    setState(e.target.value);
  }



  return (
    <div>
      <h2>Learn Meteor!</h2>
      <form onSubmit={(e)=>submitHandle(e)}>
        <input 
          onChange={(e)=>onChange(e,setName)}
          type="text"
          value = {name}
          placeholder="product name"
        />
         <input 
          onChange={(e)=>onChange(e, setPrice)}
          type="text"
          value = {price}
          placeholder="price"
        />
         <input 
          onChange={(e)=>onChange(e, setRating)}
          type="text"
          value = {rating}
          placeholder="rating"
        />
         <input 
          onChange={(e)=>onChange(e, setRetail)}
          type="text"
          value = {retail}
          placeholder="retail"
        />
         <input 
          onChange={(e)=>onChange(e, setAvailableSize)}
          type="text"
          value = {availableSize}
          placeholder="sizes"
        />
        <input 
          onChange={(e)=>onChange(e, setColors)}
          type="text"
          value = {color}
          placeholder="colors"
        />
        <input type="submit"/>
      </form>
    </div>
  );
};
