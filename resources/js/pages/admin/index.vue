<template>
  <app-back class="dash">
    <template slot="header">
      <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
    </template>

    <div class="row">
      <div class="col-xl-4 col-md-6 mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div
                  class="text-xs font-weight-bold text-primary text-uppercase mb-1"
                >
                  Total Posts
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {{posts.length || 0}}
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-calendar fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-4 col-md-6 mb-4">
        <div class="card border-left-success shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div
                  class="text-xs font-weight-bold text-success text-uppercase mb-1"
                >
                  Total Categories
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {{categories.length || 0}}
                </div>
              </div>
              <div class="col-auto">
                <i class="far fa-fw fa-list-alt fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-4 col-md-6 mb-4">
        <div class="card border-left-info shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div
                  class="text-xs font-weight-bold text-info text-uppercase mb-1"
                >
                  Tags
                </div>
                <div class="row no-gutters align-items-center">
                  <div class="col-auto">
                    <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                      {{tags.length || 0}}
                    </div>
                  </div>
                  <div class="col">
                    <div class="progress progress-sm mr-2">
                      <div
                        class="progress-bar bg-info"
                        role="progressbar"
                        style="width: 50%"
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </app-back>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import appBack from '../../layouts/appBack.vue';
export default {
  components: {
    appBack,
  },
  computed: {
    ...mapGetters({
      tags: 'app/allTags',
      categories: 'app/allCategories',
      posts: 'app/allPosts',
    }),
  },
  methods: {
    ...mapActions({
      getTags: 'app/tags',
      getCategories: 'app/categories',
      getPosts: 'app/posts',
    }),
  },
  async beforeMount(){
      await this.getTags()
      await this.getCategories()
      await this.getPosts()
  }
};
</script>
