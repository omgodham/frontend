    import React from 'react'
import ImageHelper from './helper/ImageHelper'

    export default function Card({product, isAddToCart, isRemoveFromCart}) {

        const showAddToCart = () => {
            return isAddToCart &&
                <button className='btn btn-block btn-outline-success mt-2 mb-2' >Add To Cart</button>  
        }
        const showRemoveFromCart = () => {
            return isRemoveFromCart &&
                <button className='btn btn-block btn-outline-danger mt-2 mb-2'>Remove From Cart</button>   
        }

        return (
            <div className='card bg-dark border border-info text-white '>
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
