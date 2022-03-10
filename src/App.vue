<template>
  <div id="app">
    <section class="container-fluid">
      <div class="row">
        <div class="col-4">
          <b-list-group>
            <b-list-group-item v-for="user of correctUsers" :key="user.id" @mouseover="showInfo">
              <p>{{ user.name }}</p>
              <p>{{ user.address.geo }}</p>
            </b-list-group-item>
          </b-list-group>
        </div>
        <div class="col-8">
          <MglMap ref="map" container="map-test" :zoom="1" :center="[-87.661557, 41.893748]" :accessToken="accessToken"
                  :mapStyle="mapStyle"
          >
            <MglMarker v-for="user of correctUsers" :key="user.id"
                       :coordinates="[user.address.geo.lat, user.address.geo.lng]"
                       color="blue">
              <MglPopup v-for="user of correctUsers" :key="user.id" :closeButton="true" :showed="false">
                  <b-card class="text-center">
                    <div>
                      {{ user.name }}
                      {{ user.phone}}
                    </div>
                    <div>
                      {{user.email}}
                    </div>
                  </b-card>
              </MglPopup>
            </MglMarker>

          </MglMap>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import Map from "@/components/Map";
import {MglMap, MglMarker, MglPopup} from "v-mapbox";
//import mapboxgl from 'mapbox-gl'

export default {
  name: 'App',
  data: () => ({
    users: [],
    accessToken: 'pk.eyJ1IjoidmFkeW10c3ltYmFsaXVrIiwiYSI6ImNsMGtzMThhZTBuOHAzaXF0cnY5d2xlYWgifQ.Rw73JvaFnyty5IILIe_TjQ', // your access token. Needed if you using Mapbox maps-->
    mapStyle: 'mapbox://styles/mapbox/streets-v11',
  }),
  mounted() {
    this.axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          this.users = response.data
        })
  },
  computed: {
    correctUsers() {
      return this.users.filter(user => user.address.geo.lat <= 90 &&
          user.address.geo.lat >= -90 &&
          user.address.geo.lng <= 90 &&
          user.address.geo.lng >= -90)
    }
  },
  updated() {
    this.$refs.map.map?.resize()
  },
  methods:{
    showInfo(e){
      this.$refs.map.map
    }
  },
  components: {
    MglMap, MglMarker, MglPopup,
  }
}
</script>

<style>

#app {
  height: 100vh;
}

</style>
