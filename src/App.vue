<template>
  <div id="app">

    
     <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
//import Navbar from '@/components/Navbar.vue'
export default {
  components: {
    
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap');
a , p ,h5,h6{

font-family: 'Source Sans Pro' ;
}

::-webkit-scrollbar {
  width: 10px;
}
body,html
{
  overflow-x: hidden;
  
  background-color: rgb(220,220,220,0.5);
}
/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgb(181, 204, 136); 
  border-radius: 10px;

}
 
/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 10px;

  background:rgba(70, 70, 172, 0.8);
  
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background:rgb(192, 72, 72);

  
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
