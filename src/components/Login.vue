<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row d-flex flex-column justify-content-center align-items-center">
                <div class="col-6 mb-3">
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
                <div class="col-6 d-flex justify-content-between ">
                  <b-button variant="outline-success" @click.stop="login">Login</b-button>
                  <b-button variant="outline-primary" @click="$router.push('/registration')">Sign up</b-button>
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
  name: "Login",
  data() {
    return {
      form: {
        name: ''
      },
      error: null
    }
  },

  methods: {
    login() {

      db.collection('users')
          .where('name', '==', this.form.name)
          .get()
          .then(querySnapshot => {
            this.user = querySnapshot.docs.map(doc => {
              return {...doc.data(), storeId: doc.id}
            })[0]
            if (!this.user) {
              console.log(this.user)
              this.makeToast(true)
            } else {
              localStorage.setItem('auth', JSON.stringify(this.user))
              this.$router.push({path: '/'})
            }
          })

    },
    // eslint-disable-next-line no-unused-vars
    makeToast(append = false) {
      // console.log(this.$bvToast)
      this.$bvToast.toast(`This is toast number`, {
        title: 'BootstrapVue Toast',
        // autoHideDelay: 5000,
        // appendToast: append
      })
    },
  }
}
</script>

<style scoped>

</style>