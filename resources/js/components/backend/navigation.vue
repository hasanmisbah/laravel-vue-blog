<template>
  <nav  class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
<div class="container">
        <ul class="navbar-nav ml-auto">
         <li class="nav-item">  <a class="nav-link" href="/">Home</a> </li>
         <a @click.prevent="logoutUser" class="nav-link" href="#">logout</a>
    </ul>
</div>
  </nav>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "navigation",
  methods : {
      ...mapActions({
          logout : "auth/logout"
      }),
      async logoutUser(){
            await this.logout().then(()=>{
                this.$router.push({name : home})
            })
        }
  }
};
</script>

<style>
</style>
