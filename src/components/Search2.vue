<template>
<div id="mySidenav" class="sidenav" :class="self.$store.state.IsOpen==true ? 'OnOpenSearch2 ' : 'OnCloseSearch2' ">
  <a href="javascript:void(0)" class="closebtn" @click="close()">&times;</a>
  <div style="width:100%;padding-left:10px;padding-right:10px;">
          <b-form-input  trim  @keyup="checkForm($event)"  v-model="searchText" size="md" class="mr-sm-2 input-field"  placeholder="Ara">
          </b-form-input> 
          <br>
           <ul class="ul-styles">
               <li class="li-styles" v-for="(searchs , id) in searchTexts" :key="id">
                   <b-media>
      <template v-slot:aside class="templt-media">
         <b-img  :src="searchs.imagelink" class="img"></b-img>
      </template>

      <p class="baslik" style="word-break: break-all;color:rgb(255,255,255,0.4)">
     {{searchs.baslik}}
      </p>
    

      </b-media>
                   
               </li>
           </ul>
</div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
//import api from '../services/api';

export default Vue.extend({
  name: 'Search2',
  props: ['articleAll'],
  data(){
   return{ searchText: '',self:this,
 searchTexts:[{}],searchs:'',articles:['']
   }
  },
  created()
  {
   this.articleAll.splice(0,1)
   this.articles = this.articleAll

  },
  /*
  watch:{

selftState(val)
{
    const el = document.body;
  console.log(el)
if(!val)
{
  //el.className
}
  
}
  },
  */
 /*
 mounted()
 {
   */
   /*
   document.getElementsByClassName('search-text-input')[0].addEventListener('click',this.bodyClass)

   
document.getElementsByClassName('closebtn')[0].addEventListener('click',this.bodyClass2)
*/
/*
 },
 */
  
  methods:{
    /*
bodyClass()
{
     document.body.className="bodyStyle";


},
bodyClass2()
{
     document.body.className="bodyStyle_";


},
*/
close()
{
this.searchText=''
      this.$store.commit('CloseSearch2')


},
searchevent(value: any)
{
  //this.spinner=true
  this.searchText=value
            
  this.$root.$router.push('/articledetails/'+encodeURIComponent(this.searchText));


},

   
 checkForm: function (e: any) {
       e.preventDefault();

//this.searchText=e.target.value
     if (e.target.value) {
     if (e.keyCode === 13) {
  //this.spinner=true
    // Cancel the default action, if needed
    // Trigger the button element with a click
         
         /*setTimeout(function(){ 
            
          this.$root.$router.push('/articledetails/'+encodeURIComponent(this.searchText));

           }.bind(this),3000);

*/
          this.$root.$router.push('/articledetails/'+encodeURIComponent(e.target.value));


  }
else
  {   
  this.searchTexts.splice(0,this.searchTexts.length)
   //console.log(this.articleAll)
  //const array=[{}]
  
  this.articles.forEach((value:any, index) => {
   value=JSON.parse(value)
 if(value.baslik.includes(this.searchText))
   {
      this.searchTexts.push({

        baslik:value.baslik,imagelink:value.imagelink
      })
  

   }   
 
            });
}

       }

     
    },
  }
});
</script>

<style scoped>
.sidenav {
  height: 100%; /* 100% Full-height */
  width: 0px; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  right: 0;
 background: linear-gradient(to bottom, black, gray);
 background-color: black;
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
  border-radius:5px;
box-shadow: 20px 20px 20px 20px black;
}

/* The navigation menu links */
.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover {
  color: #f1f1f1;
}

/* Position and style the close button (top right corner) */
.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 18px;
  font-size: 36px;
  margin-left: 50px;
}

/* Style page content - use this if you want to push the page content to the right when you open the side navigation */
#main {
  transition: margin-left .5s;
  padding: 20px;
}

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
@media screen and (max-width: 450px) {
  .OnOpenSearch2
{
  width:100%;
}
}
.OnOpenSearch2 {
  width:350px;
}
.OnCloseSearch2
{
  width:0px;
}
.input-field
{
text-align: center;
  color:#2D0752 ;
  border-radius: 40px;
}
.ul-styles
{
  list-style: none;
  width:100%;
  padding:0;
  margin:0;
}
.li-styles
{
  display:inline-block;
    width:100%;
   cursor:pointer;
   border-bottom: solid 2px grey;
   min-height: 70px;
}
.img
{
  width:60px;
  height: auto;
  border-radius: 40px;
  margin-top: 7px;
  margin-bottom: 7px;
}
.templt-media
{
  padding-top: 10px;
}
.baslik-styles
{ /* width: 00px; 

  white-space: nowrap;
  overflow: hidden; 

  text-overflow: ellipsis;
  /*white-space: nowrap;*/
 /* color:white;*/
 white-space: initial;
}
/*
 .ul-styles li:nth-child(even) {
  background: #D0E4F5;
}
*/
.baslik:hover{
  color:rgba(211, 87, 15, 0.8);
}
</style>