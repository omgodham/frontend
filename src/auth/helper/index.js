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


 //save token and user in local storage of react application to see :- f12 -> application -> localStorage
export const authinticate = (data , next) =>{ //next means callback where the function is getting call
    //first this function will execute and then nex(mans function body from where it is called)
    if(typeof window !== "undefined"){ // (window) is used to check script is running in background or not thats it 
        //no any deep logic (this expression in if states script is runnnig) 
        localStorage.setItem("jwt" , JSON.stringify(data)); //this will set jwt(object) containing token and user in localstorage
        // console.log(localStorage.getItem('jwt'));
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
    .then(response =>{ 
        console.log(JSON.parse(response));
        return response;
     })
    .catch(err =>  { return err });
    } else{
        return {
            message:'not able to remove jwt'
        }
    }
};

//check for token(i.e. user is signed in or not)
export const isAuthinticated = () => {
    if(typeof window == "undefined"){
        return false;
    }
         if(localStorage.getItem('jwt')){
             return JSON.parse(localStorage.getItem('jwt'));
         }else {
             return false;
         }
}
