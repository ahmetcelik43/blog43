<template>

    <footer class="footer">

        <b-container fluid>
  <b-row class="row-content">
          
          <div class="row-left">
            <b-img src="http://localhost:8080/20181227_094541.jpg" width="60" height="60"></b-img>
           </div>
           <div class="scroll-div">
            <b-button v-on:click="scrollTop()"  class="scroll-top-button">
                <vue-fontawesome  icon="angle-up"  color="black"> </vue-fontawesome>
            </b-button>
            </div>
           <div class="row-right">
            <p>Bu sitedeki yazıların tüm hakkı ®Ahmet Çelik'e aittir</p>
           </div>
           
  </b-row>
  <b-row class="row-content-mobil">
           <div class="content-mobil">
            <b-button v-on:click="scrollTop()"  class="scroll-top-button">
                <vue-fontawesome  icon="angle-up"  color="gray"> </vue-fontawesome>
            </b-button>
          
           

           </div>
<div class="content-mobil">
   <p>Bu sitedeki yazıların tüm hakkı ®Ahmet Çelik'e aittir</p>
</div>

  </b-row>
        </b-container>
    </footer>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Footer',
  data(){
   return{ }
  },
  methods:{

      scrollTop:function()
      {
       window.scrollTo(0, 0);

     }
  }
});
</script>

<style scoped>
.footer
{
    position: sticky;;
    bottom: 0;
    background-color: #6c757d;
    width:100%;
    height: 90px;
    margin-top: auto;
    padding-left:140px;
    padding-right: 140px;
    padding-bottom: 10px;
    color:white;

  
}
.row-left
{
  padding-top: 10px;
}
.row-right
{
padding-top: 20px;
}
.scroll-top-button
{
   
background-color: lightgray;
}
.scroll-div
{
    
padding-top: 20px;
}
.content-mobil
{
  margin-left: auto;
  margin-right: auto;
  width:100%;
  padding-top: 10px;
  text-align: center;
}
@media screen and (max-width: 1024px) {
	
.footer
{
  padding-left: 10px;
  padding-right: 10px;
}

}
@media screen and (max-width: 800px) {
.row-content-mobil
{
    display:block;
    
    color:white;
}
.row-content
{
    display:none;

}

}

@media screen and (min-width: 801px) {

.row-content-mobil
{
    display:none;

}

.row-content
{
   display:flex;
   justify-content:space-between;
}	
}
</style>