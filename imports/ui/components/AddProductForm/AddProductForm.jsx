import React, { useState, useEffect } from 'react';
import './AddProductForm.css';
import AddCircle from '../../assets/image/add-circle.svg';
import CancelImage from '../../assets/image/cancel-image.svg';
import Select from 'react-select'
import QuantityInput from '../QuantityInput/QuantityInput.jsx';
import classNames from 'classnames';
import { withTracker } from 'meteor/react-meteor-data';
import {CATEGORY, BRAND_NAME, SIZE_LIST, COLOR_LIST} from '../../lib/Constant.js';


const colorOptions = COLOR_LIST.map(
  color => {
    return {
      value: color.colorValue,
      label: color.colorValue
    };
  }
)
const brandOptions = [
  {value:`h&m`, label:BRAND_NAME.get(`h&m`)},
  {value:`zara`, label:BRAND_NAME.get(`zara`)},
  {value:`pull&bear`, label:BRAND_NAME.get(`pull&bear`)},
  {value:`dior`, label:BRAND_NAME.get(`dior`)},
  {value:`chanel`, label:BRAND_NAME.get(`chanel`)}
  
];

const sizesOptions= [
  {value:SIZE_LIST[0], label:SIZE_LIST[0]},
  {value:SIZE_LIST[1], label:SIZE_LIST[1]},
  {value:SIZE_LIST[2], label:SIZE_LIST[2]}
]

const categoryOption = [
  {value: `rompers/jumpsuits`, label: CATEGORY.get(`rompers/jumpsuits`)},
  {value: `casual dresses`, label: CATEGORY.get(`casual dresses`)},
  {value: `going out dresses`, label: CATEGORY.get(`going out dresses`)},
  {value: `party/ocassion dresses`, label: CATEGORY.get(`party/ocassion dresses`)},
  {value: `mini dresses`, label: CATEGORY.get(`mini dresses`)},
  {value: `maxi/midi dresses`, label: CATEGORY.get(`maxi/midi dresses`)},
  {value: `sets`, label: CATEGORY.get(`sets`)},
];

const AddProductForm = ({product={}, isDisabled=false ,hasError=false ,onSubmitHandler= ()=>{}, message='' ,turnOffForm=()=>{}})=>{
 
  const [file, setFile] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [sizesName, setSizesName] = useState();
  const [sizesQuantity, setSizesQuantity] = useState([]);
  const [color, setColor] = useState('');
  const [brand, setBrand] = useState();
  useEffect(()=>{
    if (Object.entries(product).length !== 0){
     
      setImagePreviewUrl(product.avt);
      onChangeHandler(null, setName, product.name);
      onChangeHandler(null, setPrice, product.price);
      setCategory({value: product.category, label: CATEGORY.get(product.category)});
      setBrand({value: product.branch, label: BRAND_NAME.get(product.branch)});
      setColor({value: product.color, label: product.color});
      setSizesName(product.sizes.map(size =>{return {value: size.size, label: size.size}}));
     
    }

  }, [product])
  
  const onChangeHandler = (e, setState, newValue = '')=>{
    if (newValue !== ''){
      setState(newValue);
      return;
    }
    setState(e.target.value);
  }
  // console.log(category);
  const handleImageChange = (e)=>{
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onload = ()=>{
      setFile(file);
      setImagePreviewUrl(reader.result);
    }

    reader.readAsDataURL(file);
  }
  const cancelImage = ()=>{
    setFile('');
    setImagePreviewUrl('');
  }
  // console.log(file);
  const content = (
    <>
      <form
          onSubmit={(e)=>{
            e.preventDefault();
          }}
         className="add-product-form" 
         encType="multipart/form-data">
        <div className='product-field-holder'>
          <span className="field-title ">PHOTOS</span>
          <div>
            <div className="field-container">
            {imagePreviewUrl !=='' && isDisabled === false && <img onClick={cancelImage} className="cancel-image" src={CancelImage}/>}
              <label className="image-field">  
                <input disabled={isDisabled} className="input-image-file" type='file' name='avt' onChange={(e)=>{handleImageChange(e)}} />
                <div className="image-preview-holder">
                  <img className="image-preview" alt='' src={imagePreviewUrl}/>
                  {imagePreviewUrl === '' && <div className="add-image-notify">
                    <img className="add-circle-icon" src={AddCircle}/>
                    <span>Add Photo</span>
                  </div>}
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="product-field-holder input-text-field-holder">
          <span className="field-title ">NAME</span>
          <div className='field-container'>
            <label>
              <input disabled={isDisabled} value={name} onChange={e=>{onChangeHandler(e, setName)}} className="input-text-field" type='text' name='name'/>
            </label> 
          </div>
        </div>
        <div className="product-field-holder">
          <span className="field-title ">CATEGORY</span>
          <div className='field-container'>
            <label className='category-input-field'>
             <Select
             
              value={category}
              onChange={setCategory}
              className="category-input-field" 
              name="category"
              options={categoryOption}
              placeholder="category"
              id="category-input"
              />
            </label> 
          </div>
        </div>
        <div className="product-field-holder">
          <span className="field-title ">BRAND</span>
          <div className='field-container'>
            <label className='category-input-field'>
             <Select
              isDisabled={isDisabled}
              value={brand}
              onChange={setBrand}
              className="category-input-field" 
              name="brand"
              options={brandOptions}
              placeholder="brand"
              id="category-input"
              />
            </label> 
          </div>
        </div>
        <div className="product-field-holder input-text-field-holder">
          <span className="field-title ">{`PRICE($)`}</span>
          <div className='field-container'>
            <label>
              <input disabled={isDisabled} value={price} onChange={(e)=>onChangeHandler(e, setPrice)} className="input-text-field" type='text' name='price'/>
            </label> 
          </div>
        </div>
        <div className="product-field-holder">
          <span className="field-title ">SIZES</span>
          <div className='field-container'>
            <label className='category-input-field'>
             <Select
               
              value={sizesName}
              onChange={setSizesName}
              className="category-input-field" 
              name="sizesName"
              options={sizesOptions}
              placeholder="sizes"
              id="category-input"
              isMulti
              />
            </label> 
          </div>
        </div>
        <div className="product-field-holder">
          <span className="field-title ">QUANTITY</span>
          <div className='field-container'>
            <QuantityInput updateQuantityList={setSizesQuantity}/>
          </div>
        </div>
        <div className="product-field-holder">
          <span className="field-title ">COLOR</span>
          <div className='field-container'>
            <label className='category-input-field'>
             <Select
              isDisabled={isDisabled}
              value={color}
              onChange={setColor}
              className="category-input-field" 
              name="color"
              options={colorOptions}
              placeholder="category"
              id="category-input"
              />
            </label> 
          </div>
        </div>
       
      </form>
      <div className="form-btn">       
          <input onClick={()=>{
             onSubmitHandler(file, name, category, brand, price, sizesName, sizesQuantity, color)
          }} className="submit-form-btn" type="submit" value="Submit" />
      </div>
      <button onClick={()=>{turnOffForm(false)}} className="turn-off-form">Cancel</button>
      <div className={
          classNames("notify-for-submit-form", 
                   {'error-notify':hasError === true}, 
                   {'success-notify': hasError === false})}>{message}</div>
    </>
  );

  return content;
}
// export default withTracker(()=>{
//   return {
//     product: Session.get('editedProduct')
//   }
// })(AddProductForm);
export default AddProductForm;