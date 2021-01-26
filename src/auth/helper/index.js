import {API} from '../../Backend';

//logic for signup
export const signup = (user) => {
  return fetch(`${API}/signup` , {
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

//logic for signin
export const signin = (user) => {
    return fetch(`${API}/signin` , {
          method:'POST',
          headers:{
              Accept:'application/json',
              'Content-Type':'application/json'
          },
          body:JSON.stringify(user)
      })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err))
  }


 //create token
export const authinticate = (data , next) =>{
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt" , JSON.stringify(data));
        next();
    }
}

 
//logic for signout(clearing token from browser)
export const signout = (next) => {
    if(localStorage.getItem('jwt')){
    localStorage.removeItem('jwt');
    next();
        
    return fetch(`${API}/signout`,{
        method:'GET',
    })
    .then(response => console.log('signout success'))
    .catch(err => console.log(err));
}
};

//check for token(i.e. user is signed in or not)
export const isAuthinticated = () => {
    if(typeof window ==  "undefined"){
        return false;
    }
         if(localStorage.getItem('jwt')){
             return JSON.parse(localStorage.getItem('jwt'));
         }else {
             return false;
         }
}
