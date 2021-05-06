<template>
  <footer class="footer px-4">
    <div class="row align-items-center justify-content-lg-between">
      <div class="col-lg-6">
        <div class="copyright text-center text-lg-left text-muted">
          © {{ year }}
          <a
            href="https://github.com/99MyCql"
            class="font-weight-bold ml-1"
            target="_blank">
            dounine
          </a>
        </div>
      </div>
      <div class="col-lg-6">
        <ul class="nav nav-footer justify-content-center justify-content-lg-end">
          <li class="nav-item">
            <a
              href="https://gitee.com/dounineli/dou-csace/releases/v1.0.0"
              class="nav-link"
              target="_blank">
              v1.0.0
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              target="_blank">
              About Us
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              target="_blank">
              License
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style></style>
