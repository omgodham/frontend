import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from './core/Home';
import SignUp from './user/SignUp';
import SignIn from './user/SignIn';
import SignOut from './user/SignOut';
import UserDashBoard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminDashBoard';
import PrivateRoute from './auth/helper/PrivateRoute';
import AdminRoute from './auth/helper/AdminRoute';
export default function Routes() {
    return (
        <Router>
        <Switch>
        <Route exact path="/" component={Home} /> 
        <Route exact path="/signup" component={SignUp} /> 
        <Route exact path="/signin" component={SignIn} /> 
        <Route exact path="/signout" component={SignOut} />
        <PrivateRoute path='/user/dashboard' component={UserDashBoard}/> 
        <AdminRoute path='/admin/dashboard' component={AdminDashBoard}/> 
        </Switch>
       </Router>
    )
}
