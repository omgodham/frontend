import React from 'react';
import {API} from '../../Backend';
export default function ImageHelper({product}) {
  const ImageUrl=product ? `${API}/product/photo/${product._id}` : 'https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
    return (
        <div className='rounded border border-success '>
        <img src={ImageUrl}
            className='rounded mb-3'
            style={{maxHeight:'100%',maxWidth:'100%'}}
        />
    </div>       
    )
}
