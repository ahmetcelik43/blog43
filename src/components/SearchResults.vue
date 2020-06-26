<template>
<b-container fluid class="container-content">
  <br>
  <b-row>
      
    <b-col xs="11" sm="11" md="8" lg="8" >
      <div style="width:100%; background-color: rgb(230,230,230,0.8);">
           <vue-fontawesome style="display:inline-block"  icon="search"  color="lightgray"> </vue-fontawesome>
         <strong style="display:inline-block"> Bu terim için : {{searchedText}} {{articlesLength}} arama sonucu bulundu </strong>
      </div>
       <b-row class="container-row">
    <b-col xs="11" sm="11" md="6" lg="6" class="cols-column" v-for="article in paginatedArticles" v-bind:key="article">

        <b-img  :src="apiurl+'link?name='+article.imagename" width="150" height="200" alt="placeholder"></b-img>

  <p>
        <vue-fontawesome class="icons"  icon="clock"  color="lightgray"> </vue-fontawesome> <b class="dates">{{article.createdAt}}</b>
        </p>
        <h5 class="overflowed-texts">{{article.baslik}}</h5>

 <p class="overflowed-texts-p">
        {{article.konu}}
        </p>
      <p>
         <a :href="detailsUrl+encodeURIComponent(article.baslik)">Devamını Oku <vue-fontawesome   icon="angle-right"  color="blue"> </vue-fontawesome></a>
        </p>
    

    </b-col>

      </b-row>

    <br>
  <div class="paginate-buttons">
  <b-button variant="info" @click="geri" :disabled="isGeriDisabled"  size="sm">geri
        </b-button>
        &nbsp;


          <b-button variant="info" @click="ileri" :disabled="isIleriDisabled" size="sm">ileri </b-button>
  </div>

    </b-col>
 

    <b-col  xs="11" sm="11" md="4" lg="4" class="cols">  
     <div class="header-search"> <a class="search-content-text">Blogda Ara</a></div>
   <div class="search-content">
     <br>
        <div  class="search-form" > 
          <div class="input-container">
             <b-spinner  class="icon" variant="primary" type="grow"  :class="spinner ? 'spinner-show':'spinner-hide'" ></b-spinner>
           <b-form-input  trim  @keyup="checkForm($event)" :class="searchText ? 'search-input-success':'search-input-error'" v-model="searchText" size="md" class="mr-sm-2 input-field"  placeholder="Ara">
          </b-form-input>

  </div>


        <!-- <b-button @click="searchOnSubmit($event)" :disabled="searchText!=null ? false:true " type="submit" size="sm"> <vue-fontawesome class="my-2 my-sm-0"   icon="search"   color="lightgray"></vue-fontawesome>
        </b-button>
   -->
  
        </div>
        <ul class="search-ul"   :class="searchText ? 'search-show':'search-hide'">
          <li>
            <a class="atag" @click="close"> <vue-fontawesome   icon="window-close"  color="grey"> </vue-fontawesome> </a>
           <br>
           <br>
            </li>
          
          
          <li class="search-li" v-for="entry in searchTexts" v-bind:key="entry">

           <vue-fontawesome  id="search-icon" icon="search"  color="white"> </vue-fontawesome> <a class="search-text-input" @click="searchevent(entry)">   {{entry}}
          </a>
          </li>
        </ul>
 <!--
 <ul v-if="errors" class="errors-ul">
            <li  v-for="error in errors" v-bind:key="error"><strong class="text-danger">{{ error }}</strong></li>

    </ul>
-->
   </div>
   <br>
   <div style="background-color: rgb(230,230,230,0.8);text-align:center" >
     Dil
     </div>
   <div class="lang">
      <b-button  class="button-b" variant="light" v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)">
             <flag :iso="entry.flag" v-bind:squared=false /> 
     </b-button>
     
     </div>
<br>
  <Lasttexts/>
<br>
<Categorys/>

    </b-col>
  </b-row>

  
</b-container>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
//import api from '../services/api';
import Categorys from '@/components/Admin/Categorys.vue';
import Lasttexts from '@/components/lastTexts.vue';
//import store from '../store/index';

