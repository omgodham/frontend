

//adding product to cart here
export const addProductToCart = (product) => {
let cart = [];
    if(typeof window !== undefined){ //most of the cases 99.99% this condition is true at any situation
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));  
            //due to already saved as stringify so make a proper array of objects 
        }
    cart.push(product); //push new product to cart array
    }
    localStorage.setItem('cart',JSON.stringify(cart)); //we cant save in the format of the array containing objects
    //so stringifying it 
      
}      

//removing product fron cart
export const removeProductFromCart = (productId) => {
    let cart = [];
    if(typeof window !== undefined){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
        }
    }
    // console.log(cart);
    cart = cart.filter( product => {
        return productId !== product._id //return all products excepts for which condition fails
    });
    // console.log(cart);
     localStorage.setItem('cart',JSON.stringify(cart));   //after removing set cart agin 
}


//get all cart products
export const getCart = () => {
    if(typeof window !== undefined){
                 return(JSON.parse(localStorage.getItem('cart')));
    }
    
}

//remove all products at once
export const emptyCart = () => {
    if(typeof window !== undefined)
       localStorage.removeItem('cart');
    const cart =[];
    localStorage.setItem('cart',JSON.stringify(cart));
}