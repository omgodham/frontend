import React, { useEffect, useState } from 'react';
import{ Link} from 'react-router-dom';
import { isAuthinticated } from '../auth/helper';
import Base from '../core/Base';
import {getCategories,deleteCategory} from './helper/adminapicalls';
export default function ManageCategories() {
    
    const [categories,setCategories] = useState([]);
    const {user,token} = isAuthinticated();
    useEffect(()=>{
        getAllCategories();
    },[]);

    const deleteThisCategory = (categoryId) => {
        deleteCategory(user._id,token,categoryId)
        .then(data => {
            console.log(data);
            if(data.error){
                console.log(data.error);
            }else{
                getAllCategories();
            }
        })
    }

    const getAllCategories = () =>{
            getCategories().then(
                data => {
                    console.log(data);
                    if(data.error){
                        console.log(data.error);
                    }else{
                        // console.log(data);
                        setCategories(data);
                    }
                }
            ).catch()
    }
    
    return (
      <Base title='Welcome Again' description='Mange categories here' className='container'>
        <Link to='/admin/dashboard' className='text-white btn btn-info'>Admin Dashboard</Link>
        <h2 className='mb-4 text-white' >All categories:</h2>
        <div className='row'>
            <div className='col-12'>
                <h2 className="text-center text-white my-3">Total {categories.length} tshirt categories</h2>
              {categories.map((category,index) => {
                  return  <div key={index} className='row text-center'>
                    <div className='col-4'>
                    <h3 className="text-white text-left">
                        {category.name}
                    </h3>
                    </div>
                    <div className='col-4'>
                        <Link className='btn btn-success' to={`/admin/category/update/${category._id}`}>
                            Update
                        </Link>
                    </div>
                    <div className='col-4'>
                        <button className='btn btn-danger' onClick={()=> deleteThisCategory(category._id)}>
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
