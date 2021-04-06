<template>
  <router-view></router-view>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    data : ()=>({

    }),
    computed : {
        ...mapGetters({
            token : 'auth/getToken'
        })
    },
    methods : {
        ...mapActions({
            getUser : "auth/setAuthUser"
        })
    },
    mounted(){
        if(this.token){
            this.getUser()
        }
    }


}
</script>
