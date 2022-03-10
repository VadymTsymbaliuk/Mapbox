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
          <Map/>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Map from "@/components/Map";

export default {
  name: 'App',
  data: () => ({
    users: []
  }),
  mounted() {
    this.axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          this.users = response.data
        })
  },
  components: {Map}
}
</script>

<style>

</style>
