<template>
  <app-back class="dash">
          <template slot="header">
        <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
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
            <table class="table table-striped table-bordered ">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Post Title</th>
                  <th scope="col">Author</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody class="table-hover">
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            </table>
            <div class="row justify-content-right align-item-right">
              <nav class="ml-auto mt-3 mb-3">
                <ul class="pagination">
                  <li class="page-item disabled">
                    <span class="page-link">Previous</span>
                  </li>
                  <li class="page-item"><a class="page-link" href="#">1</a></li>
                  <li class="page-item active"> <span class="page-link">2 </span> </li>
                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item">
                    <a class="page-link" href="#">Next</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </app-back>
</template>

<script>
import appBack from "../../layouts/appBack.vue";

export default {
  components: {
    appBack,
  },
};
</script>
