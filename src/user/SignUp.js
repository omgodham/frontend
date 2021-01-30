import React,{useState} from 'react'
import { signup } from '../auth/helper';
import Base from '../core/Base';

export default function SignUp() {

let [values,setValues] = useState({
    name:'',
    email:'',
    password:'',
    error:false,
    success:false
});

let {name,email,password,error,success} = values;


const handleChange = name => event => {
setValues({...values,[name]:event.target.value});
}


const onSubmit = event => {
    event.preventDefault();
    // console.log(values);
    signup({name,email,password})
    .then(data => {
        
      if(data.error){ //if the we get successful response means it will have no error property 
        //i.e it(data.error) will be undefined which is false in javascript
        setValues({
            ...values,
            error:data.error, //here error message is there hence it (error) will be true
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
        //  console.log(values);
      }
     
    })
    .catch( err =>
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

 const successMessage = () => {
     return <div className='row'>
     <div className="col-md-6 offset-sm-3">
        <div className='alert alert-success' style={{display: success ?  "" : "none"}}>
        {/*if error got string(i.e. any data except false it takes it as true)*/}
        New account created successfully 
        </div>
      </div>
      </div>
 }

 const errorMessage = () => {
    return <div className='row'>
    <div className="col-md-6 offset-sm-3">
     {/* {console.log(error)} */}
       <div className='alert alert-danger' style={{display: error ?  "" : "none"}}>
       {error} 
       </div>
     </div>
     </div>
}

    return (
    <Base title='SignUp Page' description='This is sign up page'>
    {successMessage()}
        {errorMessage()}
        {signUpForm()}
       
        </Base>
    )
}
