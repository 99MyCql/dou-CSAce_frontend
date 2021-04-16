<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col-md-4">
          <div class="h3 mb-0">会议/期刊列表</div>
        </div>
        <div class="col-md-8 d-md-flex flex-wrap justify-content-end align-items-center">
          <el-checkbox-group class="mr-4 mt-2 mt-md-0" v-model="venueType" size="mini">
            <el-checkbox class="mb-0 mr-2" label="conf">
              <i class="fa fa-bookmark mr-1 text-primary"></i>会议
            </el-checkbox>
            <el-checkbox class="mb-0" label="journal">
              <i class="fa fa-bookmark mr-1 text-danger"></i>期刊
            </el-checkbox>
          </el-checkbox-group>

          <el-checkbox-group class="mr-4 mt-2 mt-md-0" v-model="venueCategory" size="mini">
            <el-checkbox class="mb-0 mr-2" label="A">A 类</el-checkbox>
            <el-checkbox class="mb-0 mr-2" label="B">B 类</el-checkbox>
            <el-checkbox class="mb-0" label="C">C 类</el-checkbox>
          </el-checkbox-group>
          <router-link to="#" class="btn btn-sm btn-primary mt-2 mt-md-0">可视化</router-link>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table">
        <thead class="thead-light">
          <tr>
            <th>ShortName</th>
            <th>Name</th>
            <th>Category</th>
            <th>Count</th>
            <th>Citation</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="index" class="my-tr" @click="routeTo('/venue')">
            <th>
              <i
              class="fa fa-bookmark mr-3"
              :class="item.type === 'conference' ? 'text-primary' : 'text-danger'"
              ></i>
              {{ item.shortName }}
            </th>
            <td>{{ item.name }}</td>
            <td>{{ item.category }} 类</td>
            <td>{{ item.count }}</td>
            <td>{{ item.citation }}</td>
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
  },
  data() {
    return {
      tableData: [
        {
          name: "ACM Transactions on Computer Systems",
          shortName: "TOCS",
          count: "340",
          citation: "46,53",
          type: "conference",
          category: "A",
        },
        {
          name: "ACM Transactions on Computer Systems",
          shortName: "TOCS",
          count: "319",
          citation: "46,53",
          type: "journal",
          category: "A",
        },
        {
          name: "ACM Transactions on Computer Systems",
          shortName: "TOCS",
          count: "294",
          citation: "36,49",
          type: "journal",
          category: "A",
        },
        {
          name: "ACM Transactions on Computer Systems",
          shortName: "TOCS",
          count: "147",
          citation: "50,87",
          type: "conference",
          category: "A",
        },
        {
          name: "ACM Transactions on Computer Systems",
          shortName: "TOCS",
          count: "190",
          citation: "46,53",
          type: "journal",
          category: "A",
        },
        {
          name: "ACM Transactions on Computer Systems",
          shortName: "TOCS",
          count: "340",
          citation: "46,53",
          type: "conference",
          category: "A",
        },
        {
          name: "ACM Transactions on Computer Systems",
          shortName: "TOCS",
          count: "319",
          citation: "46,53",
          type: "journal",
          category: "A",
        },
        {
          name: "ACM Transactions on Computer Systems",
          shortName: "TOCS",
          count: "294",
          citation: "36,49",
          type: "journal",
          category: "A",
        },
        {
          name: "ACM Transactions on Computer Systems",
          shortName: "TOCS",
          count: "147",
          citation: "50,87",
          type: "conference",
          category: "A",
        },
        {
          name: "ACM Transactions on Computer Systems",
          shortName: "TOCS",
          count: "190",
          citation: "46,53",
          type: "journal",
          category: "A",
        },
      ],
      venueCategory: [],
      venueType: []
    };
  },
  methods: {
    routeTo(path) {
      this.$router.push(path)
    }
  }
};
</script>
<style scoped>
.my-tr {
  cursor: pointer;
}
.my-tr:hover {
  background-color: #f5f7fa;
}
</style>
