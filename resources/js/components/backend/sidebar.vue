<template>
  <nav class="sb-sidenav accordion sb-sidenav-dark bg-dark">
    <ul class="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar">
      <!-- Sidebar - Brand -->
      <router-link class="sidebar-brand d-flex align-items-center justify-content-center" to="/">
        <div class="sidebar-brand-text mx-3">Administration</div>
      </router-link>

      <!-- Divider -->
      <hr class="sidebar-divider my-0" />
      <li class="nav-item">
        <router-link class="nav-link" :to="{name : 'admin.dashboard'}">
          <i class="fas fa-fw fa-pen"></i>
          <span>Dashboard</span></router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{name : 'admin.posts'}">
          <i class="fas fa-fw fa-pen"></i>
          <span>Posts</span></router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{name : 'admin.categories'}">
          <i class="far fa-fw fa-list-alt "></i>
          <span>Categories</span></router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{name : 'admin.tags'}">
          <i class="fas fa-fw fa-tag "></i>
          <span>Tags</span></router-link
        >
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: "sidebar",
};
</script>
