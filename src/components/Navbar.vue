<template>
<div>
<b-navbar  class="navbar-up" toggleable="lg" type="dark" variant="default">
    <b-navbar-brand href="/"><h4>Ahmet Çelik </h4> <h6>Kişisel blog</h6></b-navbar-brand>

      <b-navbar-nav class="ml-auto">
       <b-nav-item>
           <a class="search-text-input" @click="OpenOrCloseSearch()">
         <vue-fontawesome icon="search" size="3" color="gray"> 
           
         </vue-fontawesome>
         </a>
       </b-nav-item>

      </b-navbar-nav>
  
  </b-navbar>
<b-navbar class="navbar-custom" toggleable="lg" type="dark" variant="primary">

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item v-bind:class="ishome==true ?'pathborder':'pathnotborder'"> <router-link to="/">Anasayfa</router-link></b-nav-item>
        <b-nav-item v-bind:class="isabout==true ?'pathborder':'pathnotborder'"><router-link to="/about">Hakkımda</router-link></b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        

       <b-nav-item>
         <vue-fontawesome  :icon="['fab', 'facebook']" size="1" color="lightgray"></vue-fontawesome>

       </b-nav-item>
        <b-nav-item>
         <vue-fontawesome  :icon="['fab', 'google']" size="1" color="lightgray"></vue-fontawesome>

       </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Navbar',

  data(){
   return{ showinput:false,ishome:false,isabout:false}
  },
  created()
  {
    console.log(this.$route.path)
   if(this.$route.path=='/')//home yada about olur.
   {
     console.log('h')
    this.ishome=true;

   }
   else if(this.$route.path=='/about')//home yada about olur.
   this.isabout=true;
   //this.$emit('Search2Channel',false);
  },
  methods:{
OpenOrCloseSearch()
{
  //console.log("work-1")
  
      //this.$emit('Search2Channel',true);
      //this.$route.path.
      this.$store.commit('OpenSearch2')
   
  
     //console.log("work-2"+this.$store.state.IsOpen)

},

      inputShowHide:function()
      {
        if(this.showinput==false)
        {
        this.showinput=true;
        }
        else
        {
        this.showinput=false;
        }
        
     }
  }
});
</script>

<style scoped>
.navbar-custom
{
-webkit-box-shadow: 0px 7px 3px 0px rgba(187,187,199,1);
-moz-box-shadow: 0px 7px 3px 0px rgba(187,187,199,1);
box-shadow: 0px 10px 7px 0px rgba(187,187,199,1);}
.search-input
{
  transition-property:all;
  transition-duration: 1s;
  transition-timing-function: linear;
  width:0px;
}
.navbar-up
{
  height: 53px;
}
.search-input-on-show
{
width:80px;

}
h4,h6
{
  color:grey;
  display: inline-block;

}
a
{
color:white;

}
.pathnotborder
{
  border:none;
}
.pathborder
{
  border-bottom:solid yellow 2px;
}
a:hover
{
  color:yellow;
}
nav{
  padding-left: 160px;
  padding-right: 160px;
}
@media screen and (max-width: 990px) {
	
	nav
  {

  padding-left: 10px;
  padding-right: 10px;  
  }
}
</style>