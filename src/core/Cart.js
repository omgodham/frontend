import React, { useState ,useEffect} from 'react'

import '../styles.css';
import Base from './Base';
import Card from "./Card";
import { getCart } from './helper/cartHelper';
export default function Cart() {
  
    const [cartProducts ,setCartProducts] = useState([]);


    useEffect(()=>{
        getCartProducts();
    },[])

const getCartProducts = () =>{
 setCartProducts(getCart());
 }
 

  return (
        <Base title="Home Page">
      <div className="row">
        <div className='col-6'>
            {cartProducts.map((product,index)=>{
                return <Card key ={index} product={product} isAddToCart={false} isRemoveFromCart={true}/>
            })}
        </div>
        <div  className='col-6'>These are cart options</div>
      </div>
    </Base>
    )
}
