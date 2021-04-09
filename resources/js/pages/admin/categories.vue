<template>
  <app-back>
    <template slot="header">
      <h1 class="h3 mb-0 text-gray-800">Categories</h1>
      <button class="btn btn-primary" @click="showModal = !showModal">
        Add New Category
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
                  <th scope="col">Name</th>
                  <th scope="col">Slug</th>
                  <th scope="col" class="text-center">Action</th>
                </tr>
              </thead>
              <tbody class="table-hover" v-if="categories.length">
                <tr v-for="(category, index) in categories" :key="index">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ category.name }}</td>
                  <td>{{ category.slug }}</td>
                  <td class="text-center">
                    <button class="btn btn-info" @click="editCategory(index)">
                      Edit
                    </button>
                    <button class="btn btn-danger" @click="deletecat(category.id)">Delete</button>
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
      no-close-on-backdrop
    >
      <form @submit.prevent>
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            placeholder="Category Name"
            v-model="modalForm.name"
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
      </form>
    </b-modal>
  </app-back>
</template>

<script>
import AppBack from "../../layouts/appBack.vue";
import { mapGetters, mapActions } from "vuex";
import helperMixins from '../../mixins/helperMixins'
export default {
    mixins : [helperMixins],
  components: { AppBack },
  data: () => ({
    showModal: false,
    CurrentState: "add",
    modalTitle: "Add New Category",
    modalForm: {
      name: "",
      slug: "",
    },
  }),
  computed: {
    ...mapGetters({
      categories: "app/allCategories",
    }),
    catslug: {
      get() {
        return this.modalForm.slug;
      },
      set(data) {
        this.modalForm.slug = this.slugify(data);
      },
    },
  },
  methods: {
    ...mapActions({
      getCategories: "app/categories",
      categoryEdit: "app/editCategory",
      categoryAdd: "app/addCategory",
      deleteCategory: "app/deleteCategory",
    }),
    resetModal() {
      let form = {
        name: "",
        slug: "",
      };
      this.modalTitle = "Add New Category";
      this.CurrentState = "add";
      this.modalForm = form;
    },
    editCategory(catid) {
      this.CurrentState = "edit";
      this.modalTitle = "Edit Category";
      let { name, slug, id } = this.categories[catid];
      let form = { id, name, slug };
      this.modalForm = form;
      this.showModal = true;
    },
    async submitData() {
      if (this.CurrentState === "add") {
        await this.categoryAdd(this.modalForm).then(() => {
          this.getCategories();
          this.resetModal();
        });
      } else if (this.CurrentState === "edit") {
        await this.categoryEdit(this.modalForm).then(() => {
          this.getCategories();
          this.resetModal();
        });
      }
    },
    async deletecat(category){
        await this.deleteCategory(category).then(()=>{
            this.getCategories();
        })
    }
  },
  mounted() {
    this.getCategories();
  },
  watch: {
    "modalForm.name": {
      handler(data) {
        this.modalForm.slug = this.slugify(data);
      },
    },
  },
};
</script>
