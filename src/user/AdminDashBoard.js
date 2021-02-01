import React from 'react'
import { Link } from 'react-router-dom';
import { isAuthinticated } from '../auth/helper';
import Base from '../core/Base';
export default function AdminDashBoard() {

    const {user:{name,email,role}} = isAuthinticated();

    const leftAdminPart = () =>{
        return (
            <div className='card bg-dark'>
                <h4 className="card-header text-white">Admin Activities</h4>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <Link to='/admin/create/category' className='nav-link text-success'>Create Category</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link to='/admin/create/product' className='nav-link text-success'>Create Product</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link to='/admin/products' className='nav-link text-success'>Manage Product</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link to='/admin/create/category' className='nav-link text-success'>Manage Order</Link>
                    </li>
                </ul>
            </div>   
        )
    }
    const righAdminPart = () => {
        return (
            <div className='card'>
                <h1 className=' bg-dark text-white card-header'>Admin Information</h1>
                <ul className='list-group'>
                    <li className='list-group-item'>
                    <span className='badge bg-success mr-2' >Name:</span>{name}
                    </li>
                    <li className='list-group-item'>
                    <span className='badge bg-success mr-2' >Email:</span>{email}
                    </li>
                    <li className='list-group-item'>
                    <span className='badge bg-danger mr-2' >Admin Area</span>
                    </li>
                </ul>
            </div>
            )
    }
    return (
        <Base title='Admin Dashboard' className='bg-success p-5 container'>
           <div className="row">
               <div className='col-3' >{leftAdminPart()}</div>
               <div className='col-9'>{righAdminPart()}</div>
           </div>
        </Base>
    )
}