//import func from '../../vue-temp/vue-editor-bridge';
/*
Vue.mixin({
methods: {
makeTitle: function (el) {
if(!this.$el.contains(el))
{
  
//this.searchText='';
}
}
}
});
*/
/*
Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
console.log ("asda") 
     document.body.addEventListener('click',this.h(event));
     
}




})
*/
export default Vue.extend({
  name: 'SearchResults',
  components:{Categorys,Lasttexts},
  
  
  
  data() {
    return {
        //errors: [''],
       searchText: '',
       detailsUrl:'/articledetails/',
      articles:[],
      apiurl:'http://ahmetcelikblog.atwebpages.com/api/',
      articlesLength:0,
     spinner:false,
      i:0,paginatedArticles:[]
      ,isGeriDisabled:false,isIleriDisabled:false,perpage:12,
        languages: [
                    { flag: 'tr', language: 'tr', title: 'Türkçe' },
                    { flag: 'us', language: 'us', title: 'English' }
                ]
         ,
         searchs:[''],
         searchTexts:[''],searchedText:''
         }
  
   
  },
  
 
 async created()
  {
      if(this.$route.params.searchText)
      {
          this.searchedText=decodeURIComponent(this.$route.params.searchText)
        let data = new FormData();
         data.append('searchText', this.searchedText);
       await axios({
  method: 'get', //you can set what request you want to be
  url: this.apiurl+'getSearchResults',
  data: data,
 
}).then(res => {
        console.log('no error'+JSON.stringify(res.data.articles))
        //return JSON.stringify(res.data.articles)
       const data=res.data.articles
if(data) {
       

this.isGeriDisabled=true;

 data.forEach((value: any, index: any) => {
   
this.searchs.push(value.baslik);

 })

  this.articlesLength=data.length;
  if(this.articlesLength<=this.perpage)
this.paginatedArticles=data
  else{
this.k(data)
this.articles=data;

  }
}
else
{
    this.$root.$bvToast.toast("Makaleler getirilemedi", {
          title: 'Başarısız',
          autoHideDelay: 5000,
          appendToast: true,
          variant: 'danger',

        })
        
}
      
      })
      .catch(err=>{
         this.$root.$bvToast.toast("Makaleler getirilemedi", {
          title: 'Başarısız',
          autoHideDelay: 5000,
          appendToast: true,
          variant: 'danger',

        })
        
  
            
              });
      }
else

    this.$root.$router.push('/notfound')


  },

  methods:{
  
    k(articles: any)
    {
  //this.paginatedArticles=articles.slice(5,this.articlesLength);
  this.paginatedArticles=articles.slice(0,this.perpage);//0-4 arası

  //this.i+=5;

    },
   
ileri()
{
  


////12
  //12-10<=10
  //12-5<=10
  //12<=10
if(this.articlesLength-this.i<=this.perpage)
{
         window.scrollTo(0, 0);

     this.i+=this.perpage;

this.paginatedArticles = this.articles.slice(this.i,this.articlesLength);
     //this.i+=(this.articlesLength-this.i);
  this.isIleriDisabled=true;
  this.isGeriDisabled=false;

}
else

{
  //beş den büyük
     this.i+=this.perpage;
       window.scrollTo(0, 0);

    this.paginatedArticles = this.articles.slice(this.i,(this.perpage+this.i));
   this.isIleriDisabled=false;
  this.isGeriDisabled=false;
  if(this.articlesLength-this.i<this.perpage)
  {
//10==10
//10==
   this.isIleriDisabled=true;

  }
}
 

},
close()
{
this.searchText=''
},
searchevent(value: any)
{
            //event.preventDefault();
this.spinner=true
  this.searchText=value
            
  this.$root.$router.push('/articledetails/'+encodeURIComponent(this.searchText));


},
geri()
{
  console.log('geri'+this.i)
  
  if(this.i==this.perpage)
  {
           window.scrollTo(0, 0);

    this.paginatedArticles = this.articles.slice(0,this.perpage)//2-7 arası
     this.i-=this.perpage;
  this.isGeriDisabled=true;
   this.isIleriDisabled=false;

  }
    if(this.i==0)
  {
           window.scrollTo(0, 0);

    this.paginatedArticles = this.articles.slice(0,this.perpage)//2-7 arası
     //this.i-=5;
  this.isGeriDisabled=true;
   this.isIleriDisabled=false;

  }
  /*
  else if(this.i==this.articlesLength)
  {
     this.paginatedArticles = this.articles.slice((this.i-5),this.articlesLength);//10-5 arası
     this.i-=5;

  }
  */
  else
  {
           window.scrollTo(0, 0);

     this.paginatedArticles = this.articles.slice(this.i-this.perpage,this.i);//10-5 arası
     this.i-=this.perpage;
  this.isGeriDisabled=false;
   this.isIleriDisabled=false;

  }
  
},
   
 checkForm: function (e: any) {
this.searchText=e.target.value
     if (this.searchText!='') {
if (e.keyCode === 13) {
  this.spinner=true
    // Cancel the default action, if needed
    e.preventDefault();
    // Trigger the button element with a click
    this.searchOnSubmit('');
          e.preventDefault();
          setTimeout(function(){ 
            
        //this.$root.$router.push('/articledetails/'+encodeURIComponent(this.searchTextUpdated));

           }.bind(this),3000);



  }
else
{   
  this.searchTexts.splice(0,this.searchTexts.length)
  this.searchs.forEach((value, index) => {
 if(value.includes(this.searchText))
   {
      
    this.searchTexts.push(value);

   
      

      //this.searchTexts.push(value);

   }   
 
            });
}

       }

     
    },
     searchOnSubmit(e:any)
     {
       console.log("submited")
       //this.$root.$router.push('/searchResultPage/'+this.searchText)

     }
  
  
	
  },
  
  

});
</script>

