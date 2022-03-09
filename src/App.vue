<template>
  <div id="app">
    <Map />
    asdfgadfgsasf
  </div>
</template>

<script>



import Map from "@/components/Map.vue";
import axios from "core-js/internals/queue";

export default {
  name: 'App',
  data() {
    return {
      user: name,
    }
  },
  mounted() {
    axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then(response => (this.name = response))
  },
  components: {
    Map,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
