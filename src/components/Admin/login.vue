<template>
<div class="login">
        <b-card title="Giriş Yap" >

      <b-form  class="login-form"  @submit="login($event)"> 
           
             
     
   
     <b-form-group
      id="fieldset-1"
      label="email"
      label-for="input-1"
    >
      <b-form-input  :class="{'border-danger':input1}" id="input-1" v-model="email"  trim></b-form-input>
    </b-form-group>

      <b-form-group
      id="fieldset-2"
      label="Şifre"
      label-for="input-2"
    >
      <b-form-input type="password" :class="{'border-danger':input2}" id="input-2" v-model="sifre"  trim></b-form-input>
    </b-form-group>

 <b-form-group>
      <b-button  type="submit" variant="outline-success"> Giriş
        </b-button>
    
    </b-form-group>
    
     </b-form>
     <ul v-if="errors.length">
            <li  v-for="error in errors" v-bind:key="error"><strong class="text-danger">{{ error }}</strong></li>

    </ul>
        </b-card>
</div>


</template>

<script lang="ts">
import Vue from 'vue';
import router from '../../router/index';
import axios from 'axios';
import api from '../../services/api';

//import api from '../../services/api';
//import rooter from '../../router/index';

//import { response } from '../../response';
/*
window.onerror = function(message, source, lineno, colno, error) {
  // TODO: write any custom logic or logs the error
this.$router.push('/error');
};
*/
export default Vue.extend({
  name: 'login',
  /*
 computed()
 {
   computed: sayfa render olduktan sonra çalışır.
   mounted ise
   
 mounted() {
   window.addEventListener(“click”, function(e){
    console.log(e.target);
  });
 }
    if(this.$route.params.error)
      {
        console.log('tmm')
      alert(this.$route.params.error);
      }
 },
 */
  created()
  {
    //alert(this.$route.params.ok)
  
  },
  data(){
   return{apiresult:'', email:'',sifre:'',errors:[''], header:new Headers({'Content-Type': 'multipart/form-data'}),
   input1:false,input2:false,apiurl:api.apiurl+'login' }
  },
  methods:{
    /*
     status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    console.log(response)
    console.log(new Error(response.statusText))
    return Promise.reject(new Error(response.statusText))
  }
},
*/
    login(e: any)
    {
        e.preventDefault();

        this.errors=[];
        if(!this.email)
        {
          this.input1=true;
          this.errors.push('Email boş bırakılamaz');
        }
        
        if(!this.sifre)
        {
          this.input2=true;
          this.errors.push('Şifre boş bırakılamaz');
        }
        if(this.email && this.sifre)
        {
          //this.formdata=new FormData();
          //this.formdata.set("email",this.email);
          //this.formdata.set("password",this.sifre);
        //başarısız ise çalışır ...
    //this.apiresult=api.requestLogin(this.formdata,this.apiurl,this.header);
            axios.post(api.apiurl+'login', {
            //body: {email:this.email,'password':this.sifre},
            email:this.email,
            password:this.sifre
           
          })
          .then(response => {
              console.log(response)
            if (response.data.token) {
              localStorage.setItem('user', JSON.stringify(response.data));
              //router.('/admin/articleadd');
              if(this.$route.params.path)
              {
              this.$root.$router.push(decodeURIComponent(this.$route.params.path));

              }
              else
              this.$root.$router.push('/admin/articleadd');
              
            }
       if(response.data.error=='invalid_credentials')
       {
              alert('Giriş hatalı')


       }

          })
          .catch(e => {
               alert('Sunucu hatası')


        })
  
         }
    }
    }
  
});
</script>

<style scoped>
.login
{
    margin-left: auto;
    margin-right: auto;
    width:400px;
    vertical-align: middle;
}
ul
{
  list-style: none;
}
body
{
  height:100%;
}
</style>