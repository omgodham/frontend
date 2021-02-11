import React, { useEffect, useState } from 'react'
import DropIn from "braintree-web-drop-in-react";

import {isAuthinticated} from '../auth/helper';
import {makePayment,getToken} from './helper/braintreePaymentHelper';
import { emptyCart } from './helper/cartHelper';
import { createOrder } from './helper/orderHelper';
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
        // console.log(data); this is long generated client token
        if(data.error){
            setInfo({...info,error:data.error,success:true});
        }else{
            setInfo({...info,clientToken:data}) //for further authorization in dropin we need clientToken
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
        info.instance.requestPaymentMethod().then(data => { //braintree method which gives us nonce
            console.log(data);
            nonce = data.nonce;//this nonce is must for transaction so that it further transfer to backend to 
            //varify nonce see diagram at link https://developers.braintreepayments.com/start/overview
            const paymentData = {
                payment_method_nonce:nonce,
                amount:getAmount()
            };
            makePayment(user._id,token,paymentData)
            .then(response => {
                setInfo({
                    ...info,success:response.success,loading:false
                })
                const orderData = {
                    products:products,
                    transaction_id:response.transaction.id,
                }
                console.log(orderData);
                createOrder(user._id,token,orderData);
                emptyCart();
                setReload(!reload);

                console.log('Payment Successfull');

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
              onInstance={instance => {
                  info.instance = instance;
                    console.log(info.instance);
              }} //here we set instance done by braintree itself
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
