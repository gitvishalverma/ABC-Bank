import { ROOT_URL } from './types'

async function fetchAPI(id){
 let a=null;
  try{  
        console.log("-1--");  
        const response=await window.fetch(`${ROOT_URL}2/accounts/${id}`,{
            method: 'GET'
        });
        const account= await response.json();

        a=account;
  }
  catch(error){
    console.log(error);
  }
  return a;
}

async function FetchUser(id){
  let a=null;
   try{  
         console.log("-1--");  
         const response=await window.fetch(`${ROOT_URL}/login/${id}`,{
             method: 'GET'
         });
         const user= await response.json();
         a=user;
   }
   catch(error){
     console.log(error);
   }
   return a;
 }

async function FetchLogin(username,pass) {
  let a=null;
      console.log("1");
      const response = await window.fetch(`${ROOT_URL}/login`);
      console.log("2",response);
      const data = await response.json();

      data.map(user=>{
    if(user.username===username && user.password===pass)
    {
        a=user.id;
    }

})
    return a;
  }

export default fetchAPI;
export {FetchLogin};
export {FetchUser};