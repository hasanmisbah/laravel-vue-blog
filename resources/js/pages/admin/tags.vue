<template>
  <app-back>
    <template slot="header">
      <h1 class="h3 mb-0 text-gray-800">Tags</h1>
      <button class="btn btn-primary" @click="showModal = !showModal">
        Add New Tags
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
              <tbody class="table-hover" v-if="tags.length">
                <tr v-for="(tag, index) in tags" :key="index">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ tag.name }}</td>
                  <td>{{ tag.slug }}</td>
                  <td class="text-center">
                    <button class="btn btn-info" @click="tagEdit(index)">
                      Edit
                    </button>
                    <button class="btn btn-danger" @click="deleteTag(tag.id)">Delete</button>
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
            placeholder="Tag Name"
            v-model="modalForm.name"
          />
        </div>
        <div class="form-group">
          <label for="slug">Slug</label>
          <input
            type="text"
            class="form-control"
            id="slug"
            placeholder="Tag slug"
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
  components: { AppBack },
  mixins : [helperMixins],
  data: () => ({
    showModal: false,
    CurrentState: "add",
    modalTitle: "Add New Tags",
    modalForm: {
      name: "",
      slug: "",
    },
  }),
  computed: {
    ...mapGetters({
      tags: "app/allTags",
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
      getTags: "app/tags",
      editTags: "app/editTags",
      addTags: "app/addTags",
      deleteTags: "app/deleteTags",
    }),
    resetModal() {
      let form = {
        name: "",
        slug: "",
      };
      this.modalTitle = "Add New Tags";
      this.CurrentState = "add";
      this.modalForm = form;
    },
    tagEdit(tid) {
      this.CurrentState = "edit";
      this.modalTitle = "Edit Tags";
      let { name, slug, id } = this.tags[tid];
      let form = { id, name, slug };
      this.modalForm = form;
      this.showModal = true;
    },
    async submitData() {
      if (this.CurrentState === "add") {
        await this.addTags(this.modalForm).then(() => {
          this.getTags();
          this.resetModal();
        });
      } else if (this.CurrentState === "edit") {
        await this.editTags(this.modalForm).then(() => {
          this.getTags();
          this.resetModal();
        });
      }
    },
    async deleteTag(id){
        await this.deleteTags(id).then(()=>{
            this.getTags();
        })
    }
  },
  mounted() {
    this.getTags();
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
