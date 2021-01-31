import React from 'react';
import { Redirect ,Route } from 'react-router-dom';
import { isAuthinticated } from '.';

export default function PrivateRoute({component: Component , ...rest}) {
    return (
        <Route
            {...rest}
              render = {props => 
               isAuthinticated() ? (
                   <Component {...props}/>
               ):(<Redirect
                 to={{
                     pathname:'/signin',
                     state:{from: props.location}
                 }}
                 />)}
        />
    )
}
