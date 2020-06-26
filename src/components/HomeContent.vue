<template>
<div>
  <Search2 :articleAll="searchTexts" />
 
<b-container fluid class="container-content">
  <br>
  <b-row class="container-row">
      
    <b-col xs="11" sm="11" md="8" lg="8" class="cols">
     <div id="makaleler">
       
<br>
        <b-row>
              <b-col xs="11" sm="11" md="6" lg="6" v-for="(article , keys ) in paginatedArticles" :key="keys" >
<div class="firstArticle">
          <b-img  :src="apiurl+'link?name='+article.imagename" class="imgs" alt="placeholder"></b-img>
 
      <p>
        <vue-fontawesome class="icons"  icon="clock"  color="lightgray"> </vue-fontawesome> <b class="dates">{{article.createdAt}}</b>
        </p>
        <h5 class="overflowed-texts">{{article.baslik}}</h5>
        <p class="overflowed-texts-p">
        {{article.konu}}
        </p>
        <p style="text-align:center">
         <a @click="redirectToDetails(encodeURI(article.baslik))">Devamını Oku <vue-fontawesome   icon="angle-right"  color="blue"> </vue-fontawesome></a>
        </p>
</div>

              </b-col>
        </b-row>
     

<br>
    </div>
   
    <br>
   
  <div class="paginate-buttons">
  <b-button variant="info" @click="geri" :disabled="isGeriDisabled"  size="sm">geri
        </b-button>
        &nbsp;


          <b-button variant="info" @click="ileri" :disabled="isIleriDisabled" size="sm">ileri </b-button>
  </div>

    </b-col>
 

    <b-col  xs="11" sm="11" md="4" lg="4" class="cols">  
      <!--
     <div class="header-search"> <a class="search-content-text">Blogda Ara</a></div>
   <div class="search-content">
     <br>
        <div  class="search-form" > 
          <div class="input-container">
             <b-spinner  class="icon" variant="primary" type="grow"  :class="spinner ? 'spinner-show':'spinner-hide'" ></b-spinner>
           <b-form-input  trim  @keyup="checkForm($event)" :class="searchText ? 'search-input-success':'search-input-error'" v-model="searchText" size="md" class="mr-sm-2 input-field"  placeholder="Ara">
          </b-form-input>
   <ul class="search-ul"   :class="searchText ? 'search-show':'search-hide'">
          <li>
            <a class="atag" @click="close"> <vue-fontawesome   icon="window-close"  color="grey"> </vue-fontawesome> </a>
           <br>
           <br>
            </li>
          
          
          <li class="search-li" v-for="(entry,keys) in searchTexts" :key="keys">

           <vue-fontawesome  id="search-icon" icon="search"  color="white"> </vue-fontawesome> <a class="search-text-input" @click="searchevent(entry)">   {{entry}}
          </a>
          </li>
        </ul>
  </div>

 -->

        <!-- <b-button @click="searchOnSubmit($event)" :disabled="searchText!=null ? false:true " type="submit" size="sm"> <vue-fontawesome class="my-2 my-sm-0"   icon="search"   color="lightgray"></vue-fontawesome>
        </b-button>
  
  
        </div>
      --> 
 <!--
 <ul v-if="errors" class="errors-ul">
            <li  v-for="error in errors" v-bind:key="error"><strong class="text-danger">{{ error }}</strong></li>

    </ul>

   </div>
   -->
   
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
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import api from '../services/api';
import Categorys from '@/components/Admin/Categorys.vue';
import Lasttexts from '@/components/lastTexts.vue';
import Search2 from '@/components/Search2.vue';
import router  from '../router/index'

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
  name: 'HomeContent',
  components:{Categorys,Lasttexts,Search2},
  
  
  data() {
    return {
        //errors: [''],
       searchText: '',
       detailsUrl:'/articledetails/',
      articles:[],
      articlesLength:0,
      spinner:false,
      i:0,paginatedArticles:[],
      IsOpen:Boolean
      ,isGeriDisabled:false,isIleriDisabled:false,perpage:10,apiurl:api.apiurl,
        languages: [
                    { flag: 'tr', language: 'tr', title: 'Türkçe' },
                    { flag: 'us', language: 'us', title: 'English' }
                ]
         ,
         searchTexts:[''],firstArticle:[]
         }
 
   
  },
  
 async created()
  {
    

         await axios.get(api.apiurl+'getArticles', {
      
       
      }).then(res => {
        //console.log('no error'+JSON.stringify(res.data.articles))
        //return JSON.stringify(res.data.articles)
       const data=res.data.articles
       let tempData={}
       if(data)
       {
          data.forEach((value: any, index: any) => {
  
//this.searchs.push(value.baslik);
tempData={

baslik:value.baslik,imagelink:api.apiurl + 'link?name=' + value.imagename
 
       }
this.searchTexts.push(JSON.stringify(tempData))
       });
       //this.searchTexts = JSON.this.searchTexts);
       //this.searchTexts = JSON.stringify(this.searchTexts)
       }

       this.firstArticle=res.data.firstArticle;
       //console.log(res.data.firstArticle)
if(data!='') {
        //console.log('null')
    //  await store.cache.dispatch('getArticles')
           // this.$store.commit('setdata2')
            //const data=this.$store.state.articles
           

  //this.paginatedArticles=res.data.articles

  this.isGeriDisabled=true;


  this.articlesLength=data;

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
  
   

  },

  methods:{
    redirectToDetails(baslik: any)
    {
      //alert(1)
    router.push({name:'ArticleDetails',params:{baslik:baslik}})
    },
    /*
    handleClick()
    {
        console.log('ird')

    },
    bodyOnClick(event):any
    {
              console.log('onclick called')

if(!event.target.contains(this.$el.querySelector('.search-input')))
{
this.searchText='';
}
    },
    changeLocale(locale) {
               // i18n.locale = locale;
            },
    searchOnClick(el):any
    {
        console.log('onclick called')

//if(!this.$el.contains(e))
/*
if(!event.target.contains(this.$el.querySelector('.search-ul')))

{
}
*//*
if(!this.$el.contains(el))
{
this.searchText='';

}
    }, */
    k(articles: any)
    {
  //this.paginatedArticles=articles.slice(5,this.articlesLength);
  this.paginatedArticles=articles.slice(0,this.perpage);//0-4 arası

  //this.i+=5;

    },
   
ileri()
{
  
   console.log('ileri'+this.i)


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
  /*
  else
  {
    const g =  
     this.paginatedArticles = this.articles.slice(this.i-10,this.i-5);//10-5 arası
     this.i-=5;

  }*/
   //  this.paginatedArticles = this.articles.slice((this.i-5),this.i);//10-5 arası

//this.paginatedArticles = this.articles.slice()this.i,this.i+5);//10-5 arası
     /*
if(this.paginatedArticles.length<5)
{
  this.isGeriDisabled=true;
  //this.isIleriDisabled=false
}

else
{
    this.isGeriDisabled=false;
    this.isIleriDisabled=false;

}
if(this.i==this.articlesLength)
{
    this.isGeriDisabled=true;

}
*/
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
.imgs{
    width:100%;
    opacity:0.9;
    height:170px;
    border-radius: 30px;
}
.img{
    width:100%;
        height:300px;

    opacity:0.9;
        border-radius: 30px;

}
.img:hover
{
 opacity:1 ;
}
 .imgs:hover
{
 opacity:1 ;
}         
      .input-container {
  width: 100%;

}
.firstArticle

{
  display: flex;
  flex-direction: column;
  padding-left: 5px;
  padding-right: 5px;
    text-align: left;

}
/* Style the form icons */
.icon {
width: 2em;
height: 2em;
margin-right:3px;  
margin-top: 5px;
display:inline-block;
}

/* Style the input fields */

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
  font-size: 25px;
}
#close
{
  font-size: 25px;
}
#makaleler
{

display:block;
width: 100%;
padding-left: 5px;
padding-right: 5px;
overflow-x:hidden;
  background: rgba(232, 233, 235, 0.6);
padding-top: 10px;
border-radius:30px;
}
.search-text-input
{
   text-overflow: ellipsis;
  overflow: hidden; 
  width: 200px; 
  white-space: nowrap;
  margin-left: 3px;
    display:inline-block

}
#search-icon
{
  margin-left:5px;
  display:inline-block;
  font-size: 25px;
}
.search-ul
{
  z-index: 100;
  list-style: none;
margin-left: auto;
margin-right: auto;
  max-width: 82%;
  min-width: 82%;

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
padding-right:6px;
color:white;
margin-left: -40px;
 
}
.search-li-kapat
{
  text-align: center;
  font-size: 30px;
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
.icons
{
font-size: 20px;  
}
.overflowed-texts
{
  width: 100%;
  font-size: 19px;
  word-wrap: break-word;
  font-weight: bold;
}
.overflowed-texts-p
{
 width: 100%;
  font-size: 16px;
  word-wrap: break-word;
}

.ml-3
{
  text-align: left;
}
.t
.hoverstyle
{
max-width:650px ;
padding-left:10px;
}
.search-content
{
background-color: rgb(230,230,230,0.5);
width:100%;
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
width:100%;
padding-left: 5px;
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