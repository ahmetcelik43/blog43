
<template>
  <div class="article-add">
    <b-navbar class="navbar" toggleable="lg" type="dark" variant="primary">
       <b-navbar-nav>
        <b-nav-item> <a v-b-toggle.sidebar-variant><vue-fontawesome   icon="align-left" size="2" color="lightgray"> </vue-fontawesome></a>
        </b-nav-item>
      </b-navbar-nav>
    <b-navbar-brand href="/">Ahmet Çelik</b-navbar-brand>
     <b-navbar-nav>
        <b-nav-item> </b-nav-item>
      </b-navbar-nav>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
     

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        

      <b-nav-item-dropdown :text="username"  variant="outline-danger" right>
          <b-dropdown-item href="#">{{useremail}}</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>

          
          <b-dropdown-item class="text-danger" @click="logout()">Çıkış Yap</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
<b-modal id="modal-1" title="Kategori Ekle">
    <p class="my-4">
      <b-form  @submit="categoryAdd($event)"> 
<ul v-if="errorcategory">
            <li  v-bind:key="errorcategory"><strong class="text-danger">{{ errorcategory }}</strong></li>

    </ul>
     <b-form-group
      label="Kategori adi: "
      label-for="categoryInput"
    >
      <b-form-input  :class="{'border-danger':categoryInputValidate}" id="categoryInput" v-model="categoryInput"  trim></b-form-input>
    </b-form-group>
<b-form-group
     
    >
    <b-button  type="submit" variant="info"> Kaydet  </b-button>
    </b-form-group>

       </b-form>


    </p>
  </b-modal>
 <b-sidebar id="sidebar-variant" title="Ahmet Çelik" bg-variant="light" text-variant="dark" shadow>
      <div class="px-3 py-2">
        <p>
<a>Admin anasayfa</a>
        </p>
         <p>
       <a>Makale Ekle</a>
        </p>
         <p>
       <a>Makale İşlemleri</a>
        </p>
      </div>
    </b-sidebar>
  <div class="sidebar-row" >


<div class="main-content">
  <br>
 

    <b-card title="Makale Ekle" >
           <b-form  class="article-form"  @submit="articleAdd($event)"> 
             <div class="buttons">
            

<b-button  type="submit" variant="outline-success"> Kaydet 
 <b-spinner variant="primary" small :class="spinnerClassName" ></b-spinner>
     </b-button>
<a class="openModal" @click="openModal()"> Kategori Ekle

        </a>
             </div>
             <br>
      <template v-slot:header>
        <h6 class="mb-0">Header Slot</h6>
      </template>
      <ul v-if="errors.length">
            <li  v-for="error in errors" v-bind:key="error"><strong class="text-danger">{{ error }}</strong></li>

    </ul>
  <b-form-group
      id="fieldset-1"
      label="Kategori:"
    >
    <b-form-select class="select" v-model="selected" :options="options" :select-size="10"></b-form-select>
    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>

    </b-form-group>

     <b-form-group
      id="fieldset-1"
      label="Makale Başlığı:"
      label-for="input-1"
    >
      <b-form-input  :class="{'border-danger':input1}" id="input-1" v-model="baslik"  trim></b-form-input>
    </b-form-group>

      <b-form-group
      id="fieldset-2"
      label="Makale Konu:"
      label-for="input-2"
    >
      <b-form-input :class="{'border-danger':input2}" id="input-2" v-model="konu"  trim></b-form-input>
    </b-form-group>

     <b-form-group
      id="fieldset-3"
      label="Makale İçerik:"
      label-for="input-3"
      >

       <editor
       api-key="g87nrni7e5k74vz78q8d24iwm8gr9ytgpvjqczsamc3936u8"
       v-model="content"
       :class="{'border-danger':input3}"
       id="input-3"
       :init="{
         height: 400,
         menubar: false,
         automatic_uploads: true, 
         images_upload_url:apiurl+'upload',   
        codesample_languages: [''],

         plugins: [
           'advlist autolink lists link image charmap print preview anchor codesample',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code help wordcount'
         ],
         
          images_upload_handler: function (blobInfo, success, failure,folderName) {
                  init(blobInfo, success, failure)
 

          },
          
         toolbar:
           'undo redo | image |code |codesample|formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify '
       }"
     />
    </b-form-group>
