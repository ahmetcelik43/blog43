import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

import articleadd from '@/components/Admin/articleadd.vue'
import login from '@/components/Admin/login.vue'
import error from '../components/error.vue';
import ArticleDetails from '@/components/ArticleDetails.vue';

import notfound from '@/components/notfound.vue';
//import SearchResults from '@/components/SearchResults.vue';

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/admin/articleadd',
    name: 'articleadd',
    component: articleadd,
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/articledetails/:baslik?',
    name: 'ArticleDetails',
    component: ArticleDetails,
    
  },
  
  {
    path: '/error',
    name: 'error',
    component: error
  },
   
  {
    path: '/notfound',
    name: 'notfound',
    component: notfound
  },
 
]
 
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login','/','/about','/notfound','/error','/articledetails/'+to.params.baslik
,'/articledetails/'];//bunlar dışında bir yere gidiyors.
  const authRequired = publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  /*
 korumalı yola gidiyorsa
 
 */
/*
const publicPagesParam = ['/articledetails/'];
if (publicPagesParam.includes(to.path)) {

  return next();
} 
*/
if (!authRequired && !loggedIn) {

    return next('/login');
  }
 
  /*
if(loggedIn && ['/admin/articleadd'].includes(to.path) && ['/login'].includes(from.path))
{
  console.log("jwtcheck  kaldırıldı ok")//true

  return next();
  
}
*/
 /*
 korumalı yola gidiyorsa
 ve
 token zamanı dolduysa çalışır.
 */
/*
let status='fail';
if(authcheck()!=null)
{
authcheck().then(res=>{

  status='ok'
})
.catch(err=>
  {
    status='fail';
  })
}
 if(status=='fail'&& ['/admin/articleadd'].includes(to.path))
{
  console.log(!['/login'].includes(to.path))//true
  localStorage.removeItem("user");

  return next('/login');
  
}
*/
  next();
})
export default router
