import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {BootstrapVue} from 'bootstrap-vue';
//------------
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
//----------------
//import "font-awesome/css/font-awesome.min.css";
//import VueBootstrapToasts from "vue-bootstrap-toasts";
//import api from './services/api';
//import JwPagination from 'jw-vue-pagination';

import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret ,faAngleRight,faClock,faSearch,faHourglass,faAngleUp,faWindowClose,faAlignLeft} from '@fortawesome/free-solid-svg-icons'
import { faFacebook,faGoogle } from '@fortawesome/free-brands-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
//Vue.component('VueFontawesome', require('vue-fontawesome-icon/VueFontawesome.vue').default);
Vue.use(BootstrapVue);
/*
Vue.component('BContainer',BContainer);
Vue.component('BRow',BRow);
Vue.component('BCol',BCol);
Vue.component('BMedia',BMedia);
Vue.component('BMediaAside',BMediaAside);
Vue.component('BImg',BImg);
Vue.component('BFormInput',BFormInput);

Vue.component('BNavbar',BNavbar);
Vue.component('BNavbarBrand',BNavbarBrand);
Vue.component('BNavItem',BNavItem);

Vue.component('BNavbarToggle',BNavbarToggle);
Vue.component('BNavbarNav',BNavbarNav);
Vue.component('BCollapse',BCollapse);

Vue.component('BNavItemDropdown',BNavItemDropdown);
Vue.component('BDropdownDivider',BDropdownDivider);
Vue.component('BModal',BModal);
Vue.component('BForm',BForm);
Vue.component('BSidebar',BSidebar);
Vue.component('BFormGroup',BFormGroup);
Vue.component('BSpinner',BSpinner);
Vue.component('BFormInput',BFormInput);
//Vue.use(BootstrapVue);
Vue.component('BFormSelect',BFormSelect);
Vue.component('BFormFile',BFormFile);
Vue.component('BCard',BCard);
*/
//import Paginate from 'vuejs-paginate'
//Vue.component('paginate', Paginate)
library.add(faUserSecret,faAngleRight,faClock,faSearch,faHourglass,faAngleUp,faFacebook,faGoogle,faWindowClose)

Vue.component('VueFontawesome', FontAwesomeIcon)
import VueI18n from 'vue-i18n';
//import i18n from '@/plugins/i18n';
import i18n from './services/lang';

import FlagIcon from 'vue-flag-icon';
//import VuePrismEditor from "vue-prism-editor";
import "vue-prism-editor/dist/VuePrismEditor.css"; // import the styles
//Vue.component("prism-editor", VuePrismEditor);
//Vue.component('vue-prism-editor', VuePrismEditor)
//Vue.use(VueBootstrapToasts);
//Vue.component('jw-pagination', JwPagination);
Vue.use(VueI18n);
Vue.use(FlagIcon);
Vue.config.productionTip = true
/*
Vue.config.errorHandler = (err) => {
	alert(err.message)
}
*/

/*
Vue.prototype.$http.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
(error:any) => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem("user");
          router.push('/login');

        break;
        
        case 400:
         
          break;
      
       
       
        case 404:
          break;
      
     
      }
      return Promise.reject(error.response);
    }
  }
);
*/
function errorResponseHandler(error) {
  // check for errorHandle config
 

  // if has response show the error 

  if (error.response.status==401||error.response==401||error==401) {
/*
    router.beforeEach((to, from, next)=>{
      console.log(to.path)

      return next('/login/'+to.path);

    });
  */
 console.log('süre bitti'+error.response.status)

 router.push('/login/'+encodeURIComponent(router.currentRoute.path));

  }
  else
  {       
     return Promise.reject(error);
  }
}

// apply interceptor on response
axios.interceptors.response.use(function(response){
 return response
},function(response){
 errorResponseHandler(response)
});
/*
axios.interceptors.request.use(
  response => response,
  errorResponseHandler
 );
 */
new Vue({
  i18n,
  router,
  store,
  
  render: h => h(App)
}).$mount('#app')
