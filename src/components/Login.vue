<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row">
                <label for="name" class="col-md-4 col-form-label text-md-right">Email</label>

                <div class="col-md-6">
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
              </div>
              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">Login</button>
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
import firebase from "firebase/compat";

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
  methods:{
    submit(){
      firebase
          .auth()
          .signInWithName(this.form.name)
      .then(data=>{
        console.log(data)
        this.$router.replace({name: "Dachboard"})
      }).catch(err =>{
        this.error = err.message
      })
    }
  }
}
</script>

<style scoped>

</style>