import React,{useState} from 'react'
import { signup } from '../auth/helper';
import Base from '../core/Base';

export default function SignUp() {

const [values,setValues] = useState({
    name:'',
    email:'',
    password:'',
    error:false,
    success:false
});

const {name,email,password,error,success} = values;


const handleChange = (name) = (event) => {
setValues({error:false,success:false,[name]:event.target.value});
}


const onSubmit = event => {
    event.preventDefault();
    signup({name,email,password})
    .then(data => {
      if(data.error){
        setValues({
            ...values,
            error:data.error,
            success:false
        })    
      }
      else{
        setValues({
            name:'',
            email:'',
            password:'',
             error:false,
             success:true
         })
      }
    })
    .catch(
      console.log("error in signup")        
    )
}

 const signUpForm = () => {
     return <div className='row'>
            <div className="col-md-6 offset-sm-3">
                <form>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" value={name} onChange={handleChange('name')}/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" value={email} onChange={handleChange('email')}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password} onChange={handleChange('password')}/>
                </div>
                <button className='btn bg-success btn-block text-white' onClick={onSubmit} >Submit</button>
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
