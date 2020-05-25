import React, { useState } from 'react';
import './AddProductForm.css';
import AddCircle from '../../assets/image/add-circle.svg';
import CancelImage from '../../assets/image/cancel-image.svg';
import Select from 'react-select'
import QuantityInput from '../QuantityInput/QuantityInput.jsx';
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const AddProductForm = ({product={}})=>{
  const [file, setFile] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  
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

  const content = (
    <form className="add-product-form" >
      <div className='product-field-holder'>
        <span className="field-title ">PHOTOS</span>
        <div>
          <div className="field-container">
          {imagePreviewUrl !=='' && <img onClick={cancelImage} className="cancel-image" src={CancelImage}/>}
            <label className="image-field">  
              <input className="input-image-file" type='file' name='avt' onChange={(e)=>{handleImageChange(e)}} />
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
            <input className="input-text-field" type='text' name='name'/>
          </label> 
        </div>
      </div>
      <div className="product-field-holder">
        <span className="field-title ">CATEGORY</span>
        <div className='field-container'>
          <label className='category-input-field'>
           <Select
            className="category-input-field" 
            name="category"
            options={options}
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
            className="category-input-field" 
            name="brand"
            options={options}
            placeholder="category"
            id="category-input"
            />
          </label> 
        </div>
      </div>
      <div className="product-field-holder input-text-field-holder">
        <span className="field-title ">{`PRICE($)`}</span>
        <div className='field-container'>
          <label>
            <input className="input-text-field" type='text' name='price'/>
          </label> 
        </div>
      </div>
      <div className="product-field-holder">
        <span className="field-title ">SIZES</span>
        <div className='field-container'>
          <label className='category-input-field'>
           <Select
            className="category-input-field" 
            name="sizesName"
            options={options}
            placeholder="category"
            id="category-input"
            isMulti
            />
          </label> 
        </div>
      </div>
      <div className="product-field-holder input-text-field-holder">
        <span className="field-title ">QUANTITY</span>
        <div className='field-container'>
          <QuantityInput/>
        </div>
      </div>
      <div className="product-field-holder">
        <span className="field-title ">COLOR</span>
        <div className='field-container'>
          <label className='category-input-field'>
           <Select
            className="category-input-field" 
            name="color"
            options={options}
            placeholder="category"
            id="category-input"
            isMulti
            />
          </label> 
        </div>
      </div>
    </form>
  );

  return content;
}
export default AddProductForm;