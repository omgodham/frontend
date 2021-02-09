import { API } from "../../Backend";
//to get token
export const getToken = (userId,token) => {
return fetch(`${API}/payment/getToken/${userId}`,{
    method:'GET',
    headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
        Authorization:`Bearer ${token}`
    }
}).then(response => {
    return response.json();
}).catch(err => console.log(err));
}

//to make payment work
export const makePayment = (userId,token,paymentInfo) => {
    return fetch(`${API}/payment/braintree/${userId}`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(paymentInfo)
    }).then(response => {return response.json()})
      .catch(err => console.log(err));
    }