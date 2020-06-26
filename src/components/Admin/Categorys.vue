<template>

    <div class="Categorys">
      <div class="last-texts-content-text">
   <a >Kategoriler</a>
</div>
        <b-container fluid class="container-category">
         <div v-for="(ctgry,id) in categories" v-bind:key="id">
           <a> {{ctgry.name}}  <vue-fontawesome   icon="angle-right"  color="blue"> </vue-fontawesome></a>
           <hr>
         </div>
        </b-container>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import api from '../../services/api';
import axios from 'axios';

export default Vue.extend({
  name: 'Categorys',
  data(){
   return{ categories:[]}
  },
  async created()
  {
 await axios({
    method: 'get',
    url: api.apiurl+'getCategories',
   
    })
.then(res=>
{
    console.log(res.data.categorys)

if(res.data.categorys)
{
  this.categories=res.data.categorys
  
}
else
{
 this.$root.$bvToast.toast("Kategoriler getirilemedi", {
          title: 'Başarısız',
          autoHideDelay: 5000,
          appendToast: true,
          variant: 'danger',

        })
}
}).catch(err=>{
   
        this.$root.$bvToast.toast("Kategoriler getirilemedi", {
          title: 'Başarısız',
          autoHideDelay: 5000,
          appendToast: true,
          variant: 'danger',

        })
        
          });
  },
  methods:{

     
  }
});
</script>

<style scoped>

.container-category
{
  padding-top:10px;
border-bottom:1px solid black;
background-color: rgb(230,230,230,0.5);
width:100%;
padding-bottom:15px;
}
.last-texts-content-text
{
  background-color: rgb(230,230,230,0.8);
text-align: center;
}

</style>