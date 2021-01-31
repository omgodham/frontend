import React , {useState,useEffect}from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { createProduct } from "./helper/adminapicalls";
import {getCategories} from "./helper/adminapicalls";

export default function CreateProduct() {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: false,
    createdProduct: "",
    isRedirect: false,
    formData: "",
  });

  const {
    name,
    price,
    description,
    stock,
    photo,
    categories,
    category,
    loading,
    error,
    createdProduct,
    isRedirect,
    formData,
  } = values;

useEffect(()=> {
    getAllCategories();
},[])

const getAllCategories = () => {
    getCategories().then(data => {
        if(data.error){
            setValues({...values,error:data.error})
        }else{
            console.log(data);
            setValues({...values,categories:data})
        }
    })
}

  const createProductForm = () => {
    return (
      <form>
        <span>Post photo</span>
        <div className="form-group">
          <label className="btn btb-block btn-success">
            <input type="file" name="photo" placeholder="Choose a file" 
                onChange={handleChange('photo')}
            />
          </label>
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange('name')}
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleChange('description')}

          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange('price')}
          />
        </div>
        <div className="form-group">
          <select className="form-control" placeholder="category" onChange={handleChange('category')}>
            {categories.map(item => {
                return <option value={item.name}>{item.name}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <input className="form-control" type="number" placeholder="Stock" 
              onChange={handleChange('stock')}
          />
        </div>
        <button className="btn btn-outline-success mb-3" type="submit" onClick={onSubmit}>
          Create Product
        </button>
      </form>
    );
  };

const handleChange = name => event =>{
//
}

const onSubmit = event => {
    event.preventDefault();
}

  return (
    <Base
      title="Create Product"
      description="create product here"
      className="container bg-info p-4"
    >
      <Link
        to="/admin/dashboard"
        className="btn btn-md bg-dark text-white mb-2"
      >
        Admin Dashboard
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">{createProductForm()}</div>
      </div>
    </Base>
  );
}
