import axios from 'axios';

function authCheck() {
    
    const storage=window.localStorage.getItem('user'); 
    const token = storage !== null ? JSON.parse(storage).token : null;
     if(token!==null)
     {
      return axios.get('http://ahmetcelikblog.atwebpages.com/api/jwtcheck', {
       
        headers:{
      
          "Authorization": "Bearer " +token
        }
      })
    }
     return Promise.reject("error");
      /*
       fetch('http://localhost:9000/api/jwtcheck',
    {method:'GET',
    headers: {
      
      "Authorization": "Bearer " +token
    }
    
    
    })
    .catch(err=>{
           console.log(err)

         
           data_="fail";
        
          })
       .then(res => {
         console.log(res)
       
         
          data_="ok";
         

        
          
        })
     */
      
     

 
      }

export default authCheck;