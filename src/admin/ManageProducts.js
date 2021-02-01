import React, { useEffect, useState } from 'react';
import{ Link} from 'react-router-dom';
import { isAuthinticated } from '../auth/helper';
import Base from '../core/Base';
import {deleteProduct, getProducts} from './helper/adminapicalls';
export default function ManageProducts() {
    
    const [products,setProducts] = useState([]);
    const {user,token} = isAuthinticated();
    useEffect(()=>{
        getAllProducts();
    },[]);

    const deleteThisProduct = (productId) => {
        deleteProduct(user._id,token,productId)
        .then(data => {
            console.log(data);
            if(data.error){
                console.log(data.error);
            }else{
                getAllProducts();
            }
        })
    }
    const getAllProducts = () =>{
            getProducts().then(
                data => {
                    if(data.error){
                        console.log(data.error);
                    }else{
                        console.log(data);
                        setProducts(data);
                    }
                }
            ).catch()
    }
    
    return (
      <Base title='Welcome Again' description='Mange products here' className='container'>
        <Link to='/admin/dashboard' className='text-white btn btn-info'>Admin Dashboard</Link>
        <h2 className='mb-4 text-white' >All products:</h2>
        <div className='row'>
            <div className='col-12'>
                <h2 className="text-center text-white my-3">Total {products.length} t shirts</h2>
              {products.map((product,index) => {
                  return  <div key={index} className='row text-center'>
                    <div className='col-4'>
                    <h3 className="text-white text-left">
                        {product.name}
                    </h3>
                    </div>
                    <div className='col-4'>
                        <Link className='btn btn-success' to='/admin/product/update/productId'>
                            Update
                        </Link>
                    </div>
                    <div className='col-4'>
                        <button className='btn btn-danger' onClick={()=> {deleteThisProduct(product._id)}}>
                            Delete
                        </button>
                    </div>
                </div>
              })}
               
            </div>
        </div>
      </Base>
    )
}
