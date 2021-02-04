import React,{Fragment} from 'react';
import {Link,Redirect,withRouter} from 'react-router-dom';
import {isAuthinticated, signout} from '../auth/helper/index';

const currentTab = ( history, path ) => {
    // console.log(history);
    // console.log(history.location);
    // console.log(history.location.pathname);
    if (history.location.pathname === path) {
      return { color: "#2ecc72" };
    } else {
      return { color: "#FFFFFF" };
    }
  }

const Menu = ({history}) => {
    return (
        <div>
        <ul className='nav bg-dark nav-tabs'>
            <li className='nav-item'>
                <Link style={currentTab(history, "/")}  className='nav-link'  to="/">Home</Link>
            </li>
            <li className='nav-item'>
                <Link style={currentTab(history, "/cart")}  className='nav-link'  to="/cart">Cart</Link>
            </li>
            {isAuthinticated() && isAuthinticated().user.role === 0 && (
                <li className='nav-item'>
                <Link style={currentTab(history,"/dashboard")} className='nav-link'  to='/user/dashboard'>U. Dashboard</Link>
            </li>
            )}

            {isAuthinticated() && isAuthinticated().user.role === 1 && (
                <li className='nav-item'>
                <Link style={currentTab(history,"/dashboard")} className='nav-link'  to='/admin/dashboard'>A. Dashboard</Link>
            </li>
            )}
            

            {!isAuthinticated() && <Fragment> {/* if the user is not signed in then only show it*/ }
                {/*Fragment is just a component to hold multiple thigs together without affecting their forms (whether if we wrote div over here whole things will scrwed up)*/}
            <li className='nav-item'>
                <Link style={currentTab(history,"/signup")} className='nav-link' to='/signup'>Signup</Link>
            </li>
            <li className='nav-item'>
                <Link style={currentTab(history,"/signin")} className='nav-link' to='/signin'>Signin</Link>
            </li>
            </Fragment>}
            {isAuthinticated() && (  //if the user signed in then only show and after clicking redirect to home screen
            <li className='nav-item'>
                <span className='nav-link text-warning'
                 onClick={()=>{
                     signout(()=> {
                        history.push('/');
                    })
                }}>SignOut</span>
                 </li>)}
           
        </ul>
        </div>
    )
}

export default withRouter(Menu);