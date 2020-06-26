<template>

    <div class="lastTexts">
      <div class="header-last-texts">
   <a class="last-texts-content-text">{{$t('LastArticles')}}</a>
</div>
        <b-container fluid class="container-category">
               <div class="last-texts-content">

            <b-media class="last-text-media" v-for="(text ,key) in lasttexts" :key="key">
      <template v-slot:aside>
        <vue-fontawesome class="category-page-icons"   icon="hourglass"   color="lightgray"></vue-fontawesome>
      </template>

      <p class="overflowed-texts-p">
      <a :href="'/articledetails?baslik='+encodeURI(text.baslik)"> {{text.baslik}}</a>
      </p>
      <p class="last-texts-time">
       <vue-fontawesome class="icons"  icon="clock"  color="lightgray"> </vue-fontawesome> {{text.createdAt}}  
      </p>
     
    </b-media>
            </div>

        </b-container>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import api from '../services/api';
import axios from 'axios';
import router  from '../router/index'
import i18n from '../services/lang';

export default Vue.extend({
  name: 'Lasttexts',
  data(){
   return{ lasttexts:[],Lang:this.$store.getters.GetLang
}
  },
  
 watch:{
    Lang: function (val) {
           return  i18n.locale = val;

},
 },
 async created()
  {
 await axios({
    method: 'get',
    url: api.apiurl+'getLastTexts',
   
    })
.then(res=>
{
    console.log(res.data.lastTexts)

if(res.data.lastTexts)
{
  this.lasttexts=res.data.lastTexts
  
}
else
{
 this.$root.$bvToast.toast("Son yazılar getirilemedi", {
          title: 'Başarısız',
          autoHideDelay: 5000,
          appendToast: true,
          variant: 'danger',

        })
}
}).catch(err=>{
   
        this.$root.$bvToast.toast("Son yazılar getirilemedi", {
          title: 'Başarısız',
          autoHideDelay: 5000,
          appendToast: true,
          variant: 'danger',

        })
        
          });
  },
  methods:{
hrefArticleDetails(baslik)
{

  //this.$root.$router('/articledetails/'+encodeURIComponent(baslik));
  // router.push('/articledetails/'+encodeURIComponent(baslik))
      router.push('/articledetails?baslik='+baslik)
    // router.forward()
}
     
  }
});
</script>

<style scoped>



.container-category
{
  background-color: rgb(230,230,230,0.5);
padding-top:10px;
padding-right:5px;
 border-bottom:1px solid black;

}
.header-last-texts
{
  background-color: rgb(230,230,230,0.8);
  text-align:center;
}
.last-texts-content-text
{
text-align: center;
}

.last-text-media
{
  text-align: left;
}
.category-page-icons
{
    font-size: 40px;
}
.overflowed-texts-p
{
  max-width: 270px;
  font-size: 16px;
  word-wrap: break-word;
  font-weight: bold;
  cursor:pointer;
}

.overflowed-texts-p:hover
{
  text-decoration: underline;
  color:#428bca;
}
.last-texts-time
{
  font-weight: bold;
    opacity:0.8;
}
</style>