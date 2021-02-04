import {API} from '../../Backend';

export const addProductToCart = (product) => {
let cart = [];
    if(typeof window !== undefined){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
        }
    cart.push(product);
    }
    localStorage.setItem('cart',JSON.stringify(cart));        
}      


export const removeProductFromCart = (productId) => {
    let cart = [];
    if(typeof window !== undefined){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
        }
    }
    console.log(cart);
    cart = cart.filter( product => {
        return productId !== product._id
    });
    console.log(cart);
     localStorage.setItem('cart',JSON.stringify(cart));    
}

export const getCart = () => {
    if(typeof window !== undefined){
                 return(JSON.parse(localStorage.getItem('cart')));
    }
    
}