import React,{useState,useEffect} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import {API} from '../Backend';
export default function Stripe({products,reload,setReload}) {
  useEffect(()=>{
    getTotalAmount();
  },[])
    const getTotalAmount = () =>{  
        let amount = 0;  
        products.map(product => {
            amount = amount + product.price;
            })
            return amount;
        }
    const makePayment = (token) =>{
        console.log(token);
        const body = { token , products , amount:getTotalAmount()};
        return fetch(`${API}/payment`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
        }).then(response =>{
            console.log(response);
        }).catch(err => console.log(err));
    }    
    return (

        <div>
            <h1 className='text-white text-center'>Checkout Here</h1>
            <StripeCheckout 
            stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
            token={makePayment}
            amount={getTotalAmount() * 100}
            shippingAddress
            billingAddress
            >
                <button className='btn btn-success'>Pay Money {getTotalAmount()}</button>
            </StripeCheckout>
        </div>
    )
}
