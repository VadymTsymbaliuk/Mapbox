<template>
  <div id="app">
    <section class="container-fluid">
      <div class="row">
        <div class="col-4 overflow-scroll">
          <b-form-input v-model="filterText" class="mb-3"/>
          <b-list-group>
            <b-list-group-item ref="groupItem" v-for="user of filterUser" :key="user.id"
                               @mouseenter="userHover(user)"
                               @mouseleave="userBlur(user)"
                               @click="setActiveUser(user)"
                               v-bind:class="{active: user===selectedUser}"
            >
              <div class="d-flex justify-content-between align-items-center text-center p-1">
                <p class="m-0">{{ user.name }}</p>
                <b-button v-b-modal="`user-modal-${user.id}`" @click.stop="editUserName(user)">Edit name</b-button>
              </div>
              <b-modal :id="`user-modal-${user.id}`" @ok="saveUserName(user)">
                <b-form-input v-model="editableUser.name"/>
              </b-modal>
            </b-list-group-item>
          </b-list-group>
        </div>
        <div class="col-8 position-relative">
          <MglMap ref="map" container="map-test" :zoom="1" :access-token="accessToken"
                  :map-style="mapStyle" @load="loadMap" @click="mapClick"
          >
            <MglNavigationControl position="bottom-left" :showCompass="false"/>
            <MglScaleControl/>
            <MglAttributionControl/>
            <MglGeolocateControl position="top-right"/>
            <MglFullscreenControl/>

            <MglMarker v-for="user of filterUser" :key="user.id"
                       :coordinates="[user.address.geo.lng, user.address.geo.lat]"
                       anchor="bottom"
                       @added="addMarker($event, user)" :ref="`marker${user.id}`">
              <template slot="marker">
                <div class="marker" :class="{'active-map-marker': user === activeUser}"></div>
              </template>
              <MglPopup v-for="user of filterUser" :key="user.id" :closeButton="true" :showed="false">
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
          <div class="position-absolute top-0 bg-light d-flex gap-2" id="menu">
            <div>
              <input id="satellite-v9" type="radio" name="rtoggle" value="mapbox://styles/mapbox/satellite-v9"
                     @change="changeMapStyle">
              <label for="satellite-v9">satellite</label>
            </div>
            <div>
              <input id="light-v10" type="radio" name="rtoggle" value="mapbox://styles/mapbox/light-v10"
                     @change="changeMapStyle">
              <label for="light-v10">light</label>
            </div>
            <div>
              <input id="dark-v10" type="radio" name="rtoggle" value="mapbox://styles/mapbox/dark-v10"
                     @change="changeMapStyle">
              <label for="dark-v10">dark</label>
            </div>
            <div>
              <input id="outdoors-v11" type="radio" name="rtoggle" value="mapbox://styles/mapbox/outdoors-v11"
                     @change="changeMapStyle">
              <label for="outdoors-v11">streets</label>
            </div>
            <div>
              <input id="navigation-day" type="radio" name="rtoggle" value="mapbox://styles/mapbox/navigation-day-v1"
                     @change="changeMapStyle">
              <label for="navigation-day">navigation day</label>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

</template>

<script>

import {
  MglMap, MglMarker, MglPopup,
  MglNavigationControl,
  MglAttributionControl,
  MglGeolocateControl,
  MglFullscreenControl,
  MglScaleControl
} from "v-mapbox";

import MapboxGL from 'mapbox-gl'

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';


export default {
  name: 'App',
  data: () => ({
    map: null,
    color: 'blue',
    users: [],
    accessToken: 'pk.eyJ1IjoidmFkeW10c3ltYmFsaXVrIiwiYSI6ImNsMHFyY3psczI3cGozanB3M3I0dGY0bnUifQ.3tBov4aH3A1qe69cnat-0w', // your access token. Needed if you using Mapbox maps-->
    mapStyle: 'mapbox://styles/mapbox/streets-v11',
    filterText: '',
    activeUser: {},
    editableUser: {},
    selectedUser: null
  }),

  mounted() {
    MapboxGL.accessToken = this.accessToken
    localStorage.setItem('users':JSON).string
    this.getUsers()
  },
  computed: {
    filterUser() {
      return this.users.filter(user =>
          user.name.toLowerCase().includes(this.filterText.toLowerCase())
      )
    },
  },
  updated() {
    this.$refs.map.map?.resize()
  },
  methods: {
    loadMap({map}) {
      this.map = map

      this.map.addControl(
          new MapboxGeocoder({
            accessToken: MapboxGL.accessToken,
            mapboxgl: MapboxGL
          })
      )
    },
    getUsers() {
      this.axios
          .get('https://jsonplaceholder.typicode.com/users')
          .then(response => {
            this.users = response.data
            this.map?.jumpTo({center: this.users[0].address.geo})
          })
    },

    mapClick({mapboxEvent: {lngLat: {lat, lng}}}) {
      if (this.selectedUser) {
        this.selectedUser.address.geo.lat = lat
        this.selectedUser.address.geo.lng = lng
      }
    },

    userHover(user) {
      this.map?.flyTo({
        center: user.marker.getLngLat(),
        zoom: 4,
        speed: 1,
        curve: 1,
      },)
      this.activeUser = user
    },

    userBlur(user) {
      if (user === this.activeUser) {
        this.map?.flyTo({
          zoom: 1
        })
        this.activeUser = {}
      }
    },

    addMarker({marker}, user) {
      user.marker = marker
    },

    changeMapStyle(e) {
      const str = e.target.value
      this.map.setStyle(str)
    },

    editUserName(user) {
      this.editableUser = {...user}
    },
    saveUserName(user) {
      user.name = this.editableUser.name
    },
    setActiveUser(user) {
      this.selectedUser = user
    }
  },
  components: {
    MglMap, MglMarker, MglPopup, MglNavigationControl, MglScaleControl, MglAttributionControl,
    MglGeolocateControl,
    MglFullscreenControl,
  }
}
</script>

<style>

#app {
  height: 100vh;
}

.col-4, .col-8 {
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

.active-map-marker {
  background-image: url('./assets/blue-map_marker.svg');
  background-size: cover;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
}

</style>
