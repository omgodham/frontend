import {API} from '../../Backend';


//category api calls

//create category
export const createCategory = (userId,token,category) => {
    return fetch(`${API}/category/create/${userId}`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`   
        },
        body:JSON.stringify(category)
    })
    .then(response =>{ 
        console.log(response);
        return response.json()
    })
    .catch(err => console.log(err))
}

//get all categorires
export const getCategories = () => {
    return fetch(`${API}/categories` , {
        method:'GET'
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err))
}


//product api calls 

//create product
export const createProduct = (userId,token,product) => {
    return fetch(`${API}/product/create/${userId}`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Authorization':`Bearer ${token}`   
        },
        body:product
    })
    .then(response =>{ 
    
        return response.json()
    })
    .catch(err => console.log(err))
}

//get all products
export const getProducts = () => {
    return fetch(`${API}/products` , {
        method:'GET'
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err))
}

//get a product
export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`,{
        method:'GET'
    })
    .then(response =>{ 
        return response.json()
    })
    .catch(err => console.log(err))
}

//delete product
export const deleteProduct = (userId,token,productId) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:'DELETE',
        headers:{
            Accept:'application/json',
            'Authorization':`Bearer ${token}`   
        }
    })
    .then(response =>{ 
        return response.json();
    })
    .catch(err => console.log(err))
} 

//update product
export const updateProduct = (userId,token,productId,product) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:'PUT',
        headers:{
            Accept:'application/json',
            'Authorization':`Bearer ${token}`   
        },
        body:product
    })
    .then(response =>{ 
        console.log(response);
        return response.json()
    })
    .catch(err => console.log(err))
}