<style scoped>

      .cols-column
      {

          display:flex;
          flex-direction: column;
      }    
      .input-container {
  display: inline-flex;
  width: 100%;
  margin-bottom: 15px;

}

/* Style the form icons */
.icon {
width: 2em;
height: 2em;
margin-right: 5px;  
display:inline-block;
}

/* Style the input fields */
.input-field {
  width: 80%;
  padding: 10px;
  display:inline-block;

}
.spinner-show

{
visibility: visible;
}
.spinner-hide
{
visibility:hidden;
}
.atag
{
  float: right;
  padding-right: 5px;
}
#close
{
  font-size: 25px;
}
.search-text-input
{
   text-overflow: ellipsis;
  overflow: hidden; 
  width: 260px; 
  white-space: nowrap;
  padding-left: 20px;
    display:inline-block

}
.search-icon
{
  display:inline-block;
  font-size: 25px;
}
.search-ul
{
  z-index: 100;
  list-style: none;
margin-left: auto;
margin-right: auto;
width:90%;

margin-top: -12px;

position: relative;
background-color:rgb(62, 62, 63);
overflow-y: auto;
max-height: 400px;
border-radius: 5px;
overflow-x: hidden;
text-overflow: ellipsis;

}
.search-ul li:hover
{
  background-color:rgb(230,230,230,0.5);
}
.search-ul li:first-child:hover
{
background-color:rgba(62, 62, 63,0.9);
}
.search-li
{
height:40px;
padding-bottom: 5px;
padding-left:6px;
padding-right:6px;
color:white;
margin-left: -40px;
 
}
.search-li-kapat
{
  text-align: center;
}
.lang
{
  
width:100%;
margin-right: auto;
margin-left: auto;
text-align:center;
 border-bottom:1px solid black;

background-color: rgb(230,230,230,0.5);
height: 80px;
padding-top: 20px;
}
.paginate-buttons
{margin-left: auto;
  margin-right: auto;
width:150px;
}
.dates
{
  opacity: 0.8;
}
.header-search
{
background-color: rgb(230,230,230,0.8);
  text-align: center;
}
.media-bodys
{
  overflow: hidden;
    width: 100%;
padding-left: 10px;
padding-top: 10px;

}
.icons
{
font-size: 20px;  
}
.overflowed-texts
{
  width: 80%;
  font-size: 19px;
  word-wrap: break-word;
  font-weight: bold;
}
.overflowed-texts-p
{
 width: 80%;
  font-size: 16px;
  word-wrap: break-word;
}

.table-row
{
width: 100%;

display: table-row; 

}
.ml-3
{
  text-align: left;
}
.table.cell
{
  width: 100%;

border:1px solid blue;
    display: table-cell; 

}
.hoverstyle
{
max-width:650px ;
padding-left:10px;
}
.search-content
{
background-color: rgb(230,230,230,0.5);
width:100%;
padding-top:10px;
 border-bottom:1px solid black;

height: 100px;

}
.button-b {
       
        border: 1px solid green;
        margin-right: 10px;
    }
.makaleler-text
{
    
    float: left;
}
.makaleler-view-all
{
    float: right;
    color:blue;
}
.search-content-text ,.last-texts-content-text
{
text-align: center;
}

.last-texts-content
{
  border-top: blue solid 2px;
background-color: rgb(230,230,230,0.5);

}
.last-texts-time
{
  opacity: 0.5;

}
.last-text-media
{
  text-align: left;
}
.search-form
{

margin-left: auto;
margin-right: auto;
width:300px;
}
.search-input
{
  width: 100%;
    display: inline-block;

}
.container-content
{
  padding-left: 140px;
  padding-right: 140px;
}
.text-media
{
  max-height: 250px;
  overflow-y: hidden;
  padding-left: 10px;
}
.search-show
{
  display: block;
}
.search-hide
{
  display: none;
}
.errors-ul
{
  list-style: none;
}
.search-input-error
{
  border:solid red 1px;
}
.search-input-success
{
  border:none;
}
@media screen and (max-width: 1024px) {
  .container-content
{
  padding-left: 0px;
  padding-right: 0px;
}
.container-row
{
   padding-left: 10px;
  padding-right: 10px;
}

}


</style>