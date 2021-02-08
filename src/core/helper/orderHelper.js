import {API} from '../../Backend';

export const createOrder = (orderData,userId,token) => {
    return fetch(`${API}/ordercreate/${userId}`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(orderData.order)
    })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err));
}