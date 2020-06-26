import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
    'us':{
        Dil: 'Language',
        HomePage:'Home Page',
        About:'About',
        LastArticles:'Last Articles'
        },
    'tr': {
        Dil: 'Dil',
       HomePage:'Ana Sayfa',
       About:'Hakkımda',
       LastArticles:'Son Makaleler'
    },
   
}

const i18n = new VueI18n({
    locale: 'tr', // set locale
    fallbackLocale: 'us', // set fallback locale
    messages, // set locale messages
});

export default i18n;