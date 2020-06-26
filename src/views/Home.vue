<template>
  <div class="home">
    
    <Navbar/>
  <br>
    <HomeContent/>
    <br>
    <br><br>
    <br>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import HomeContent from '@/components/HomeContent.vue'
import Footer from '@/components/Footer.vue'
import Vue from 'vue';
/*
Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
 
 bind () {
   console.log(232)
      this.event = event => this.vm.$emit(this.expression, event)
      //this.el.addEventListener('click', this.stopProp)
      document.body.addEventListener('click', this.event)
  },   



})*/
export default Vue.extend({
  name: 'Home',
  components: {
    Navbar,HomeContent,Footer
  },
  
})
</script>
<style scoped>
.home
{
  display:flex; 
  flex-direction:column; 
}
</style>