<template>
<div class="articleDetails">
    <Navbar/>
      

    <div>
  <img :src="apiurl+'link?name='+article.imagename" :alt="article.baslik"  class="img">

 <!--<div class="container-image">
  <div class="top-left">Ahmet Çelik</div>
  <div class="centered">{{artcl.baslik}}</div>

</div>
-->

<b-container fluid class="container-content">
 
  <b-row class="container-row">
      
    <b-col xs="11" sm="11" md="8" lg="8" class="cols-1">
      <br>
     <a class="makaleler-text overflowed-texts-p">{{article.baslik}}   

      <br>

      <vue-fontawesome class="icons"  icon="clock"  color="lightgray"> </vue-fontawesome> <b class="dates">{{article.createdAt}}</b>

     </a>
     <br>
     <div id="makaleler">
       <br>
        <p class="overflowed-texts-p">
        {{article.konu}}
        </p>
        <p class="overflowed-texts-p" id="content" v-html="article.content">
      
        </p>
     </div>
    <hr>

  <!--yorum-->

    </b-col>
 

    <b-col  xs="11" sm="11" md="4" lg="4" >  
      <br>
    
     <div class="header-search"> <a class="search-content-text">Blogda Ara</a></div>
   <br>
     <div style="background-color: rgb(230,230,230,0.8);text-align:center" >
     {{ $t('Dil') }}
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
  <Footer/>
</div>

</div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import Navbar from '@/components/Navbar.vue'

import Footer from '@/components/Footer.vue'
import api from '../services/api';
import Categorys from '@/components/Admin/Categorys.vue';
import Lasttexts from '@/components/lastTexts.vue';
//import "vue-prism-editor/prsm";
//import "vue-prism-editor/prism-line";

import i18n from '../services/lang';

export default Vue.extend({
  name: 'ArticleDetails',
  components:{Navbar,Footer,Categorys,Lasttexts},
  data() {
    return {
        //errors: [''],
        article:[''],
      apiurl:api.apiurl,
      searchText:'',
           spinner:false,
searchTexts:[''],searchs:[''],
      articleData:new FormData(),
      parsedContent:new Document(),
      languages: [
                    { flag: 'tr', language: 'tr', title: 'Türkçe' },
                    { flag: 'us', language: 'us', title: 'English' }
                ],
articleAll:[''],
Lang:this.$store.getters.GetLang()
         }
  
   
  },
  
  
async created()
{
  this.article=[''];
const param=decodeURI(this.$route.params.baslik);
//console.log(param)
//this.articleData.append('baslik',param)
await axios({
    method: 'get',
    url: api.apiurl+'articledetails/'+param,
 
   
    },   

    )
.then(res=>
{

console.log(res.data.artclDetails)

if(res.data)
{
  
  this.article=res.data.artclDetails;
this.articleAll=res.data.article;
  /*
  for (let index = 0; index < this.article.length; index++) {
 //this.parsedContent=new DOMParser().parseFromString(res.data.article[index].content, 'text/html')
        // const parser = new DOMParser();
     //this.parsedContent = parser.parseFromString(res.data.article[index].content, 'text/html');     
  //document.getElementById('content').innerHTML=this.article['index'].content;
  //this.codeHtml=this.article['index'].content
  }
  */
 
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
}).catch(err=>{
   
        this.$root.$bvToast.toast("Makaleler getirilemedi", {
          title: 'Başarısız',
          autoHideDelay: 5000,
          appendToast: true,
          variant: 'danger',

        })
        
          });
 

},
  methods:{
    
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
    changeLocale(locale: any) {
                i18n.locale = locale;
            },
  checkForm: function (e: any) {
this.searchText=e.target.value
     if (this.searchText!='') {
if (e.keyCode === 13) {
  this.spinner=true
    // Cancel the default action, if needed
    e.preventDefault();
    // Trigger the button element with a click
            
  this.$root.$router.push('/articledetails/'+encodeURIComponent(this.searchText));




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
     searchOnSubmit(e: any)
     {
       console.log("submited")
       //this.$root.$router.push('/searchResultPage/'+this.searchText)

     }
  
  }
});
</script>

<style scoped>

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
.search-text-input
{
   text-overflow: ellipsis;
  overflow: hidden; 
  width: 200px; 
  white-space: nowrap;
  padding-left: 20px;
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

.search-show
{
  display: block;
}
.search-hide
{
  display: none;
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
.input-field {
  max-width: 80%;
    min-width: 80%;

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
  font-size: 25px;
}

.search-content-text{
text-align: center;
}

.header-search
{
background-color: rgb(230,230,230,0.8);
  text-align: center;
}
.articleDetails
{
  display:flex; 
  flex-direction:column; 
}
.container-image {
  position: relative;
  text-align: center;
  color: white;
  width: 100%;
}
.img{
    width:100%;
    height:500px;
    opacity:0.8;
}
.img:hover
{
 opacity:0.9 ;
}
/* Top left text */
.top-left {
  position: absolute;
  top: 8px;
  left: 16px;
}



/* Centered text */
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color:blue;
  font-size:25px;
}

.dates
{
  opacity: 0.8;
}
.media-bodys
{
  overflow: hidden;
    width: 500px;
padding-left: 10px;
}

.icons
{
font-size: 25px;  
}
.overflowed-texts
{
  font-size: 19px;
  word-wrap: break-word;
  min-width:100%;
}
.makaleler-text 
{
  font-style: oblique;
  font-weight: bold;
}
.overflowed-texts-p
{
  min-width:100%;
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
 .button-b {
       
        border: 1px solid green;
        margin-right: 10px;
    }
.search-content
{
background-color: rgb(230,230,230,0.5);
width:100%;
 border-bottom:1px solid black;

height: 100px;

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
  width: 150px;
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

.icon {
width: 2em;
height: 2em;
margin-right:3px;  
margin-top: 5px;
display:inline-block;
}
  .input-container {
  width: 100%;

}
</style>