import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './index.css';
import 'highlight.js/styles/stackoverflow-light.css';
import hljs from 'highlight.js/lib/common';
import javascript from 'highlight.js/lib/languages/javascript';
import hljsVuePlugin from '@highlightjs/vue-plugin';
import { ClickOutside, Focus } from '@/directives';

hljs.registerLanguage('javascript', javascript);

const app = createApp(App);
const store = createPinia();

app
  .use(hljsVuePlugin)
  .use(store)
  .use(router)
  .directive('click-outside', ClickOutside)
  .directive('focus', Focus);

app.mount('#app');
