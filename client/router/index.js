import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Top from '../pages/Top.vue';
import Room from '../pages/Room.vue';
import NotFound from '../pages/NotFound.vue';

const routes = [
  { path: '/', component: Top },
  { path: '/:room', component: Room, name: 'room' },
  { path: '/404', component: NotFound, name: 'notfound' },
  { path: '/*', component: NotFound },
];

export default new VueRouter({
  mode: 'history',
  routes
});
