<template>
  <div id="app">
    <section class="container-fluid">
      <div class="row">
        <div class="col-4">
          <b-list-group>
            <b-list-group-item v-for="user of users" :key="user.id">
              <p>{{ user.name }}</p>
              <p>{{ user.address.geo }}</p>
            </b-list-group-item>
          </b-list-group>
        </div>
        <div class="col-8">
          <MglMap ref="map" container="map-test" :zoom="4" :center="[78.9629, 20.5937]" :accessToken="accessToken" :mapStyle="mapStyle"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import Map from "@/components/Map";

import {MglMap} from "v-mapbox";

export default {
  name: 'App',
  data: () => ({
    users: [],
    accessToken: 'pk.eyJ1IjoidmFkeW10c3ltYmFsaXVrIiwiYSI6ImNsMGtzMThhZTBuOHAzaXF0cnY5d2xlYWgifQ.Rw73JvaFnyty5IILIe_TjQ', // your access token. Needed if you using Mapbox maps-->
    mapStyle: 'mapbox://styles/examples/cjgiiz9ck002j2ss5zur1vjji'
  }),
  mounted() {
    this.axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          this.users = response.data
        })
  },
  updated() {
    this.$refs.map.map?.resize()
  },
  components: {MglMap}
}
</script>

<style>

#app {
  height: 100vh;
}

</style>
