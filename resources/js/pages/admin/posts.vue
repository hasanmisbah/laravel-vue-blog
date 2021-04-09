<template>
  <app-back pageTitle="Posts">
    <template slot="header">
      <h1 class="h3 mb-0 text-gray-800">Posts</h1>
      <button class="btn btn-primary" @click="showModal = !showModal">
        Add New Post
      </button>
    </template>
    <div class="row">
      <div class="col-md-10 mx-auto">
        <div class="card">
          <div class="card-body">
            <div class="row justify-content-right align-item-right mb-3 mt-3">
              <div class="input-group col-lg-4 ml-auto">
                <input
                  type="text"
                  class="form-control bg-light small"
                  placeholder="Search for..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
              </div>
            </div>
            <table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Post Title</th>
                  <th scope="col">Author</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody class="table-hover">
                <tr v-if="!allPosts.length">
                  <td colspan="4">
                    <p class="text-center">No posts Available</p>
                  </td>
                </tr>
                <tr v-for="(post, index) in allPosts" :key="index">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ post.title }}</td>
                  <td>{{ post.user.name }}</td>
                  <td class="text-center">
                    <router-link :to="{name : 'single', params : {slug : post.slug}}" class="btn btn-info">View</router-link>
                    <button class="btn btn-info" @click="editPost(index)">
                      Edit
                    </button>
                    <button class="btn btn-danger" @click="deletePost(post.id)">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      v-model="showModal"
      :title="modalTitle"
      @cancel="resetModal"
      @close="resetModal"
      @ok="submitData"
      size="lg"
      no-close-on-backdrop
    >
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          name="Post Title"
          v-model="postForm.name"
        />
      </div>
      <div class="form-group">
        <label for="title">Post Slug</label>
        <input
          type="text"
          class="form-control"
          v-model="postForm.slug"
          name="Post Slug"
        />
      </div>

      <div class="form-group">
        <div class="row">
          <div class="col-10">
            <label for="category">Select a Category</label>
            <v-select
              multiple
              v-model="selectedCat"
              :options="categories"
              label="name"
              placeholder="Select a Category"
            />
          </div>
          <div class="col-2">
            <label><span class="require">Or</span></label>
            <b-button variant="primary" v-b-modal.category>Add New</b-button>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="row">
          <div class="col-10">
            <label for="category"
              >Select a Tag <span class="require">*</span></label
            >
            <v-select
              multiple
              v-model="selectedTag"
              :options="tags"
              label="name"
              placeholder="Select a Tag"
            />
          </div>
          <div class="col-2">
            <label><span class="require">Or</span></label>
            <b-button variant="primary" v-b-modal.tag>Add New</b-button>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          rows="5"
          class="form-control"
          name="description"
          v-model="postForm.posts"
        ></textarea>
      </div>
    </b-modal>
    <b-modal
      id="category"
      title="Add New Category"
      @ok="addNewCategory"
      @cancel="resetCatModal"
      @close="resetCatModal"
      no-close-on-backdrop
    >
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          placeholder="Category Name"
          v-model="category.name"
        />
      </div>
      <div class="form-group">
        <label for="slug">Slug</label>
        <input
          type="text"
          class="form-control"
          id="slug"
          placeholder="Category Slug"
          v-model="catslug"
        />
      </div>
    </b-modal>

    <b-modal
      id="tag"
      title="Add New tag"
      @ok="addNewTag"
      @cancel="resetTagModal"
      @close="resetTagModal"
      no-close-on-backdrop
    >
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          placeholder="Tag Name"
          v-model="tag.name"
        />
      </div>
      <div class="form-group">
        <label for="slug">Slug</label>
        <input
          type="text"
          class="form-control"
          id="slug"
          placeholder="Tag Slug"
          v-model="tagslug"
        />
      </div>
    </b-modal>
  </app-back>
</template>

<script>
import AppBack from '../../layouts/appBack.vue';
import vSelect from 'vue-select';
import 'vue-select/src/scss/vue-select.scss';
import { mapGetters, mapActions } from 'vuex';
import helperMixins from '../../mixins/helperMixins'

