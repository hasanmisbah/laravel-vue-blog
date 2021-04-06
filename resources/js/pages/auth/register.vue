<template>
  <app-front>
    <main class="registration-form">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="card">
              <div class="card-header">Register</div>
              <div class="card-body">
                <form
                  id="member-registration"
                  class="form-validate form-horizontal well"
                  @submit.prevent="register"
                >
                  <fieldset>
                    <legend>User Registration</legend>
                    <div class="form-group">
                      <label for="name">Name *</label>
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        v-model="form.name"
                      />
                    </div>
                    <div class="form-group">
                      <label for="email">Email Address *</label>
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        v-model="form.email"
                      />
                    </div>
                    <div class="form-group">
                      <label for="password">Password *</label>
                      <input
                        type="password"
                        class="form-control"
                        id="password"
                        v-model="form.password"
                      />
                    </div>
                    <div class="form-group">
                      <label for="confirm_password">Confirm Password *</label>
                      <input
                        type="password"
                        class="form-control"
                        id="confirm_password"
                        v-model="form.confirm_password"
                      />
                    </div>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div class="form-group d-flex justify-content-start">
                        <button
                          type="submit"
                          class="btn btn-primary"
                          :disabled="!canSubmit"
                        >
                          Register
                        </button>
                      </div>
                      <div
                        class="form-check form-group d-flex justify-content-end"
                      >
                        <router-link to="/login">Sign in instead</router-link>
                      </div>
                    </div>
                  </fieldset>
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
export default {
  components: { appFront },
  data: () => ({
    form: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
  }),
  methods: {
    register() {
        this.$http.post('register', this.form)
        .then(data => {
            this.$router.push({name : 'login'})
        })
    },
  },
  computed: {
    canSubmit() {
      if (
        this.form.name &&
        this.form.email &&
        this.form.password &&
        this.form.confirm_password
      ) {
        if (this.form.password === this.form.confirm_password) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
  },
  mounted(){}
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Lobster|Mako");
.registration-form {
  height: 100%;
  width: 100%;
  min-height: 100%;
}
.my-form {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.my-form .row {
  margin-left: 0;
  margin-right: 0;
}

.login-form {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.login-form .row {
  margin-left: 0;
  margin-right: 0;
}
</style>
