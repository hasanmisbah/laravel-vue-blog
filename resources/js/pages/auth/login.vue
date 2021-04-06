<template>
  <app-front>
    <main class="login-form">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="card">
              <div class="card-header">Login</div>
              <div class="card-body">
                <form @submit.prevent="login">
                  <div class="form-group row">
                    <label
                      for="email_address"
                      class="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                    <div class="col-md-6">
                      <input
                        type="text"
                        id="email_address"
                        class="form-control"
                        name="email-address"
                        v-model="form.email"
                        required
                        autofocus
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label
                      for="password"
                      class="col-md-4 col-form-label text-md-right"
                      >Password</label
                    >
                    <div class="col-md-6">
                      <input
                        type="password"
                        id="password"
                        class="form-control"
                        name="password"
                        v-model="form.password"
                        required
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <div class="col-md-6 offset-md-4">
                      <div class="checkbox">
                        <label>
                          <input type="checkbox" name="remember" /> Remember Me
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6 offset-md-4">
                    <button type="submit" class="btn btn-primary">Login</button>
                    <a href="#" class="btn btn-link"> Forgot Your Password? </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </app-front>
</template>

<script>
import appFront from "../../layouts/appFront.vue";
import {mapActions} from 'vuex'
export default {
  components: { appFront },
  data : ()=>({
      form : {
          email : "",
          password : ""
      }
  }),
  methods : {
      ...mapActions({
          userLogin : 'auth/login',
          getUser : "auth/setAuthUser"
      }),
     async login(){
          let {email, password} = this.form;
          if(!email && password.length < 5){
              return;
          }
         await this.userLogin(this.form).then(async ()=>{
             await this.getUser()
         }).then(()=>{
             this.$router.push({name : "admin.dashboard"}).catch(()=>{});
         })
      }
  },
};
</script>

<style lang="scss">
.registration-form {
  height: 100%;
  min-height: 100%;
}

.registration-form {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.registration-form .row {
  margin-left: 0;
  margin-right: 0;
}
</style>
