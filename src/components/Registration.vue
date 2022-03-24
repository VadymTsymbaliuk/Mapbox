<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Register</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row d-flex flex-column justify-content-center align-items-center">
                <div class="col-6  mb-3">
                  <label for="name" class="col-form-label text-md-right">Name</label>
                  <input
                      id="name"
                      type="name"
                      class="form-control"
                      name="name"
                      value
                      required
                      autofocus
                      v-model="form.name"
                  />
                </div>
                <div class="col-6 ">
                  <b-button type="submit" variant="outline-success">Register</b-button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {db} from "@/db";

export default {
  name: "Registration",
  data() {
    return {
      form: {
        name: "",
      },
      error: null
    };
  },
  methods: {


    submit() {
      db.collection('users')
          .add({
            name: this.form.name,
            geo: {
              lng: null,
              lat: null,
            }
          })
          .then((d) => d.get())
          .then((d) => {
            localStorage.setItem('auth', JSON.stringify({...d.data(), id: d.id}))
            this.$router.push({path: '/'})
          })
    },
  }
}
</script>

<style scoped>

</style>