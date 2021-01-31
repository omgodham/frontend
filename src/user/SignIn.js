import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { signin, authinticate, isAuthinticated } from "../auth/helper/index";
import UserDashBoard from './UserDashBoard';
import AdminDashBoard from './AdminDashBoard';
export default function SignIn() {
    
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: false,
    loading: false,
    isRedirect: false,
  });

  const { email, password, error, loading, isRedirect } = values;
  const {user} = isAuthinticated(); //here user will get which is already saved in localstorage of react
  //for the first time before signin it will be undefined after that any time you check in it will that user which is store in localstorage of react
  //and not going get remove unless user signout
  console.log(user);
  const handleChange = (name) => (event) => {
    setValues({ ...values, loading: true, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    signin({ email, password })
      .then((data) => {
          console.log(data); //this data will have user token and user itself
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            loading: false,
          });
        } else {
          authinticate(data, () => {   //this method sets user in localstorage of react
            setValues({
              email: "",
              password: "",
              isRedirect: true,
            });
          });
        }
      })
      .catch((err) => {
        console.log("error in signin");
      });
  };

  const errorMessage = () => {
    return (
        <div className='row'>
    <div className="col-md-6 offset-sm-3">
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
      </div>
      </div>
    );
  };

  const performRedirect = () =>{
    if(isRedirect)
    {
        console.log(user);
   if(user && user.role === 1 )
       return <Redirect to='/admin/dashboard'/>
   else 
       return <Redirect to='/user/dashboard'/>
   }
   if(isAuthinticated()){ 
     return <Redirect to='/'/>
   }
  }

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3">
          <form>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} className="form-control" onChange={handleChange('email')}/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" value={password} className="form-control" onChange={handleChange('password')}/>
            </div>
            <button className="btn bg-success btn-block text-white" onClick={onSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="SignIn Page" description="This is sign in page">
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
    </Base>
  );
}
