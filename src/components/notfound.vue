<template>
<div>


<b-button @click="f">Sayfa Bulunamadı !</b-button>
</div>


</template>

<script lang="ts">
import Vue from 'vue';
//import PrismEditor from 'vue-prism-editor'
import router from '../router/index'
export default Vue.extend({
  name: 'notfound',
   
 data()
{
   return {}
 
},
methods:
{
   f()
   {
      alert()
       router.push({name:"login",params:{ok:'ok'}});

   }
}
});
</script>

<style scoped>


</style>