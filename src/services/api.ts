import router from '../router/index'

import axios from 'axios';

function requestLogin(formdata : any, url : string , headers : Headers)
{
    //router.push('/error')
    
    //const result={'issuccess':false,'message':''};
    
        return axios.post(url, {
            data: formdata,
            
            headers:headers
          })
          
         

   

}
    const apiurl='http://ahmetcelikblog.atwebpages.com/api/'


function request(formdata : any,url : string,headers : Headers,callback : Function,response : any)
{

    try {
        
     fetch(url,
     {method:'POST',
     body:formdata,
     headers: headers
     
     })
   
    .then(response => response.json())
        .then(res => {
            response=res;
          console.log(res)
          callback(response)

     })
                     


    } catch (error) {
        router.push('/error')
    }
}


export default {request,requestLogin,apiurl}
