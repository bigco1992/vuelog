import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vue3Editor from 'vue3-editor';
import icons from 'v-svg-icons';

createApp(App)
  .use(store)
  .use(router)
  .use(Vue3Editor)
  .component('icon', icons)
  .mount('#app');
