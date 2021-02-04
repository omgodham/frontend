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

export const getCart = () => {
    let cart = [];
    if(typeof window !== undefined){
                  cart = JSON.parse(localStorage.getItem('cart'));
    }
    return cart;
}