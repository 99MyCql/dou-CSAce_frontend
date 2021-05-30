<template>
  <div class="card">
    <div class="card-header border-bottom">
      <div class="row align-items-center">
        <div class="col text-center">
          <div class="h3 mb-0">Top作者</div>
        </div>
      </div>
    </div>
    <el-table
      v-loading="loading"
      :data="authors"
      highlight-current-row
      max-height="400px"
      cell-class-name="pl-2"
      header-cell-class-name="pl-2"
      :header-cell-style="{'background-color': '#f6f9fc', 'color': '#8898aa'}">
      <el-table-column
        prop="name"
        label="Name"
        min-width="160"
        show-overflow-tooltip>
        <template #default="scope">
          <div style="font-weight: 600;cursor: pointer" @click="routeToAuthor(scope.row)">
            {{ scope.row.name }}
            <i class="fas fa-external-link-alt ml-1 text-muted"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="paperCount"
        label="Paper"
        min-width="130">
      </el-table-column>
      <el-table-column
        prop="citationCount"
        label="Citation"
        min-width="130">
      </el-table-column>
    </el-table>
    <div class="card-footer d-flex justify-content-center bg-transparent">
      <el-pagination
        background
        :pager-count="3"
        layout="prev, pager, next"
        :total="100"
        @current-change="topAuthorTableChang">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "top-author-table",
  components: {
  },
  props: {
    authors: Array,
    loading: Boolean,
    topAuthorTableChang: Function,
  },
  data() {
    return {
    };
  },
  methods: {
    routeToAuthor(a) {
      console.log(a)
      let authorView = this.$router.resolve({
        name: 'Author',
        params: { authorKey: a._key }
      })
      window.open(authorView.href);
    }
  }
};
</script>