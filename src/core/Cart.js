import React, { useState ,useEffect} from 'react'
import { Redirect } from 'react-router-dom';
import BraintreePayment from './BraintreePayment';
import '../styles.css';
import Base from './Base';
import Card from "./Card";
import { getCart } from './helper/cartHelper';
export default function Cart() {
  
    const [cartProducts ,setCartProducts] = useState([]);
    const [reload,setReload] = useState(false);//using it to just reload page after removal of product from cart
    //pass both values to card and change them in card component 
  

    useEffect(()=>{
        getCartProducts();
    },[reload]); //so here after every change of reload(and this will change on remove
    // i.e. true and false alternatively) the page will reload because we are getting products again in here

   //get all products saved in cart
const getCartProducts = () =>{
 setCartProducts(getCart());
 }
 
  return (
        <Base title="Home Page">
      <div className="row">
        <div className='col-6'>
            {cartProducts.map((product,index)=>{
                return <Card key ={index} product={product} isAddToCart={false} isRemoveFromCart={true} reload={reload} setReload={setReload}/>
            })}
        </div>
        <div  className='col-6'>
        <BraintreePayment products={cartProducts} setReload={setReload} reload={reload}/>
        </div>
      </div>
    </Base>
    )
}
