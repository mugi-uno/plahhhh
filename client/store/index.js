import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import room from './modules/room';
import WebSocketPlugin from './plugins';

const store = new Vuex.Store({
  modules: {
    room
  },
  plugins: [ WebSocketPlugin ]
});

export default store;
