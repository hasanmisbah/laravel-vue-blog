<template>
  <nav class="navbar navbar-expand-lg navbar-light navbar-laravel">
    <div class="container">
      <router-link class="navbar-brand" to="/">Laravel</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" :to="{name : 'login'}">Login</router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" :to="{name : 'register'}">Register</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link class="nav-link" :to="{name : 'admin.dashboard'}">Dashboard</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <a @click.prevent="logoutUser" class="nav-link" href="#">logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default{
    computed : {
        ...mapGetters({
            isLoggedIn : "auth/isLoggedIn"
        })
    },
    methods : {
        ...mapActions({
            logout : "auth/logout"
        }),
         logoutUser(){
             this.logout().then(()=>{
                 if(!this.$router.currentRoute.name === "home"){
                     this.$router.push({name : 'home'})
                 }
            })
        }
    },
    mounted(){
console.log()
    }
}
</script>

<style>
</style>
