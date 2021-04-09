<template>
  <app-front>
      <div class="container">
          <div class="row">
              <div class="col-md-10 mx-auto card" v-if="post">
                  <div class="card-header">
                      <h4 class="card-title">{{post.title}}</h4>
                      <p class="card-title">{{post.user.name}}</p>
                    </div>
                  <div class="card-body">
                      <p class="card-text">{{post.posts}}</p>
                  </div>
                  <div class="card-footer">
                      <div class="d-flex justify-content-between">
                          <div>
                              <p>Category:
                                  <span class="badge badge-primary mr-2" v-for="(category, index) in post.categories" :key="'cat'+index">{{category.name}}</span>
                                </p>
                        </div>
                          <div>
                              <p>Tags:
                                  <span class="badge badge-primary mr-2" v-for="(tag, index) in post.tags" :key="'tag'+index">{{tag.name}}</span>
                                </p>
                        </div>
                      </div>
                </div>
              </div>
          </div>
      </div>
  </app-front>
</template>

<script>
import appFront from '../layouts/appFront.vue'
import {mapGetters, mapActions} from 'vuex'
export default {
  components: { appFront },
  data : ()=>({
      post : null
  }),
  methods : {
      ...mapActions({
          getPosts : "app/posts"
      })
  },
  computed : {
      ...mapGetters({
          posts : "app/allPosts"
      })
  },
  async beforeCreate(){
      await this.$store.dispatch('app/posts').then(e=>{
          let post = this.$route.params.slug
          let posts = this.posts;
          let currentItem = posts.filter(item => item.slug === post)
          this.post = currentItem[0]
      })

  },
  async created(){
      setTimeout(()=>{
          if(!this.post){
              this.$router.push({name : 'notFound'})
          }
      }, 500)
  }
}
</script>

<style>

</style>
