import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './index.css';
import { ClickOutside, Focus } from '@/directives';

const app = createApp(App);
const store = createPinia();

app
  .use(store)
  .use(router)
  .directive('click-outside', ClickOutside)
  .directive('focus', Focus);

app.mount('#app');
