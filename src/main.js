import Vue from 'vue'
import App from './App.vue'
import {firestorePlugin} from 'vuefire'

import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios';

import VueCompositionAPI from "@vue/composition-api";

import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import "mapbox-gl/dist/mapbox-gl.css";
import "v-mapbox/dist/v-mapbox.css";
import './assets/main.css'

Vue.config.productionTip = false

Vue.use(VueCompositionAPI);

Vue.use(BootstrapVue)

Vue.use(IconsPlugin)

Vue.use(VueAxios, axios)

Vue.use(firestorePlugin)



export default router

new Vue({
    render: h => h(App),
    router: router,
}).$mount('#app')
