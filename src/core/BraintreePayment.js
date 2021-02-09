import React, { useEffect, useState } from 'react'

import DropIn from "braintree-web-drop-in-react";

import {isAuthinticated} from '../auth/helper';
import {makePayment,getToken} from './helper/braintreePaymentHelper';
export default function BraintreePayment({products,setReload,reload}) {
    const [info ,setInfo] = useState({
        loading:false,
        error:false,
        success:false,
        clientToken:null,
        instance:{}
    });
const {user,token} = isAuthinticated();

    useEffect(()=>{
        getmeToken(user._id,token)
    },[]);

const getmeToken = (userId,token) =>{
    getToken(userId,token).then(data =>{
        console.log(data);
        if(data.error){
            setInfo({...info,error:data.error,success:true});
        }else{
            setInfo({...info,clientToken:data})
        }
    }).catch(err => console.log(err));
}

const getAmount = () => {
    let amount = 0 ;
    products.map(product => {
        amount = amount + product.price;
    })
    return amount;
}
    const processPayment = () => {
        let nonce;
        info.instance.requestPaymentMethod().then(data => {
            nonce = data.nonce;
            const paymentData = {
                payment_method_nonce:nonce,
                amount:getAmount()
            };
            makePayment(user._id,token,paymentData)
            .then(response => {
                setInfo({
                    ...info,success:response.success,loading:false
                })
                console.log('Payment Successfull')
            }).catch(error => {
                setInfo({loading:false,success:false});
                console.log('payment failed')
            })   
        })
    }

    return (
        <div>
        <h1 className='text-white'>Your Amount is ${getAmount()}.00</h1>
        <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={instance => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success" onClick={processPayment}>
              Buy
            </button>
          </div>
        ) : (
          <h3>Please login or add something to cart</h3>
        )}
      </div>
       
        </div>
    )
}
