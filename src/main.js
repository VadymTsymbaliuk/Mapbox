import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios';

import VueCompositionAPI from "@vue/composition-api";

import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import "mapbox-gl/dist/mapbox-gl.css";
import "v-mapbox/dist/v-mapbox.css";
import './assets/main.css'

Vue.config.productionTip = false

Vue.use(VueCompositionAPI);

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios, axios)

new Vue({
    render: h => h(App),
}).$mount('#app')
