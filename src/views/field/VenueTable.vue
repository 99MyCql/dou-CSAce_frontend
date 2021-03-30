<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <div class="h3 mb-0">Page visits</div>
        </div>
        <div class="col text-right">
          <a href="" class="btn btn-sm btn-primary">See all</a>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table">
        <thead class="thead-light">
          <tr>
            <th>Page name</th>
            <th>Visitors</th>
            <th>Unique users</th>
            <th>Bounce rate</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="index">
            <th>{{ item.page }}</th>
            <td>{{ item.visitors }}</td>
            <td>{{ item.unique }}</td>
            <td>
              <i
                class="fa mr-3"
                :class="item.bounceRateDirection === 'up' ? 'text-success fa-arrow-down' : 'text-danger fa-arrow-up'"
              >
              </i>
              {{ item.bounceRate }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card-footer d-flex justify-content-end bg-transparent">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "venue-table",
  components: {
  },
  props: {
    tableData: Array,
  },
  data() {
    return {
    };
  },
};
</script>
<style></style>
