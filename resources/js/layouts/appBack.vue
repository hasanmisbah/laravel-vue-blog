<template>
  <main id="page-top">
    <!-- Page Wrapper -->
    <div id="wrapper">
      <!-- Sidebar -->
      <sidebar></sidebar>
      <!-- End of Sidebar -->

      <!-- Content Wrapper -->
      <div id="content-wrapper" class="d-flex flex-column">
        <!-- Main Content -->
        <div id="content">
          <!-- Topbar -->
          <keep-alive>
            <navigation></navigation>
          </keep-alive>
          <!-- End of Topbar -->

          <!-- Begin Page Content -->
          <div class="container-fluid">
            <!-- Page Heading -->
            <div
              class="d-sm-flex align-items-center justify-content-between mb-4 mt-4"
            >
              <slot name="header"></slot>
            </div>

            <slot></slot>
          </div>
          <!-- /.container-fluid -->
        </div>
        <!-- End of Main Content -->

        <!-- Footer -->
        <app-footer></app-footer>
        <!-- End of Footer -->
      </div>
      <!-- End of Content Wrapper -->
    </div>
    <!-- End of Page Wrapper -->
  </main>
</template>

<script>
import sidebar from "../components/backend/sidebar";
import navigation from "../components/backend/navigation";
import appFooter from "../components/backend/appFooter";
import "@fortawesome/fontawesome-free/css/all.min.css";
export default {
  name: "app-back",
  components: { sidebar, navigation, appFooter },
  mounted() {},
};
</script>

<style lang="scss">
@import "../assets/scss/sb-admin-2";
</style>
