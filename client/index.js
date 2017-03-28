import 'babel-polyfill';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import { sync } from 'vuex-router-sync';
import router from './router';
import store from './store';
import App from './components/App.vue';

Vue.use(Vuetify);
sync(store, router);

document.addEventListener('DOMContentLoaded', () => new Vue({ router, store, render: h => h(App) }).$mount('#app'));