export default {
    mixins : [helperMixins],
  components: {
    AppBack,
    'v-select': vSelect,
  },
  data: () => ({
    showModal: false,
    modalTitle: 'Add new Post',
    stats: 'add',
    category: {
      name: '',
      slug: '',
    },
    tag: {
      name: '',
      slug: '',
    },
    postForm: {
      name: '',
      slug: '',
      posts: '',
    },
    selectedCat: [],
    selectedTag: [],
  }),
  computed: {
    ...mapGetters({
      tags: 'app/allTags',
      categories: 'app/allCategories',
      allPosts: 'app/allPosts',
    }),
    catslug: {
      get() {
        return this.category.slug;
      },
      set(data) {
        this.category.slug = this.slugify(data);
      },
    },
    tagslug: {
      get() {
        return this.tag.slug;
      },
      set(data) {
        this.tag.slug = this.slugify(data);
      },
    },
    postlug: {
      get() {
        return this.postForm.slug;
      },
      set(data) {
        this.postForm.slug = this.slugify(data);
      },
    },
  },
  methods: {
    ...mapActions({
      getTags: 'app/tags',
      getCategories: 'app/categories',
      categoryAdd: 'app/addCategory',
      addTags: 'app/addTags',
      getPosts: 'app/posts',
      addNewPost: 'app/addNewPost',
      postEdit: 'app/editPost',
      postDelete: 'app/deletePost',
    }),
    editPost(id) {
      let post = this.allPosts[id];
      this.selectedCat = post.categories;
      this.selectedTag = post.tags;
      this.postForm.name = post.title;
      this.postForm.slug = post.slug;
      this.postForm.posts = post.posts;
      this.postForm.id = post.id;
      this.stats = 'edit';
      this.showModal = true;
      this.modalTitle = 'Edit Post';
    },
    async deletePost(id) {
      await this.postDelete(id).then((e) => {
        this.getPosts();
      });
    },
    async addNewTag() {
      await this.addTags(this.tag).then(() => {
        this.getTags();
        this.resetTagModal();
      });
    },
    resetTagModal() {
      this.tag.name = '';
      this.tag.slug = '';
    },
    async addNewCategory() {
      await this.categoryAdd(this.category).then(() => {
        this.getCategories();
        this.resetCatModal();
      });
    },
    resetCatModal() {
      this.category.name = '';
      this.category.slug = '';
    },
    resetModal() {
      this.postForm.name = '';
      this.postForm.slug = '';
      this.postForm.posts = '';
      this.modalTitle = 'Add New Post';
      this.selectedCat = [];
      this.selectedTag = [];
      this.postForm.id = null;
      this.stats = 'add';
    },
    async submitData(e) {
      e.preventDefault();
      if (this.stats === 'add') {
        let title = this.postForm.name;
        let slug = this.postForm.slug;
        let posts = this.postForm.posts;
        let category = this.selectedCat.length
          ? this.selectedCat.map((cat) => cat.id)
          : '';
        let tag = this.selectedTag.length
          ? this.selectedTag.map((t) => t.id)
          : '';

        if (!title && !slug && !posts && !category && tag) {
          console.log('no data');
        } else {
          let data = { title, slug, posts, category, tag };
          await this.addNewPost(data).then(async () => {
            await this.getPosts();
            this.resetModal();
          });

          this.showModal = false;
        }
      } else if (this.stats === 'edit') {
        let title = this.postForm.name;
        let slug = this.postForm.slug;
        let posts = this.postForm.posts;
        let category = this.selectedCat.length
          ? this.selectedCat.map((cat) => cat.id)
          : '';
        let tag = this.selectedTag.length
          ? this.selectedTag.map((t) => t.id)
          : '';
        let data = { title, slug, posts, category, tag };
        if (!title && !slug && !posts && !category && tag){
            console.log('no data');
        }else {
            let id = this.postForm.id
            let data = { id, title, slug, posts, category, tag };
            await this.postEdit(data).then(()=>{})
        }
      }
    },
  },
  watch: {
    'category.name': {
      handler(val) {
        this.category.slug = this.slugify(val);
      },
    },
    'tag.name': {
      handler(val) {
        this.tag.slug = this.slugify(val);
      },
    },
    'postForm.name': {
      handler(val) {
        this.postForm.slug = this.slugify(val);
      },
    },
  },
  mounted() {
    this.getPosts();
    this.getTags();
    this.getCategories();
  },
};
</script>
