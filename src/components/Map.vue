<template>
  <MglMap  :mapbox-gl="mapbox"
           :access-token="accessToken"
           :map-style.sync="mapStyle"/>
</template>

<script>
import 'mapbox-gl/dist/mapbox-gl.css'
import 'v-mapbox/dist/v-mapbox.css';
import Mapbox from "mapbox-gl"
import { MglMap } from "v-mapbox"

export default {
  components: {
    MglMap
  },
  data:()=> ({
    mapbox:null,
      accessToken: 'pk.eyJ1IjoidmFkeW10c3ltYmFsaXVrIiwiYSI6ImNsMGtzMThhZTBuOHAzaXF0cnY5d2xlYWgifQ.Rw73JvaFnyty5IILIe_TjQ', // your access token. Needed if you using Mapbox maps
      mapStyle: 'mapbox://styles/mapbox/streets-v11' // your map style
  }),

  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  }
};
</script>