import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthinticated } from "../auth/helper";
import Base from "../core/Base";
import { createProduct, getCategories } from "./helper/adminapicalls";

export default function CreateProduct({ history }) {
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
    const { user, token } = isAuthinticated();
    useEffect(() => {
        getAllCategories();
    }, [])

    const getAllCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, categories: data, formData: new FormData() })
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
                        <option value="">Select</option>
                        {categories.map((item, index) => {
                            return <option key={index} value={item._id}>{item.name}</option>
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

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value); //set form data and then pass to db
        setValues({ ...values, [name]: event.target.value });
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true })
        createProduct(user._id, token, formData) //passing form data to backend
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        description: '',
                        photo: '',
                        stock: '',
                        price: '',
                        loading: false,
                        error: false,
                        isRedirect: true,
                        createdProduct: data.name
                    })
                }
            })
    }

    const errorMessage = () => {
        return <div className='alert alert-danger mt-2' style={{ display: !error && 'none' }}>
            {error}
        </div>
    }

    const successMessage = () => {
        return <div className='alert alert-success mt-2' style={{ display: !createdProduct && 'none' }}>
            {createdProduct} Created Successfully
    </div>
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
                <div className="col-md-8 offset-md-2">
                    {errorMessage()}
                    {successMessage()}
                    {createProductForm()}
                    {isRedirect && setTimeout(() => {
                        history.push('/admin/dashboard');
                    }, 2000)}
                </div>
            </div>
        </Base>
    );
}
