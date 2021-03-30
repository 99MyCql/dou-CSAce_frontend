<template>
  <nav class="navbar navbar-expand-md navbar-dark px-md-4 bg-gradient-info">
    <router-link to="/" class="font-italic h1 mb-0 text-white d-none d-md-inline-block">
      {{ projectName }}
    </router-link>

    <div class="collapse navbar-collapse">
      <form v-if="showSearch" class="navbar-search navbar-search-dark form-inline mr-3 d-md-flex ml-md-auto">
        <div class="form-group mb-0">
          <base-input
            placeholder="Search"
            class="input-group-alternative"
            alternative=""
            addon-right-icon="fas fa-search"
          >
          </base-input>
        </div>
      </form>

      <ul class="navbar-nav align-items-center d-md-flex ml-lg-auto" :class="[{'ml-auto': !showSearch}]">
        <li class="nav-item nav-link dropdown">
          <div class="media align-items-center" style="cursor: pointer;" :aria-expanded="avatarOpen" @click="avatarOpen = !avatarOpen">
            <span class="avatar avatar-sm rounded-circle">
              <img src="img/team-1-800x800.jpg"/>
            </span>
            <div class="media-body ml-2">
              <span class="mb-0 text-sm font-weight-bold">Jessica Jones</span>
            </div>
          </div>

          <ul class="dropdown-menu" :class="[{ show: avatarOpen }]">
            <div class="dropdown-header noti-title">
              <h6 class="text-overflow m-0">Welcome!</h6>
            </div>
            <router-link to="/" class="dropdown-item">
              <i class="ni ni-single-02"></i>
              <span>My profile</span>
            </router-link>
            <router-link to="/" class="dropdown-item">
              <i class="ni ni-settings-gear-65"></i>
              <span>Settings</span>
            </router-link>
            <router-link to="/" class="dropdown-item">
              <i class="ni ni-calendar-grid-58"></i>
              <span>Activity</span>
            </router-link>
            <router-link to="/" class="dropdown-item">
              <i class="ni ni-support-16"></i>
              <span>Support</span>
            </router-link>
            <div class="dropdown-divider"></div>
            <router-link to="/" class="dropdown-item">
              <i class="ni ni-user-run"></i>
              <span>Logout</span>
            </router-link>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import BaseInput from "@/components/BaseInput";

export default {
  components: {
    BaseInput,
  },
  props: {
    showSearch: {
      type: Boolean,
      default: true,
      description: "Navbar type (e.g default, primary etc)",
    },
  },
  data() {
    return {
      projectName: "dou-CSAce",
      avatarOpen: false,
    }
  }
}
</script>