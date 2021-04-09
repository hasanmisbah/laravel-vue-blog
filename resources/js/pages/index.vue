<template>
  <app-front>
      <div class="container mt-5">
          <div class="row" v-if="posts.length">
              <div class="col-sm-4" v-for="(post, index) in posts" :key="index">
                  <div class="card mb-3" style="with:100%">
                    <div class="card-body">
                        <h5 class="card-title text-truncate d-block">{{post.title}}</h5>
                        <p class="card-text"></p>
                        <router-link :to="{name : 'single', params:{slug: post.slug}}" class="btn btn-primary">Read Post</router-link>
                    </div>
                    </div>
              </div>
          </div>
      </div>
  </app-front>
</template>

<script>
import appFront from '../layouts/appFront.vue'
import {mapActions, mapGetters} from 'vuex'
export default {
  components: { appFront },
    name : "index",
    methods : {
        ...mapActions({
            getAllPosts : 'app/posts'
        })
    },
    computed : {
        ...mapGetters({
            posts  :"app/allPosts"
        })
    },
    mounted(){
        this.getAllPosts()
    }
}
</script>
