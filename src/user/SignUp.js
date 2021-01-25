import React from 'react'
import Base from '../core/Base';

export default function SignUp() {

 const signUpForm = () => {
     return <div className='row'>
            <div className="col-md-6 offset-sm-3">
                <form>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control"/>
                </div>
                <button className='btn bg-success btn-block text-white'>Submit</button>
                </form>
            </div>
     </div>     
 }

    return (
    <Base title='SignUp Page' description='This is sign up page'>
        {signUpForm()}
        </Base>
    )
}
