import React, { useState ,useEffect} from 'react'

import '../styles.css';
import Base from './Base';
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
export default function Home() {
  
  const [products ,setProducts] = useState([]);
  const [error,setError] =useState(false);

useEffect(() => {
getAllProducts();
}, []);

  const getAllProducts = () =>{
    getProducts().then(data => {
      console.log(data);
      if(data.error){
          setError(data.error)
      }else{
        setProducts(data);
      }
    })
  }
  
  return (
        <Base title="Home Page">
      <div className="row">
        {products.map( (product , index) => {
            return <div key={index} className="col-4">
         <Card product={product} isAddToCart={true} isRemoveFromCart={false}/>
        </div>
        })}
      </div>
    </Base>
    )
}