<b-form-group
      label="Makale resmi"
    >
 <b-form-file
      v-model="file"
      :state="Boolean(file)"

      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
      size="lg"
      ref="file"
      accept=".jpg, .png, .gif"
    ></b-form-file>
    <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>

    <!-- Plain mode -->
      
    </b-form-group>
     </b-form>

    </b-card>

        
       

     <!-- <vue-prism-editor lineNumbers="true" readonly="true" :code="code" class="code-editor" v-model="editorData" language="js"></vue-prism-editor>
     -->
    
 
        
  
  </div>
<br><br>
    <Footer/>
  </div>
  </div>

</template>

<script>
import Vue from 'vue';

// @ is an alias to /src
import Footer from '@/components/Footer.vue'
//import PrismEditor from 'vue-prism-editor'
//import { componentsPlugin } from 'bootstrap-vue';
import Editor from '@tinymce/tinymce-vue'
import authcheck from '../authcheck'

 Vue.component('editor', Editor)
 Vue.component('Footer', Footer)

// Vue.component('vue-prism-editor', PrismEditor)
//import "prismjs";
//import "vue-prism-editor/prismeditor.js";
import authCheck from '../authcheck'
//import {apiurl} from '../../services/api.ts';

import axios from 'axios';

export default Vue.extend({
  name: 'articleadd',
   data() {
      return {username:JSON.parse(localStorage.getItem('user')).name,useremail:JSON.parse(localStorage.getItem('user')).email,
      formData:'',  baslik: '',konu:'',content:'',show:'spinner-hide',apiurl:'http://ahmetcelikblog.atwebpages.com/api/',
      input2:false,input3:false,input1:false,errors:[],spinnerClassName:'spinner-hide',
      file:null,file2:null,formdataSubmit:'',filevalidate:null,categoryInputValidate:false,
      categoryInput:'',errorcategory:'',formDataCategory:'',selected:null,options:[{"value":null,"text":"Kategori seçiniz!"}],
      }
    },
  beforeCreate()
  {

authcheck().then(res=>{
  return;
})
.catch(err=>
  {
    //window.stop();
    //this.$root.$router.push('/login/Sunucuda hata olduğu için buraya yönlendirildiniz.')
    alert('sunucu hatası')
  })
  
  },
   
    created()
    {
       fetch(this.apiurl+'getAllCategorys',
    {method:'GET',
    headers: {
      
      "X-CSRF-Token":  document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem('user')).token
    }
    
    
    })
   .then(response => response.json())
       .then(res => {
         console.log(res)
         res.array.forEach((value, index) => {
    this.options.push({"value":value.id,"text":value.name});
            });
            

        
          
        }).catch(err=>{
         if(err.status=='fail')
         {
        localStorage.removeItem("user");
        location.reload(true);      
         }
          });
     
    },
    methods:
    {
      logout()
      {
        localStorage.removeItem("user");
        location.reload(true);
      },
      openModal()
      {
       this.$root.$bvModal.show('modal-1')

       //this._vm.$bvModal.show('modal-1')

      },
       categoryAdd(e)
      {
       e.preventDefault();
       if(!this.categoryInput)
       {
         this.categoryInputValidate=true;
         this.errorcategory='Kategori adi alanı Boş olamaz!';
       }
       if(this.categoryInput)
       {
            this.categoryInputValidate=false;
            this.formDataCategory = new FormData();
            this.formDataCategory.append('name', this.categoryInput);
 fetch(this.apiurl+'saveCategory',
    {method:'post',
    headers: {
      
      "X-CSRF-Token":  document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem('user')).token
    },
        body: this.formDataCategory,

    
    
    })
   .then(response => response.json())
       .then(res => {
         console.log(res)
                 this.options.push({"value":res.categoryArray.id,"text":res.categoryArray.name});
            

        
          
        }).catch(err=>{
         if(err.status=='fail')
         {
        localStorage.removeItem("user");
        location.reload(true);      
         }
          });
         
       }
      },
   async  init(blobInfo, success, failure)
     {
       //console.log(JSON.parse(localStorage.getItem('user')).token)
                    this.formData = new FormData();
                   this.formData.append('file', blobInfo.blob(),blobInfo.filename());



             await axios({
    method: 'post',
    url:this.apiurl+'upload',
    data: this.formData,
    headers: {
      
      "X-CSRF-Token":  document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem('user')).token
    }
    })
    .catch(function (response) {
        //handle error
        console.log(response);
        if(response.status == 401||response.status=='fail') {
        localStorage.removeItem("user");
        location.reload(true);         
            }
    })
    .then(function (response) {
        //handle success
          console.log(response)
          if (response.status != 200) {
                     failure('HTTP Error: ' + response.status);
                     return;
                        }
              
                        success('http://ahmetcelikblog.atwebpages.com/api/link?name='+response.data.path);  
    })
    
    
    /*
 fetch('http://localhost:9000'+'/api/upload',{
   method:'POST',
   body:this.formdata,
   mode:'no-cors',
   headers: new Headers({
       "X-CSRF-Token":  document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        Authorization: "Bearer " + JSON.parse(localStorage.getItem('user')).token
    })
 })
    .then(response => { return response.json() })
        .then(res => {
          console.log(res)
          if (res.status != 200) {
                     failure('HTTP Error: ' + res.status);
                     return;
                        }
           this.json = JSON.parse(res.responseText);

            if (!this.json || typeof this.json.location != 'string') {
                            failure('Invalid JSON: ' + res.responseText);
                            return;
                        }
                        success(this.json.location);


                      });

        */
                   
                 
    },         
    showSpinner()
    {
      this.show='spinner-show';
    },
    hideSpinner()
    {
      this.show='spinner-hide';
    },
    async  articleAdd(event)
      {
               event.preventDefault();
      this.errors=[];

           if (this.baslik && this.baslik.length <10 && this.baslik.length >=1) {
          this.input1=true;
          this.errors.push('Başlık alanına en az on karakter girmelisin')
        } else if(!this.baslik )
        {
          this.input1=true;
          this.errors.push('Başlık alanı Boş olamaz!')

        }
        else
        {
          this.input1=false;

        }
       if (this.konu && this.konu.length <10 && this.konu.length >=1) {
          this.input2=true;
          this.errors.push('Konu alanına en az on karakter girmelisin')
        } else if(!this.konu )
        {
          this.input2=true;
          this.errors.push('Konu alanı Boş olamaz!')

        }
        else
        {
          this.input2=false;

        }
         if (this.content && this.content.length < 50 && this.content.length >=1) {
          this.input3=true;
          this.errors.push('İçerik alanına en az 50 karakter girmelisin')
          }
       else if(!this.content){
          this.input3=true;
          this.errors.push('İçerik alanı Boş olamaz!')       
            }
             else
        {
          this.input3=false;

        }
         if(this.selected==null){
          this.errors.push('Kategori id seçiniz!')       
            }
     
if(!this.input1 && !this.input2 && !this.input3 && this.selected!=null)
       {
         //apiye gönder article adding
         this.spinnerClassName='spinner-show';

         this.input1=false;
         this.input2=false;
         this.input3=false;

                   this.formdataSubmit = new FormData();
                   this.formdataSubmit.append('file', this.file);
                   this.formdataSubmit.append('content', this.content);
                   this.formdataSubmit.append('baslik', this.baslik);
                   this.formdataSubmit.append('konu', this.konu);
                   this.formdataSubmit.append('categoryId', this.selected);
                  await axios({
  method: 'post', //you can set what request you want to be
  url: this.apiurl+'articleadd',
  data: this.formdataSubmit,
  headers: {
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
  }
}).then(res=>
{
console.log("upload oldu")

         // this.$root.show=false

           this.$root.$bvToast.toast("Makale eklendi", {
          title: 'Başarılı',
          autoHideDelay: 5000,
          appendToast: true,
          variant: 'success',

        })
           this.spinnerClassName='spinner-hide';
  

}).catch(err=>{
  
        this.$root.$bvToast.toast("Makale eklenemedi", {
          title: 'Başarısız',
          autoHideDelay: 5000,
          appendToast: true,
          variant: 'danger',

        })
        
          });

        

           


          /*        
 fetch('http://localhost:9000/api/articleadd',
    {method:'POST',
    headers: {
      
      "X-CSRF-Token":  document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem('user')).token
    },
    body:this.formdataSubmit
    
    })
   .then(response => response.json())
       .then(res => {
         console.log(res)
       
             if(res.status=="fail")
         {
        localStorage.removeItem("user");
        location.reload(true);      
         }

          if (res.data) {
       this.$root.$bvToast.toast("Makale eklendi", {
          title: 'Başarılı',
          autoHideDelay: 5000,
          appendToast: true,
          variant: 'success',

        })
      
           }
          
        }).catch(err=>{
         if(err.status=="fail")
         {
        localStorage.removeItem("user");
        location.reload(true);      
         }
          });
/*
console.log(this.$refs.file.files[0])
console.log(this.$root.$refs.file.files[0])

this.formdataSubmit = new FormData();
                   this.formdataSubmit.set('file', this.$root.$refs.file.files[0]);
            axios.post('http://localhost:9000/api/articleadd', {
            baslik:this.baslik,
            konu:this.konu,
            content:this.content,
            categoryId:this.selected,
            file:this.formdataSubmit
            },
          { headers:
           {
                Authorization: "Bearer " + JSON.parse(localStorage.getItem('user')).token,
                'Content-type':'application/x-www-form-urlencoded'
           }
          
          })
          .then(response => {
              console.log(response)
            if (response.data.data) {
              this.$root.$bvToast.toast("Makale eklendi", {
          title: 'Başarılı',
          autoHideDelay: 5000,
          appendToast: true,
          variant: 'success',

        })

            }
     

          })
          .catch(e => {

 this.$root.$bvToast.toast("Makale eklenemedi", {
          title: 'Başarısız',
          autoHideDelay: 5000,
          appendToast: true,
          variant: 'danger',

        })


        })
  
*/

    /*
axios({
    method: 'post',
    url: 'http://localhost:9000/api/articleadd',
    data: this.formdataSubmit,
    headers: {
      
      "X-CSRF-Token":  document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem('user')).token
    }
    })
    .then(function (response) {
        //handle success
          console.log(response)
          if (response.data) {
 this.$root.$bvToast.toast("Makale eklendi", {
          title: 'Başarılı',
          autoHideDelay: 5000,
          appendToast: true,
          variant: 'success',

        })
      
           }
       
    })
    */
    
            

         }
         //


      }
    }
});
</script>
<style scoped>
@import url('http://localhost:8080/prism2.css');
.spinner-hide
{
  display:none;
}
.spinner-show
{
  display:inline-block;
}
.card
{
  margin-left:auto;
  margin-right:auto;
  width:80%;
}
.border-danger
{
  border:red 1px solid;
}
.code-editor
{
    width:40%;
    height: 30%;
}
.article-add
{
  display:flex; 
  flex-direction:column; 
  padding:0px;
}
.openModal:hover
{
text-decoration: underline;
cursor:pointer;
}
.navbar
{
    box-shadow: 4px 4px 4px lightgray;

}
.buttons
{
  float:right;

}
.select
{
  margin-left:auto;
  margin-right:auto;
  width:100%;
}

</style>