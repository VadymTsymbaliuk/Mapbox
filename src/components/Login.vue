<template>
  <div class="container">
    <b-toast id="example-toast" title="BootstrapVue" static no-auto-hide>
      Hello, world! This is a toast message.
    </b-toast>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row justify-content-center">
                <div class="col-md-6 mb-3">
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
                <div class="col-md-8 d-flex justify-content-around ">
                  <b-button variant="outline-success" type="submit">Login</b-button>
                  <b-button variant="outline-primary" @click="$router.push('/registration')">Sing In</b-button>
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
    submit() {
      db.collection('users')
          .where('name', '==', this.form.name)
          .get()
          .then(querySnapshot => {
            this.user = querySnapshot.docs.map(doc => {
              return {...doc.data(), storeId: doc.id}
            })

          })
      if (!this.user) {
        this.$bvToast.show('example-toast')
      }
    }
  }
}
</script>

<style scoped>

</style>