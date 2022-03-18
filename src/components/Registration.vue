<template>
  <div class="container mt-3">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Register</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row ">
                <div class="col mb-3 justify-content-center">
                  <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>
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
                <div class="col-md-8 offset-md-4">
                  <button class="btn btn-primary" type="submit">Register</button>
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
// import firebase from "firebase/compat";
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
            this.$router.push({name: 'home'})
          })

    }
  }
}
</script>

<style scoped>

</style>