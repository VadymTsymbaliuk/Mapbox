import Vue from 'vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'

import axios from 'axios'
import VueAxios from 'vue-axios';

// eslint-disable-next-line no-unused-vars
import Mapbox from "mapbox-gl"
// eslint-disable-next-line no-unused-vars
import { MglMap } from "v-mapbox"

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'v-mapbox/dist/v-mapbox.css';

import App from './App.vue'



Vue.config.productionTip = false

Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueAxios, axios)



new Vue({
    render: h => h(App),
}).$mount('#app')
