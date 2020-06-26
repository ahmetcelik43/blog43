<template>
  <div class="admin-home">
    <b-navbar class="navbar" toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand href="/">Ahmet Çelik</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item> <router-link to="/">Anasayfa</router-link></b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        

       <b-nav-item>

       </b-nav-item>
        <b-nav-item>

       </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

  <br>

<b-container fluid class="sidebar-container">
  <b-row class="sidebar-row" >

<div class="sidebar">
<ul class="sidebar-ul">
    <li> <b-navbar-brand>Ahmet Çelik</b-navbar-brand></li>
    <br>
    <li><a>Admin anasayfa</a></li>
    <li><a>Makale Ekle</a></li>
    <li><a>Makale İşlemleri</a></li>

</ul>
</div>
<div class="main-content">
</div>
  </b-row>
</b-container>

<br>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from '@/components/Footer.vue'

export default {
  name: 'adminhome',
  components: {
    Navbar,Footer
  }
}
</script>
<style scoped>
.admin-home
{
  display:flex; 
  flex-direction:column; 
}
.navbar
{
    box-shadow: 4px 4px 4px lightgray;

}
.sidebar-container
{
    width:100%;
    display: table;
}
.sidebar-row
{
   display:table-row;
   width:100%;

}
.sidebar
{
display:table-cell;
box-shadow: 4px 4px 4px lightgray;

}
.main-content
{
display:table-cell;
}
.sidebar-ul
{
    list-style: none;
    padding:10px 5px 10px 5px;

}
</style>