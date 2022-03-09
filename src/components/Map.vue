<template>
  <MglMap :accessToken="accessToken" :mapStyle="mapStyle" />
</template>

<script>
import 'mapbox-gl/dist/mapbox-gl.css'
import Mapbox from "mapbox-gl";
import { MglMap } from "v-mapbox";

export default {
  components: {
    MglMap
  },
  data() {
    return {
      accessToken: ACCESS_TOKEN, // your access token. Needed if you using Mapbox maps
      mapStyle: MAP_STYLE // your map style
    };
  },

  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  }
};
</script>