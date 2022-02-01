import Vue from 'vue';
import App from './App.vue';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';
import {ValidationObserver} from 'vee-validate';
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

new Vue({
  el: '#app',
  render: h => h(App)
})