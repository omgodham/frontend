    import React,{useState,useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import { addProductToCart ,removeProductFromCart} from './helper/cartHelper'
import ImageHelper from './helper/ImageHelper'

    export default function Card({product, isAddToCart, isRemoveFromCart , reload ,setReload}) {

        const [redirect,setRedirect] = useState(false);

        useEffect(() => {
            setRedirect(false);
        },[]); //come again to home page and setting redirect to false 
        //so that on addproduct we can set it true again
    
        const doRedirect = () =>{
            if(redirect){
                return <Redirect to='/cart'/>
            }
        }

    //adding product to cart     
        const addToCart = () => {
             addProductToCart(product);
             setRedirect(true);
        }

     //removing product from cart   
        const removeFromCart = (productId) => {
            removeProductFromCart(productId); 
            setReload(!reload);
        }


        //depending upon the condition show addtocart btn
        const showAddToCart = () => {
            return isAddToCart &&
                <button className='btn btn-block btn-outline-success mt-2 mb-2' onClick={addToCart}>Add To Cart</button>  
        }

        ////depending upon the condition show removefromcart btn
        const showRemoveFromCart = () => {
            return isRemoveFromCart &&
                <button className='btn btn-block btn-outline-danger mt-2 mb-2' onClick={() => removeFromCart(product._id)}>Remove From Cart</button>   
        }

        return (
            <div className='card bg-dark border border-info text-white '>
            {doRedirect()}
            <div className="card-header lead text-center">{product.name}</div>
                <div className='card-body text-center'>
               <ImageHelper product={product}/>
                <p className='lead bg-success font-weight-normal text-wrap'>{product.description}</p>
                <span className='btn btn-success rounded btn-sm px-4'>$ {product.price}</span>
                   {showAddToCart()}
                   {showRemoveFromCart()}               
                </div>
            </div>
        )
    }
