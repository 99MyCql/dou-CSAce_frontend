<template>
 <div>
    <div class="row align-items-center mt-5 px-3">
      <div class="col-md-4">
        <div class="h3 mb-0">论文列表</div>
      </div>
      <div class="col-md-8 d-md-flex flex-wrap justify-content-end align-items-center">
        <el-checkbox-group class="mr-4 mt-2 mt-md-0" v-model="type" size="mini">
          <el-checkbox class="mb-0 mr-2" label="conf">
            <i class="fa fa-bookmark mr-1 text-primary"></i>会议
          </el-checkbox>
          <el-checkbox class="mb-0" label="journal">
            <i class="fa fa-bookmark mr-1 text-danger"></i>期刊
          </el-checkbox>
        </el-checkbox-group>

        <el-checkbox-group class="mr-4 mt-2 mt-md-0" v-model="category" size="mini">
          <el-checkbox class="mb-0 mr-2" label="A">A 类</el-checkbox>
          <el-checkbox class="mb-0 mr-2" label="B">B 类</el-checkbox>
          <el-checkbox class="mb-0" label="C">C 类</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>

    <div>
      <div v-for="(paper, index) in papers" :key="index">
        <div class="card mt-3" style="cursor: pointer;">
          <div class="card-body">
            <div class="card-title h2">{{ paper.name }}</div>
            <p class="card-text">{{ paper.zhName }}</p>
          </div>
        </div>
      </div>

      <div class="text-center mt-3">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </div>
 </div>
</template>

<script>
export default {
  name: "paper-table",
  components: {
  },
  props: {
  },
  data() {
    return {
      type: [],
      category: [],
      papers: [
        {
          name: "Computer Architecture",
          zhName: "计算机体系结构/并行与分布计算/存储系统",
        },
        {
          name: "Computer Architecture",
          zhName: "计算机体系结构/并行与分布计算/存储系统",
        },
        {
          name: "Computer Architecture",
          zhName: "计算机体系结构/并行与分布计算/存储系统",
        },
        {
          name: "Computer Architecture",
          zhName: "计算机体系结构/并行与分布计算/存储系统",
        },
        {
          name: "Computer Architecture",
          zhName: "计算机体系结构/并行与分布计算/存储系统",
        },
        {
          name: "Computer Architecture",
          zhName: "计算机体系结构/并行与分布计算/存储系统",
        },
        {
          name: "Computer Architecture",
          zhName: "计算机体系结构/并行与分布计算/存储系统",
        },
        {
          name: "Computer Architecture",
          zhName: "计算机体系结构/并行与分布计算/存储系统",
        },
        {
          name: "Computer Architecture",
          zhName: "计算机体系结构/并行与分布计算/存储系统",
        },
        {
          name: "Computer Architecture",
          zhName: "计算机体系结构/并行与分布计算/存储系统",
        },
      ]
    };
  },
};
</script>
