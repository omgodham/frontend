    import React from 'react'

    export default function Card({product, isAddToCart=true, isRemoveFromCart=false}) {
        return (
            <div className='card bg-dark border border-info text-white '>
            <div className="card-header lead text-center">This is the title</div>
                <div className='card-body text-center'>
                <div className='rounded border border-success '>
                    <img src='https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                        className='rounded mb-3'
                        style={{maxHeight:'100%',maxWidth:'100%'}}
                    />
                </div>
                <p className='lead bg-success font-weight-normal text-wrap'>This is the description</p>
                <span className='btn btn-success rounded btn-sm px-4'>$ 5</span>
                    <button className='btn btn-block btn-outline-success mt-2 mb-2' >Add To Cart</button>
                    <button className='btn btn-block btn-outline-danger mt-2 mb-2'>Remove From Cart</button>
                </div>
            </div>
        )
    }
