<template>
  <div class="card">
    <div class="card-header border-bottom">
      <div class="row align-items-center">
        <div class="col text-center">
          <div class="h3 mb-0">Top论文</div>
        </div>
      </div>
    </div>
    <el-table
      v-loading="loading"
      :data="papers"
      highlight-current-row
      max-height="400px"
      cell-class-name="pl-2"
      header-cell-class-name="pl-2"
      :header-cell-style="{'background-color': '#f6f9fc', 'color': '#8898aa'}">
      <el-table-column
        prop="title"
        label="Title"
        min-width="300"
        show-overflow-tooltip>
        <template #default="scope">
          <div style="font-weight: 600;cursor: pointer" @click="routeToPaper(scope.row)">
            <i
              class="fa fa-bookmark mr-1"
              :class="scope.row.type === 2 ? 'text-danger' : 'text-primary'"
            ></i>
            {{ scope.row.title }}
            <i class="fas fa-external-link-alt ml-1 text-muted"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Venue"
        min-width="100">
        <template #default="scope">
          {{ scope.row._id.split('-')[1].toUpperCase() }}
        </template>
      </el-table-column>
      <el-table-column
        prop="year"
        label="Year"
        min-width="70">
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
        @current-change="topPaperTableChang">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "top-paper-table",
  components: {
  },
  props: {
    papers: Array,
    loading: Boolean,
    topPaperTableChang: Function,
  },
  data() {
    return {
    };
  },
  methods: {
    routeToPaper(paper) {
      console.log(paper)
      window.open(paper.doiUrl, '_blank')
    }
  }
};
</script>