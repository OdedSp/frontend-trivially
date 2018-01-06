import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import 'vue-awesome/icons' // TODO: import only used icons
import Icon from 'vue-awesome/components/Icon'
// import VueSocketio from 'vue-socket.io';

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.component('icon', Icon)
// Vue.use(VueSocketio, 'http://localhost:3003');
