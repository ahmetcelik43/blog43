import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  
 
  state: {
    IsOpen:false
  },
  getters: {
  
  },
  mutations: {
   //fonksiyonlar 
    OpenSearch2(state)
    {
       state.IsOpen=true;
    },
    CloseSearch2(state)
    {
      state.IsOpen=false;
    }
  },
  /*
  actions: {
    getArticles( context ){
      axios({
        method: 'get', //you can set what request you want to be
        url: api.apiurl+'getArticles'
       
      })
      .then(res => {
        context.commit('setdata',res.data.articles)
        console.log('no error'+JSON.stringify(res.data.articles))
        //return JSON.stringify(res.data.articles)
      })
      .catch(err=>{
        console.log(' error')

      alert('Sunucu Hatası !')
        
  
            
              });
              //console.log('girdi')
              
      },
      
    }
    */
  }
);