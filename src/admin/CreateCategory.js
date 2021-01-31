import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import { isAuthinticated } from '../auth/helper';
import Base from '../core/Base';
import {createCategory} from './index';
export default function CreateCategory() {

    const [name,setName] = useState("");
    const [error,setError] = useState(false);
    const [success,setSuccess] = useState(false);
    const {user,token} = isAuthinticated();

    const handleChange = (event) =>{
            setName(event.target.value);
    }
    const onSubmit = (event) => {
        event.preventDefault();
        createCategory(user._id,token,{name})
        .then(data => {
            console.log(data);
            if(data.error){
                setError(error);
                setSuccess(false);
            }else{
                setName('');
                setSuccess(true);
            }
        })
    }
const errorMessage = () => {
    return <h4 className='text-warning' style={{display : !error && "none" }}>{error}</h4>
}
const successMessage = () => {
    return <h4 className='text-success' style={{display : !success && "none" }}>Successfully created category</h4>
}
    return (
        <Base title='Create Category Here' description='you can create your category here' className='container bg-info'>
       {errorMessage()}
       {successMessage()}
        <form className='p-3'>
            <div className='form-group col-9'>
               <label>Enter Name</label>
                <input className='form-control' value={name} onChange={handleChange}/>
            </div>    
            <button className='btn btn-sm bg-success text-white' onClick={onSubmit}>Add Category</button><br />
            <Link to='/admin/dashboard' className='btn btn-sm bg-warning text-white mt-3'>Admin Dashboard</Link>
        </form>
        </Base>
    )
}
