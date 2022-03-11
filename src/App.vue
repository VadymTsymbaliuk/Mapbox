<template>
  <div id="app">
    <section class="container-fluid">
      <div class="row">
        <div class="col-4">
          <b-select :options="['blue','red']" v-model="color"/>
          <b-list-group>
            <b-list-group-item ref="groupItem" v-for="user of users" :key="user.id"
                               @mouseover="userHover(user)">
              <p>{{ user.name }}</p>
              <p>{{ user.address.geo }}</p>
            </b-list-group-item>
          </b-list-group>
        </div>
        <div class="col-8">
          <MglMap ref="map" container="map-test" :zoom="1" :accessToken="accessToken"
                  :mapStyle="mapStyle" @load="loadMap" @click="mapClick"
          >
            <MglMarker v-for="user of users" :key="user.id"
                       :coordinates="[user.address.geo.lng, user.address.geo.lat]"
                       anchor="bottom"
                       @added="addMarker($event, user)" :ref="`marker${user.id}`">
              <template slot="marker">
                <div class="marker"></div>
              </template>
              <MglPopup v-for="user of users" :key="user.id" :closeButton="true" :showed="false">
                <b-card class="text-center">
                  <div>
                    {{ user.name }}
                    {{ user.phone }}
                  </div>
                  <div>
                    {{ user.email }}
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
    map: null,
    color: 'blue',
    users: [],
    accessToken: 'pk.eyJ1IjoidmFkeW10c3ltYmFsaXVrIiwiYSI6ImNsMGtzMThhZTBuOHAzaXF0cnY5d2xlYWgifQ.Rw73JvaFnyty5IILIe_TjQ', // your access token. Needed if you using Mapbox maps-->
    mapStyle: 'mapbox://styles/mapbox/streets-v11',
  }),
  mounted() {
    this.axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          this.users = response.data
          this.map?.jumpTo({center: this.users[0].address.geo})
        })
  },
  computed: {},
  updated() {
    this.$refs.map.map?.resize()
  },
  methods: {
    loadMap({map}) {
      this.map = map
    },

    mapClick({mapboxEvent: {lngLat: {lat, lng}}}) {
      this.users[0].address.geo.lat = lat
      this.users[0].address.geo.lng = lng
    },

    userHover(user) {
      this.map?.jumpTo({
        center: user.marker.getLngLat(),
        zoom: 2
      },)
    },

    addMarker({marker}, user) {
      user.marker = marker
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

.marker {
  background-image: url('./assets/map-marker.svg');
  background-size: cover;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
}

</style>
